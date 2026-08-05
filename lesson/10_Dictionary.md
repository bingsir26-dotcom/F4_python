# 第 10 課：Dictionary——用名稱整理一筆資料

> **本課主題：把同一個對象的不同資料放在一起，並用名稱快速找出需要的資料。**
>
> 一位學生有姓名、班別、分數；一個遊戲角色有名稱、生命值、金幣。Dictionary 很適合保存這類「有標籤的資料」。

## 今課可以做到甚麼？

完成這一課後，你可以：

- 用一個 Dictionary 保存角色或學生的一筆資料；
- 用資料名稱取出、更新或加入資料；
- 看懂資料表和 JSON 常見的「名稱：內容」結構。

## 開始前：想一想

假設要記錄一位角色的資料，你可能先這樣寫：

```python
player_name = "Alex"
player_hp = 100
player_gold = 30
```

三個變數可以運作，但資料一多就不容易知道哪些屬於同一位角色。如果有 30 位學生，要管理姓名、班別、分數，又會出現很多變數。

我們可否把「同一個對象的資料」收在一個有標籤的小資料夾中？

## 新概念

### 1. Dictionary：名稱對應資料

Dictionary（字典）用大括號 `{}` 建立。每一項資料由兩部分組成：

```python
player = {
    "name": "Alex",
    "hp": 100,
    "gold": 30
}
```

- `"name"`、`"hp"`、`"gold"` 是 **key（鍵／資料名稱）**；
- `"Alex"`、`100`、`30` 是 **value（值／資料內容）**；
- 冒號 `:` 表示名稱和內容的配對；不同配對之間用逗號分開。

![一個角色 Dictionary：name、hp、gold 三個有名稱的資料格](/images/lesson-10-dictionary.svg)

你可以把 Dictionary 看成「貼好標籤的資料格」：不是靠第幾個位置尋找，而是直接說出資料名稱。

### 2. 用 key 取出資料

```python
print(player["name"])
print(player["hp"])
```

輸出是：

```text
Alex
100
```

方括號內的 key 是文字，所以要加引號。這和 DataFrame 選欄位時的寫法很相似：你用名稱取出需要的資料。

### 3. 更新與加入資料

```python
player["hp"] = 80
player["level"] = 2
```

第一行把已存在的 `hp` 更新為 `80`；第二行因為原本沒有 `level`，所以加入一項新資料。

## 跟著做：例子 1——顯示角色狀態

```python
player = {
    "name": "Alex",
    "hp": 100,
    "gold": 30
}

print(f"角色：{player['name']}")
print(f"生命值：{player['hp']}")
print(f"金幣：{player['gold']}")
```

### 預期輸出

```text
角色：Alex
生命值：100
金幣：30
```

### 逐行解釋

```python
player = {
    "name": "Alex",
    "hp": 100,
    "gold": 30
}
```

建立一個名為 `player` 的 Dictionary，把同一位角色的資料收在一起。

```python
player['hp']
```

從 `player` 中取出 key 為 `"hp"` 的內容。外面使用單引號、Dictionary 定義時使用雙引號都可以；重點是引號要成對，key 的文字要完全相同。

## 再試一次：例子 2——角色受到攻擊和撿到金幣

```python
player = {
    "name": "Alex",
    "hp": 100,
    "gold": 30
}

player["hp"] = player["hp"] - 25
player["gold"] = player["gold"] + 10
player["level"] = 2

print(player)
```

### 預期輸出

```text
{'name': 'Alex', 'hp': 75, 'gold': 40, 'level': 2}
```

與第 1 課的 `hp = hp - 20` 一樣，右邊會先取出原本的生命值、完成計算，再把新數值放回同一個資料名稱。

## 易錯位

### ❌ key 忘了加引號

```python
print(player[name])
```

**原因：** Python 會把 `name` 當成另一個變數，而不是 Dictionary 裡的資料名稱。

**✅ 修正：**

```python
print(player["name"])
```

### ❌ 使用不存在的 key

```python
print(player["score"])
```

**原因：** `player` 裡沒有 `"score"`，Python 會出現 `KeyError`。

**✅ 修正：** 先檢查已有哪些 key。

```python
print(player.keys())
```

或在取用前先加入資料：

```python
player["score"] = 0
```

### ❌ 用小括號取資料

```python
print(player("hp"))
```

**原因：** 小括號是呼叫函式的寫法；Dictionary 取資料要用方括號。

**✅ 修正：**

```python
print(player["hp"])
```

### ❌ 同一個 key 寫成不同文字

```python
player["HP"] = 80
print(player["hp"])
```

`"HP"` 和 `"hp"` 是不同 key，會變成兩項資料。請固定使用一種寫法。

## 你來做

### 基礎題：學生資料卡

建立 `student` Dictionary，保存姓名、班別和數學分數；再用 f-string 顯示三項資料。

### 標準題：更新遊戲角色

建立一個有 `name`、`hp`、`gold` 的角色。讓角色受到 15 點傷害、得到 20 金幣，再顯示更新後資料。

### 挑戰題：多位學生的資料

建立兩個 Dictionary：`student_1` 和 `student_2`。比較兩人的 `"score"`，用 `if` 顯示分數較高者的姓名。

## 本課小結

1. Dictionary 用 `{}` 保存多項有名稱的資料。
2. 用 `資料["名稱"]` 取出或更新資料；key 必須完全相同。
3. Dictionary 是後面資料表、JSON 和模型結果常見的資料整理方式。

## 離堂前 3 分鐘

1. 在 `{"name": "May", "score": 88}` 中，key 和 value 分別是甚麼？
2. 如何把 `score` 更新成 `90`？
3. 為甚麼 `player[hp]` 可能會出錯？

## 自我檢查

- 我能否用一個 Dictionary 整理同一個對象的資料？
- 我能否用 key 取出和更新資料？
- 我知道 Dictionary 與 List 分別適合甚麼情況嗎？
