# Note Manager

Note Manager is The Simple Web Application for create a daily note.
## Stack Of Technology
1. Frontend 
- React JS
- Boostrap
- Axios
2. Backend
- Express.js
- JWT
3. Database
- MariaDB

## Backend Installation
clone the project repository at
```bash
git clone https://github.com/teguhsusanto2304/fullstack-crud-nodejs
```
Preparing Database

```bash
CREATE DATABASE <a new database name>
```

Backend installation.

```bash
cd backend
backend\ npm install
```
configure the database configuration in ***env.staging*** 
```bash
DB_HOST=<database hostname>
DB_USER=<database username>
DB_NAME=<database schema name>
DB_PASSWORD=<database user password>
DB_DRIVER=mysql <you can change to other database engine such as postgres>
SECRET_KEY=<secret key>
```
and then try to running the application
```bash
backend\ npm run start
```
testing the api with user registration first
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@email.com",
    "password": "@Admin123456"
    "roles":["admin"]
  }' \
  http://<hostname>:<port>/api/auth/signup
```

and then user login
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "@Admin123456"
  }' \
  http://<hostname>:<port>/api/auth/signin
```

## Frontend Installation

```bash
cd frontend
frontend\ npm install
```
setup the API host in **env.staging**  file
```bash
REACT_APP_BASE_URL = <the API Hostname or Ip address>
```
running the application
```bash
frontend\ npm start
```
and the application  response in terminal such as below

```bash
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://<hostname>:<port>
  On Your Network:  http://<ip address>:<port>

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```
the application automatically open up the browser and show the application running well or you can manually with typing the addres into address bar in browser
## License

[MIT](https://choosealicense.com/licenses/mit/)