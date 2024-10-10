## Cutlink - simple url shortner

### **URL Shortener Backend**

This Node.js and Express.js-based project provides a backend API for URL shortening functionality. Users can create accounts, log in, and generate shortened links for their long URLs.

### **Project Structure**

```
C:.
├───app
│   ├───http
│   │   ├───controllers
│   │   ├───middlewares
│   │   ├───models
│   │   └───validators
│   ├───routes
│   │   ├───auth
│   │   ├───link
│   │   └───mainRoute
│   └───utills
│   └───server.js
└───node_modules
└───index.js
```

### **Dependencies**

- **bcrypt:** For password hashing (version ^5.1.1)
- **dotenv:** To load environment variables from a `.env` file (version ^16.4.5)
- **express:** A popular Node.js web framework (version ^4.21.1)
- **express-validator:** For input validation (version ^7.2.0)
- **http-errors:** For creating HTTP error objects (version ^2.0.0)
- **jsonwebtoken:** For creating and verifying JSON Web Tokens (JWTs) (version ^9.0.2)
- **mongoose:** An ODM for MongoDB (version ^8.7.0)
- **morgan:** For logging HTTP requests (version ^1.10.0)
- **nodemon:** To automatically restart the server on code changes (version ^3.1.7)
- **short-unique-id:** For generating short, unique IDs for shortened links (version ^5.2.0)

### **Endpoints**

#### **Authentication**

- **POST /api/v1/auth/signup:** Creates a new user account. Requires `email` and `password` in the request body.
- **POST /api/v1/auth/login:** Logs in an existing user. Requires `email` and `password` in the request body.

#### **Links**

- **GET /api/v1/links:** Gets a list of all links created by the authenticated user.
- **POST /api/v1/links:** Creates a new shortened link. Requires `link` in the request body.

### **Models**

#### **User Schema**

```javascript
const user_schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
```

#### **Link Schema**

```javascript
let link_schema = new mongoose.Schema({
  original_link: {
    type: String,
    required: true,
    unique: true
  },
  shorten_link: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true
  },
  clicks: {
    type: Number,
    default: 0
  }
});
```
### **Environment Variables**

- **PORT:** The port on which the server will listen.
- **DB_URL:** The MongoDB connection URL.
- **JWT_SECRET:** The secret key used for JWT signing and verification.
- **APP_STATE:** The application environment (e.g., `development`, `production`).
- **HOST_BASE_URL:** The base URL of the application (only required in production).



### **Usage**

1. **Clone the repository:** `git clone <repository-url>`
2. **Install dependencies:** `npm install`
3. **Create a `.env` file:** Copy the `.env.example` file and rename it to `.env`. Set your environment variables (e.g., `MONGODB_URI`, `JWT_SECRET`).
4. **Start the server:** `npm start`

### **Contributing**

Contributions are welcome! Please feel free to fork the repository, make your changes, and submit a pull request.


