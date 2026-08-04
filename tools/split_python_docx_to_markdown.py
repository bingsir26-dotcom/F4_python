"""Split python.docx into lesson-sized Markdown files.

The original DOCX remains unchanged. This converter retains all body paragraphs,
Python code blocks, and Word tables in their original order.
"""
from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable

from docx import Document
from docx.oxml.ns import qn
from docx.table import Table
from docx.text.paragraph import Paragraph

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "python.docx"
OUTPUT = ROOT / "lesson"


@dataclass(frozen=True)
class LessonSpec:
    start: int
    filename: str
    title: str
    skip_source_title: bool = True


# Paragraph indices were checked against the original Word document. They mark
# each lesson/assessment boundary without modifying the source document.
LESSONS = [
    LessonSpec(0, "01_Python介紹與變數.md", "第 1 課：Python 介紹與變數"),
    LessonSpec(70, "02_資料類型與運算.md", "第 2 課：資料類型與運算"),
    LessonSpec(101, "03_input與計算.md", "第 3 課：input() 與計算"),
    LessonSpec(137, "04_if判斷與小遊戲.md", "第 4 課：if 判斷與小遊戲"),
    LessonSpec(206, "05_列表List.md", "第 5 課：列表（List）"),
    LessonSpec(320, "06_for迴圈與作品.md", "第 6 課：for 迴圈（Loop）與作品"),
    LessonSpec(442, "07_while迴圈與進階遊戲.md", "第 7 課：while 迴圈與進階遊戲"),
    LessonSpec(568, "08_總溫習與綜合應用.md", "第 8 課：總溫習與綜合應用"),
    LessonSpec(696, "09_Python基礎測驗.md", "Python 基礎測驗卷"),
    LessonSpec(783, "10_NumPy入門.md", "NumPy 入門"),
    # The Word file begins this portion directly with a DataFrame example and
    # has no standalone title paragraph, so a descriptive file title is used.
    LessonSpec(978, "11_pandas入門.md", "pandas 入門：DataFrame 與常用操作", False),
    LessonSpec(1038, "12_NumPy與pandas銜接.md", "NumPy + pandas 的銜接課"),
    LessonSpec(1254, "13_資料清洗與篩選.md", "資料清洗與篩選（pandas 進階一）"),
    LessonSpec(1638, "14_描述性統計與groupby.md", "第 2 節：描述性統計與分組分析（groupby）"),
    LessonSpec(2015, "15_資料視覺化Matplotlib.md", "第 3 節：資料視覺化入門（Matplotlib）"),
]


@dataclass
class Block:
    kind: str  # paragraph | table
    paragraph_index: int | None = None
    text: str = ""
    table: Table | None = None


@dataclass
class Lesson:
    spec: LessonSpec
    blocks: list[Block] = field(default_factory=list)


def iter_body_blocks(document: Document) -> Iterable[Block]:
    """Yield top-level paragraphs and tables in Word document order."""
    paragraph_index = 0
    for child in document.element.body.iterchildren():
        if child.tag == qn("w:p"):
            paragraph = Paragraph(child, document)
            yield Block("paragraph", paragraph_index=paragraph_index, text=paragraph.text)
            paragraph_index += 1
        elif child.tag == qn("w:tbl"):
            yield Block("table", table=Table(child, document))


def table_to_markdown(table: Table) -> list[str]:
    rows: list[list[str]] = []
    for row in table.rows:
        cells: list[str] = []
        for cell in row.cells:
            value = cell.text.strip().replace("\r\n", "\n").replace("\r", "\n")
            cells.append(value.replace("|", "\\|").replace("\n", "<br>"))
        rows.append(cells)

    if not rows:
        return []
    width = max(len(row) for row in rows)
    rows = [row + [""] * (width - len(row)) for row in rows]
    lines = ["| " + " | ".join(rows[0]) + " |", "| " + " | ".join(["---"] * width) + " |"]
    lines.extend("| " + " | ".join(row) + " |" for row in rows[1:])
    return lines


def is_subheading(text: str) -> bool:
    """Recognise concise numbered section labels but not multi-choice questions."""
    cleaned = text.strip()
    if "\n" in cleaned or len(cleaned) > 72:
        return False
    return bool(re.match(r"^\d+(?:\.\d+|\.)\s+", cleaned))


def normalise_paragraph(text: str) -> str:
    text = text.strip().replace("\r\n", "\n").replace("\r", "\n")
    # Word soft line breaks should stay visibly separated in Markdown.
    return text.replace("\n", "  \n")


