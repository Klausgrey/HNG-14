# Stage-1 Project

## Description

Gender classifier API built with Express.js and Genderize.io API integration.



## Instructions to Build

No build process required. This is a Node.js Express application that runs directly.

1. Ensure Node.js (v14+) and npm are installed
2. Install dependencies:

```bash
npm install
```

## Instructions to Run

Start the server:

```bash
npm start
```

Or run directly with Node:

```bash
node index.js
```

The server will start on `http://localhost:3000` by default.

### API Endpoint

**GET** `/api/classify?name=<name>`

#### Example Request

```bash
curl "http://localhost:3000/api/classify?name=John"
```

#### Example Response

```json
{
	"status": "success",
	"data": {
		"name": "John",
		"gender": "male",
		"probability": 0.92,
		"sample_size": 1500,
		"is_confident": true,
		"processed_at": "2026-04-16T10:30:00.000Z"
	}
}
```

## Instructions to Run Test Suite(s)

Currently, no automated test suite is configured. To test the API manually:

1. Start the server: `npm start`
2. Use curl, Postman, or any HTTP client to test the `/api/classify` endpoint
3. Test with different name parameters to verify responses

To add tests in the future, install a testing framework (e.g., Jest or Mocha) and create test files.






# Python Notes

## 1. Text Editors

A text editor is software used to write plain text. For programmers, it's the primary workspace where you draft instructions that a computer can read (code). Examples include Visual Studio Code (VS Code) and Sublime Text. In Python, you use these to save a file with a `.py` extension so the system knows it contains Python code.

## 2. Compilers vs Interpreters

Some people believe that when we run code, we run it through the internet, not knowing it's the computer hardware that is actually running the code. This brings us to the idea of **compilers** and **interpreters**. They are both ways of running code, but they do so differently:

- A **compiler** translates the entire file at once before it runs, creating a separate executable file.
- An **interpreter** reads and executes the code one line at a time.

## 3. Python Data Types

Data types tell Python what value a variable holds and what operations can be performed on it.

| Type    | Description                  | Example                              |
|---------|------------------------------|--------------------------------------|
| `int`   | Whole number                 | `10`                                 |
| `float` | Decimal number               | `1.23`                               |
| `str`   | Text/words                   | `"hello"`                            |
| `bool`  | Yes or no                    | `True` or `False`                    |
| `list`  | A collection of items        | `["Kenny", "Mr Ibrahim", "30", "420"]` |

### Code Example

```python
name = "skill NG"    # str
age = 21             # int
price = 19.99        # float
is_student = True    # bool
colors = ["red", "blue"] # list
```

## 4. Python Type Conversion

Type conversion is the process of converting a value from one data type to another. This is important for performing math operations on pre-formatted strings.

### Code Example

```python
age_string = "25"
age = int(age_string)      # converting string to integer
score = float(10)          # converting integer to decimal
```

> **Note:** The JavaScript equivalent uses `Number(ageString)` instead of `int()`.

## 5. Operators

Operators are symbols used to perform operations on values. There are three main categories:

- **Mathematical:** `+`, `-`, `*`, `/`
- **Logical:** `and`, `or`, `not`
- **Comparison:** `==`, `!=`, `>`, `<`

### Code Example

```python
x = 10
y = 5
print(x > y and x == 10)  # Returns True because both conditions are true
```