## π§ μνμΉ΄λ API λͺμΈμ

**API νΈμ€νΈ**

ππ» [`https://waffle-card.herokuapp.com`](https://waffle-card.herokuapp.com/)

<br>



## μ€ν€λ§

### μ μ 

```javascript
{
	id: String,
	email: String,
	name: String,
	password: String,
}
```

- name: 2 ~ 12κΈμ

- μ΄λ©μΌ νμ μ¬λ°λ₯΄κ²
- λΉλ°λ²νΈ: 6κΈμ ~ 15κΈμ (κ³΅λ°±μ¬μ©κ°λ₯)



### μνμΉ΄λ

```javascript
{
	id: String,
	user: {
    id: String,
    name: String,
  },
	emoji: String,
	color: String,
	hashTags: String[],
	likeUserIds: String[],
	createdAt: String,
	updatedAt: String,
}
```



### λκΈ

```javascript
{
	id: String,
	user: {
    id: String,
    name: String,
  },
	waffleCardId: String,
	text: String,
	createdAt: String,
	updatedAt: String,
}
```



### μ’μμ

```javascript
{
	id: string,
	userId: string,
	waffleCardId: string,
}
```



<br>



## API μμ²­ μμ½

#### Host

- [`https://waffle-card.herokuapp.com`](https://waffle-card.herokuapp.com/)



#### Auth

- νμκ°μ : `POST/auth/signup`
- λ‘κ·ΈμΈ : `POST/auth/login`
- ν ν° μ ν¨μ± κ²μ¬ : π `GET/auth/me`
- νμμ λ³΄ μμ  : π `GET/auth/update`



#### WaffleCard

- μνμΉ΄λ μ μ²΄λͺ©λ‘ λΆλ¬μ€κΈ° : `GET/waffleCards`
- νΉμ  idμ μνμΉ΄λ λΆλ¬μ€κΈ° : `GET/waffleCards/:id`
- λμ μνμΉ΄λ λΆλ¬μ€κΈ° : π `GET/waffle-cards/my`
- μ’μμν μνμΉ΄λ λͺ©λ‘ λΆλ¬μ€κΈ°: π `GET/waffle-cards/like`
- μνμΉ΄λ μμ±νκΈ° : π `POST/waffle-cards`
- μνμΉ΄λ μμ νκΈ° : π `PUT/waffle-cards/:id`
- μνμΉ΄λ μ­μ νκΈ° : π `DELETE/waffle-cards/:id`



#### Comment

- μνμΉ΄λμ μν λκΈ λΆλ¬μ€κΈ° : `GET/comments?waffle-card-id={waffleCardId}`
- νΉμ  idμ λκΈ λΆλ¬μ€κΈ° : `GET/waffleCards/:id`
- λκΈ μμ±νκΈ° : π `POST/comments`
- λκΈ μμ νκΈ° : π `PUT/comments/:id`
- λκΈ μ­μ νκΈ° : π `DELETE/comments/:id`



#### Like

- μ’μμ μμ± : π `POST/likes`
- μ’μμ μ­μ  : π `DELETE/likes`



<br>



## API μμ²­

### Error Response

```javascript
{
	message: String
}
```



<br>



### Auth

#### νμκ°μ 

> POST /auth/signup

```javascript
// Request Body
{
  "name": String,
	"email": String,
	"password": String
}

// Response 201 ok
{
	"token": String,
	"id": String,
	"name": String,
	"email": String
}
```



#### λ‘κ·ΈμΈ 

> POST /auth/login

```javascript
// Request Body
{
	"email": String,
	"password": String
}

// Response 200 ok
{
	"token": String,
	"id": String,
	"name": String,
	"email": String
}
```



#### JWT μ ν¨μ± κ²μ¬

> GET /auth/me

```javascript
// Request Header
Authorization: bearer JWTν ν°

// Response 200 ok
{
	"token": String,
	"id": String,
	"name": String,
	"email": String
}
```



#### νμμ λ³΄ μμ 

> PUT /auth/update
>
> π‘ `name` νΉμ `password` μ€ μ΅μ 1κ°μ νλκ° μ‘΄μ¬ν΄μΌν©λλ€.

```js
// Request Header
Authorization: bearer JWTν ν°

// Request Body
{
  "name": String(optional),
	"password": String(optional)
}

// Response 200 ok
{
  "token": String,
	"id": String,
	"name": String,
	"email": String
}
```



<br>



### WaffleCard

#### μνμΉ΄λ μ μ²΄λͺ©λ‘ λΆλ¬μ€κΈ°

> GET /waffleCards

```javascript
// Response 200 ok
{
	id: String,
	user: {
    id: String,
    name: String,
  },
	emoji: String,
	color: String,
	hashTags: String[],
	likeUserIds: String[],
	createdAt: String,
	updatedAt: String,
}
```



#### λμ μνμΉ΄λ λΆλ¬μ€κΈ°

> GET /waffle-cards/my

```javascript
// Request Header
Authorization: bearer JWTν ν°

// Response 200 ok
{
	id: String,
	user: {
    id: String,
    name: String,
  },
	emoji: String,
	color: String,
	hashTags: String[],
	likeUserIds: String[],
	createdAt: String,
	updatedAt: String,
}
```



#### μ’μμν μνμΉ΄λ λͺ©λ‘ λΆλ¬μ€κΈ°

> GET /waffle-cards/like

```javascript
// Request Header
Authorization: bearer JWTν ν°

// Response 200 ok
[
	{
    id: String,
    user: {
      id: String,
      name: String,
    },
    emoji: String,
    color: String,
    hashTags: String[],
    likeUserIds: String[],
    createdAt: String,
    updatedAt: String,
  },
  ... // μνμΉ΄λ κ°μ²΄λ₯Ό λ΄μ λ°°μ΄ λ°ν
]
```



#### μνμΉ΄λ μμ±νκΈ°

> POST /waffle-cards

```javascript
// Request Header
Authorization: bearer JWTν ν°

// Request Body
{
	"emoji": "π½",
	"color": "#123456",
	"hashTags": ["μλ", "ν΄λ μ€ννΈλΌ", "μΈμμμ", "μ μΌκ°λ", "ν¬νμ΄ν μΉ©"]
}

// Response 201 ok
{
	id: String,
	user: {
    id: String,
    name: String,
  },
	emoji: String,
	color: String,
	hashTags: String[],
	likeUserIds: String[],
	createdAt: String,
	updatedAt: String,
}
```



#### μνμΉ΄λ μμ νκΈ°

> PUT /waffle-cards/:id

```javascript
// Request Header
Authorization: bearer JWTν ν°

// Request Body
{
	"emoji": "π½",
	"color": "#123456",
	"hashTags": ["μλ", "ν΄λ μ€ννΈλΌ", "μΈμμμ", "μ μΌκ°λ", "ν¬νμ΄ν μΉ©"]
}

// Response 200 ok
{
	id: String,
	user: {
    id: String,
    name: String,
  },
	emoji: String,
	color: String,
	hashTags: String[],
	likeUserIds: String[],
	createdAt: String,
	updatedAt: String,
}
```



#### μνμΉ΄λ μ­μ νκΈ°

> DELETE /waffle-cards/:id

```javascript
// Request Header
Authorization: bearer JWTν ν°

// Response 204 ok
```



<br>



### Comment

#### μνμΉ΄λμ μν λκΈ λΆλ¬μ€κΈ°

> GET /comments?waffle-card-id={waffleCardId}

```js
// Request Params
waffle-card-id: waffleCardId

// Response 200 ok
[
  {
    id: String
    user: {
      id: String,
      name: String,
    },
    waffleCardId: String,
    text: String,
    createdAt: String,
    updatedAt: String,
  },
  ... // λκΈμ΄ λ΄κΈ΄ λ°°μ΄ λ°ν
]
```





#### νΉμ  idλ‘ λκΈ λΆλ¬μ€κΈ°

> GET /comments/:id

```js
// Response 200 ok
{
    id: String
    user: {
      id: String,
      name: String,
    },
    waffleCardId: String,
    text: String,
    createdAt: String,
    updatedAt: String,
},
```





#### λκΈ μμ±νκΈ°

> POST /comments

```javascript
// Request Header
Authorization: bearer JWTν ν°

// Request Body
{
  "waffleCardId": "61fbf239722eec55a1daae0f",
	"text": "λκΈλ΄μ©"
}

// Response 201 ok
{
	id: String,
	user: {
    id: String,
    name: String,
  },
	waffleCardId: String,
	text: String,
	createdAt: String,
	updatedAt: String,
}
```



#### λκΈ μμ νκΈ°

> PUT/comments/:id

```javascript
// Request Header
Authorization: bearer JWTν ν°

// Request Body
{
	"text": "λκΈλ΄μ©"
}

// Response 200 ok
{
	id: String,
	user: {
    id: String,
    name: String,
  },
	waffleCardId: String,
	text: String,
	createdAt: String,
	updatedAt: String,
}
```



#### λκΈ μ­μ νκΈ°

> DELETE /comments/:id

```javascript
// Request Header
Authorization: bearer JWTν ν°

// Response 204 ok
```



<br>



### Like

μ’μμ μμ± λ° μ­μ μ λ°λΌ μνμΉ΄λμ `likeCount` κ°μ΄ λ³κ²½λ©λλ€.

#### μ’μμ μμ±

> POST /likes

```javascript
// Request Header
Authorization: bearer JWTν ν°

// Request Body
{
	"waffleCardId": "61fbf239722eec55a1daae0f"
}

// Response 201 ok
{
	id: String,
	userId: String,
	waffleCardId: String
}
```



#### μ’μμ μ­μ 

> DELETE /likes

```javascript
// Request Header
Authorization: bearer JWTν ν°

// Request Body
{
	waffleCardId: "61fbf239722eec55a1daae0f"
}

// Response 204 ok
```