def looks_like_python_code(text: str) -> bool:
    """Return True for lines that belong in a Python code example."""
    value = text.strip()
    if not value or value == "python":
        return False
    if re.match(r"^\d+(?:\.\d+|\.)\s+", value):
        return False
    if value[0] in "👉✅❌🎯🧠🔥":
        return False
    if value.startswith(("#", "@", "import ", "from ", "print", "if ", "elif ", "else:", "for ", "while ", "def ", "class ", "return", "break", "continue", "pass", "try:", "except")):
        return True
    if value[0] in "[]{}(),\"":
        return True
    # Assignments, calls, indexing, comparisons, and augmented assignments.
    return bool(re.match(r"^[A-Za-z_]\w*(?:[.\[\]\w]*)?\s*(?:=|\(|\[|\.|:|\+=|-=|\*=|/=|>=|<=|==|!=|>|<)", value))

def blocks_to_markdown(lesson: Lesson) -> str:
    heading = lesson.spec.title
    if lesson.spec.skip_source_title:
        source_title = next((block.text.strip() for block in lesson.blocks if block.paragraph_index == lesson.spec.start), "")
        if source_title:
            heading = source_title

    lines = [
        "<!-- 由 python.docx 拆分；原始 Word 檔保留不變。 -->",
        "",
        f"# {heading}",
        "",
    ]

    i = 0
    blocks = lesson.blocks
    while i < len(blocks):
        block = blocks[i]
        if block.kind == "table":
            lines.extend(table_to_markdown(block.table))
            lines.append("")
            i += 1
            continue

        text = block.text
        stripped = text.strip()

        # A lower-case "python" is a language marker in the source. The
        # following code can have blank lines, but narrative/heading paragraphs
        # must remain outside the fenced block.
        if stripped == "python":
            code_lines: list[str] = []
            i += 1
            while i < len(blocks) and blocks[i].kind == "paragraph":
                candidate = blocks[i].text.replace("\r\n", "\n").replace("\r", "\n")
                if candidate.strip():
                    if not looks_like_python_code(candidate):
                        break
                    code_lines.extend(candidate.split("\n"))
                    i += 1
                    continue

                # Keep a blank line only when the next nonblank paragraph is
                # still part of the same code example.
                next_index = i + 1
                while next_index < len(blocks) and blocks[next_index].kind == "paragraph" and not blocks[next_index].text.strip():
                    next_index += 1
                if next_index < len(blocks) and blocks[next_index].kind == "paragraph" and looks_like_python_code(blocks[next_index].text):
                    code_lines.append("")
                    i += 1
                    continue
                break

            lines.append("```python")
            lines.extend(code_lines)
            lines.append("```")
            lines.append("")
            continue

        # The lesson title is already emitted as the H1 above.
        if block.paragraph_index == lesson.spec.start and lesson.spec.skip_source_title:
            i += 1
            continue

        if not stripped:
            if lines and lines[-1] != "":
                lines.append("")
            i += 1
            continue

        output = normalise_paragraph(text)
        lines.append(f"## {output}" if is_subheading(stripped) else output)
        lines.append("")
        i += 1

    return "\n".join(lines).rstrip() + "\n"


def write_readme() -> None:
    lines = [
        "# Python 課程 Markdown 文件",
        "",
        "此資料夾由 `python.docx` 拆分而成。每個檔案對應一節課或一份測驗，方便獨立調整內容。",
        "",
        "## 文件列表",
        "",
    ]
    for lesson in LESSONS:
        lines.append(f"- [{lesson.title}]({lesson.filename})")
    lines.extend([
        "",
        "## 使用方式",
        "",
        "- 直接修改個別 `.md` 檔案；不需要再在大型 Word 文件中尋找內容。",
        "- `python.docx` 是原始備份，沒有被修改。",
        "- 程式碼已轉為 Python fenced code blocks，Word 表格已轉為 Markdown 表格。",
        "",
    ])
    (OUTPUT / "README.md").write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    if not SOURCE.exists():
        raise FileNotFoundError(f"找不到來源檔案：{SOURCE}")

    document = Document(SOURCE)
    OUTPUT.mkdir(exist_ok=True)

    lesson_objects = {spec.start: Lesson(spec) for spec in LESSONS}
    current: Lesson | None = None
    top_level_paragraphs = 0
    tables = 0

    for block in iter_body_blocks(document):
        if block.kind == "paragraph":
            top_level_paragraphs += 1
            if block.paragraph_index in lesson_objects:
                current = lesson_objects[block.paragraph_index]
        else:
            tables += 1

        if current is None:
            raise RuntimeError("文件在第一節課之前已有內容，無法決定輸出位置。")
        current.blocks.append(block)

    if top_level_paragraphs != len(document.paragraphs):
        raise RuntimeError("段落數量驗證失敗，已中止輸出。")

    for spec in LESSONS:
        lesson = lesson_objects[spec.start]
        (OUTPUT / spec.filename).write_text(blocks_to_markdown(lesson), encoding="utf-8")

    write_readme()
    print(f"已建立 {len(LESSONS)} 個課程/測驗 Markdown 檔案與 README.md")
    print(f"已處理 {top_level_paragraphs} 個段落及 {tables} 個表格")


if __name__ == "__main__":
    main()
