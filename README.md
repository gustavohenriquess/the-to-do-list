# The to do list

## Features

- [x] Terminal interface
- [x] API Rest
- [ ] DDD
- [ ] Use Prisma.io

### Users

- [x] Create User
- [x] Set User

### Lists

- [x] Show Lists
- [x] Create List
- [x] Select List
- [x] Delete List

### Tasks

- [x] Add Task
- [x] Change Done
- [x] Delete Task

## Docs

- [readline](https://nodejs.org/en/knowledge/command-line/how-to-prompt-for-command-line-input/)

## Terminal

- Creating user

  ![Create user](./assets/1%20-%20Create%20user.png)

- Set user

  ![Set user](./assets/2%20-%20Set%20user.png)

- List menu

  ![List menu](./assets/3%20-%20List%20menu.png)

- Task menu

  ![Task menu](./assets/4%20-%20Task%20menu.png)

## Server

### API Collection

- [Insomni Collection](./assets/api_Collection.json)

### Methods

**basePath:** api/v1/

#### User

Method: **POST**

Route: /account

**Body:**

```
{
	"name": "Gustavo"
}
```

**Response:**

Status: **200 - OK**

```
{
	"userId": "1bd549dc-e8f0-4d1a-8d59-5ec373dc27fb"
}
```

#### List

Method: **POST**

Route: **_:userId_**/list

**Body:**

```
{
	"name": "List Name"
}
```

**Response:**

Status: **204 - No Content**

---

Method: **GET**

Route: **_:userId_**/list

**Body:**

```
NO BODY
```

**Response:**

Status: **200 - OK**

```
[
	{
		"_props": {
			"name": "List",
			"tasks": []
		}
	}
]
```

---

Method: **DELETE**

Route: **_:userId_**/list/**_:listId_**

**Body:**

```
NO BODY
```

**Response:**

Status: **204 - No Content**

#### Task

Method: **POST**

Route: **_:userId_**/list/**_:listId_**/task

**Body:**

```
{
	"name": "Task Name"
}
```

**Response:**

Status: **204 - No Content**

---

Method **GET**

Route: **_:userId_**/list/**_:listId_**/task

**Body:**

```
NO BODY
```

**Response:**

Status: **200 - OK**

```
[
	{
		"name": "Task name",
		"done": false
	}
]
```

---

Method: **DELETE**

Route: **_:userId_**/list/**_:listId_**/task/**_:taskId_**

**Body:**

```
NO BODY
```

**Response:**

Status: **204 - No Content**
