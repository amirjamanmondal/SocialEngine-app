## Getting Started...

##### Install Nodejs and mongodb in local machine to run the project

- [Click here ](https://nodejs.org/en) to download and install the Node js
- [Click here ](https://www.mongodb.com/try/download/community) to download mongodb and install it

##### Clone the project to your machine

` git clone amirjamanmondal/repo/Gallery`

#### Packages need to install

- _express_
- _nodemon_
- _cors_
- _cookie-parser_
- _multer_
- _dotenv_

`npm install [package name]`

> \_dependencies: {

      "cookie-parser": "^1.4.6",
      "cors": "^2.8.5",
      "dotenv": "^16.4.5",
      "express": "^4.19.2",
      "jsonwebtoken": "^9.0.2",
      "mongoose": "^8.5.3",
      "multer": "^1.4.5-lts.1",
      "nodemon": "^3.1.4"

> }

##### create .env file inside the backend folder

> .env |
> `
db = mongodb://127.0.0.1/Gallery`
> `PORT = 8000`
> `secretKey = '254Amir452'`
> `UPLOAD_IMAGE_DIR = ../../upload/images`

**Start the server**
` cd .\backend\`
` npm run dev`

### Install Postman application for testing api endpoints

- [Click here](https://www.postman.com/downloads/) to download Postman api platform api endpoints test.
  then install it.

## **API Endpoints**

### **Admin**

- **Signup**
  - **Endpoint:** `/admin/signup`
  - **Method:** POST
  - **Body:** `{ name, email, gender, password }`
- **Login**
  - **Endpoint:** `/admin/login`
  - **Method:** POST
  - **Body:** `{ email, password }`
- **Get Local User Details**
  - **Endpoint:** `/admin/register`
  - **Method:** GET
- **Logout**
  - **Endpoint:** `/admin/logout`
  - **Method:** GET

### **User**

- **Signup**
  - **Endpoint:** `/user/signup`
  - **Method:** POST
  - **Body:** `{ name, userName, email, password, confirmPassword, gender }`
- **Login**
  - **Endpoint:** `/user/login`
  - **Method:** POST
  - **Body:** `{ userName, password }`
- **Logout**
  - **Endpoint:** `/user/logout`
  - **Method:** GET
- **Update Username**
  - **Endpoint:** `/user/username/update`
  - **Method:** PUT
  - **Body:** `{ userName }`
- **Update Password**
  - **Endpoint:** `/user/password/update`
  - **Method:** PUT
  - **Body:** `{ password }`
- **Update Name**
  - **Endpoint:** `/user/name/update`
  - **Method:** PUT
  - **Body:** `{ name }`
- **Update or Upload Avatar**
  - **Endpoint:** `/user/avatar/upload`
  - **Method:** PUT
  - **Body:** (form-data) `{ key: 'avatar', value: 'file' }`
- **Get Info of Logged In User**
  - **Endpoint:** `/user/user`
  - **Method:** GET
- **Upload Images**
  - **Endpoint:** `/user/images/upload`
  - **Method:** POST
  - **Body:** (form-data) `{ key: 'image', value: 'file' }`
- **Delete Image**
  - **Endpoint:** `/user/image/delete/:filename`
  - **Method:** DELETE
- **Get All Images of Logged In User**
  - **Endpoint:** `/user/images`
  - **Method:** GET
- **Send Message to Another User**
  - **Endpoint:** `/user/send/:username`
  - **Method:** POST
  - **Body:** `{ comment }`
- **Get Messages Between Logged In User and Another User**
  - **Endpoint:** `/user/comments/:user`
  - **Method:** GET
