# BikeFinder
<img src="public/images/background-1.png">

## This application is called BikeFinder. It is used for find and compare the best gravel bikes in the market and share the experiences that you live whit your gravel bike.

This is a the backend repository for the React application `BikeFinde`.

---

## Models

- Bike
- Favorite
- Reviews
- User

### User
Users in the database have the following properties:

```
{
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
},
  {
    timestamps: true
  }
```
### Bike
Bike in the database have the following properties:

```
{
  name: {
    type: String,
    unique: true,
    required: true
  },
  image: {
    type: String,
    unique: true,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  terrain: {
    type: String,
    required: true
  },
  biketype: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
  
}
```
### Favorite
Favorite in the database have the following properties:

```
{
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  bikeId: {
    type: Schema.Types.ObjectId,
    ref: "Bike",
    required: true
  }
},
  {
    timestamps: true
  }
```
### Reviews
Review in the database have the following properties:

```
{
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}
```


---

## API endpoints and usage 

| Action           | Method    | Endpoint             | Req.body                        | Private/Public |
|------------------|-----------|----------------------|---------------------------------|-----------------|
| SIGN UP user     | POST      | /api/v1/auth/signup  | { username, email, password }   |    Public |                 
| LOG IN user      | POST      | /api/v1/auth/login   | { email, password }             |    Public |                  
| GET logged in user   | GET     | /api/v1/auth/me    |   | Private |

---

## Useful links

- [Presentation slides]()
- [Frontend repository]()
- [Frontend deploy]()
- [Deployed REST API]()

