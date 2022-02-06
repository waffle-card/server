## 🧇 와플카드 API 명세서

**API 호스트**

👉🏻 [`https://waffle-card.herokuapp.com`](https://waffle-card.herokuapp.com/)

<br>



## 스키마

### 유저

```javascript
{
	id: String,
	email: String,
	name: String,
	password: String,
}
```

- name: 2 ~ 12글자

- 이메일 형식 올바르게
- 비밀번호: 6글자 ~ 15글자 (공백사용가능)



### 와플카드

```javascript
{
	id: String,
	userId: String,
	userName: String,
	emoji: String,
	color: String,
	hashTags: String[],
	likeCount: Sumber,
	createdAt: String,
	updatedAt: String,
}
```



### 댓글

```javascript
{
	id: String,
	userId: String,
	userName: String,
	waffleCardId: String,
	text: String,
	createdAt: String,
	updatedAt: String,
}
```



### 좋아요

```javascript
{
	id: string,
	userId: string,
	waffleCardId: string,
}
```



<br>



## API 요청 요약

#### Host

- [`https://waffle-card.herokuapp.com`](https://waffle-card.herokuapp.com/)



#### Auth

- 회원가입 : `POST/auth/signup`
- 로그인 : `POST/auth/login`
- 토큰 유효성 검사 : 🔐 `GET/auth/me`
- 회원정보 수정 : 🔐 `GET/auth/update`



#### WaffleCard

- 와플카드 전체목록 불러오기 : `GET/waffleCards`
- 특정 id의 와플카드 불러오기 : `GET/waffleCards/:id`
- 나의 와플카드 불러오기 : 🔐 `GET/waffle-cards/my`
- 좋아요한 와플카드 목록 불러오기: 🔐 `GET/waffle-cards/like`
- 와플카드 생성하기 : 🔐 `POST/waffle-cards`
- 와플카드 수정하기 : 🔐 `PUT/waffle-cards/:id`
- 와플카드 삭제하기 : 🔐 `DELETE/waffle-cards/:id`



#### Comment

- 와플카드에 속한 댓글 불러오기 : `GET/comments?waffle-card-id={waffleCardId}`
- 특정 id의 댓글 불러오기 : `GET/waffleCards/:id`
- 댓글 생성하기 : 🔐 `POST/comments`
- 댓글 수정하기 : 🔐 `PUT/comments/:id`
- 댓글 삭제하기 : 🔐 `DELETE/comments/:id`



#### Like

- 좋아요 생성 : 🔐 `POST/likes`
- 좋아요 삭제 : 🔐 `DELETE/likes`



<br>



## API 요청

### Error Response

```javascript
{
	message: String
}
```



<br>



### Auth

#### 회원가입 

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



#### 로그인 

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



#### JWT 유효성 검사

> GET /auth/me

```javascript
// Request Header
Authorization: bearer JWT토큰

// Response 200 ok
{
	"token": String,
	"id": String,
	"name": String,
	"email": String
}
```



#### 회원정보 수정

> PUT /auth/update
>
> 💡 `name` 혹은 `password` 중 최소 1개의 필드가 존재해야합니다.

```js
// Request Header
Authorization: bearer JWT토큰

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

#### 와플카드 전체목록 불러오기

> GET /waffleCards

```javascript
// Response 200 ok
{	
  "id": String,
	"userId": String,
	"userName": String,
	"emoji": String,
	"color": String,
	"hashTags": String[],
	"likeCount": Number,
	"createdAt": String,
	"updatedAt": String,
}
```



#### 나의 와플카드 불러오기

> GET /waffle-cards/my

```javascript
// Request Header
Authorization: bearer JWT토큰

// Response 200 ok
{
	"id": String,
	"userId": String,
	"userName": String,
	"emoji": String,
	"color": String,
	"hashTags": String[],
	"likeCount": Number,
	"createdAt": String,
	"updatedAt": String,
}
```



#### 좋아요한 와플카드 목록 불러오기

> GET /waffle-cards/like

```javascript
// Request Header
Authorization: bearer JWT토큰

// Response 200 ok
[
	{
		"id": String,
		"userId": String,
		"userName": String,
		"emoji": String,
		"color": String,
		"hashTags": String[],
		"likeCount": Number,
		"createdAt": String,
		"updatedAt": String,
	},
  ... // 와플카드 객체를 담은 배열 반환
]
```



#### 와플카드 생성하기

> POST /waffle-cards

```javascript
// Request Header
Authorization: bearer JWT토큰

// Request Body
{
	"emoji": "👽",
	"color": "#123456",
	"hashTags": ["안녕", "클레오파트라", "세상에서", "제일가는", "포테이토칩"]
}

// Response 201 ok
{
  "id": String,
	"userId": String,
	"userName": String,
	"emoji": String,
	"color": String,
	"hashTags": String[],
	"likeCount": Number,
	"createdAt": String,
	"updatedAt": String,
}
```



#### 와플카드 수정하기

> PUT /waffle-cards/:id

```javascript
// Request Header
Authorization: bearer JWT토큰

// Request Body
{
	"emoji": "👽",
	"color": "#123456",
	"hashTags": ["안녕", "클레오파트라", "세상에서", "제일가는", "포테이토칩"]
}

// Response 200 ok
{
  "id": String,
	"userId": String,
	"userName": String,
	"emoji": String,
	"color": String,
	"hashTags": String[],
	"likeCount": Number,
	"createdAt": String,
	"updatedAt": String,
}
```



#### 와플카드 삭제하기

> DELETE /waffle-cards/:id

```javascript
// Request Header
Authorization: bearer JWT토큰

// Response 204 ok
```



<br>



### Comment

#### 와플카드에 속한 댓글 불러오기

> GET /comments?waffle-card-id={waffleCardId}

```js
// Request Params
waffle-card-id: waffleCardId

// Response 200 ok
[
  {
    "_id": String,
    "userId": String,
    "userName": String,
    "waffleCardId": String,
    "text": String,
    "createdAt": String,
    "updatedAt": String,
    "id": String
  },
  ... // 댓글이 담긴 배열 반환
]
```





#### 특정 id로 댓글 불러오기

> GET /comments/:id

```js
// Response 200 ok
{
  "_id": String,
	"userId": String,
	"userName": String,
	"waffleCardId": String,
	"text": String,
	"createdAt": String,
	"updatedAt": String,
	"id": String
}
```





#### 댓글 생성하기

> POST /comments

```javascript
// Request Header
Authorization: bearer JWT토큰

// Request Body
{
  "waffleCardId": "61fbf239722eec55a1daae0f",
	"text": "댓글내용"
}

// Response 201 ok
{
  "_id": String,
	"userId": String,
	"userName": String,
	"waffleCardId": String,
	"text": String,
	"createdAt": String,
	"updatedAt": String,
	"id": String
}
```



#### 댓글 수정하기

> PUT/comments/:id

```javascript
// Request Header
Authorization: bearer JWT토큰

// Request Body
{
	"text": "댓글내용"
}

// Response 200 ok
{
	"_id": String,
	"userId": String,
	"userName": String,
	"waffleCardId": String,
	"text": String,
	"createdAt": String,
	"updatedAt": String,
	"id": String
}
```



#### 댓글 삭제하기

> DELETE /comments/:id

```javascript
// Request Header
Authorization: bearer JWT토큰

// Response 204 ok
```



<br>



### Like

좋아요 생성 및 삭제에 따라 와플카드의 `likeCount` 값이 변경됩니다.

#### 좋아요 생성

> POST /likes

```javascript
// Request Header
Authorization: bearer JWT토큰

// Request Body
{
	"waffleCardId": "61fbf239722eec55a1daae0f"
}

// Response 201 ok
{
	"id": String,
	"userId": String,
	"waffleCardId": String
}
```



#### 좋아요 삭제

> DELETE /likes

```javascript
// Request Header
Authorization: bearer JWT토큰

// Request Body
{
	"waffleCardId": "61fbf239722eec55a1daae0f"
}

// Response 204 ok
```
