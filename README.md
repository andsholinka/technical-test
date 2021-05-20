## Built with

* [ExpressJs](https://expressjs.com/) - The web framework used
* [MongoDB](https://www.mongodb.com/1) - Database
* [Mongoose](https://mongoosejs.com/) - Elegant mongodb object modeling for node.js

The user authentication is implemented using **[JWT](https://jwt.io/)** and **refresh token** mechanism

## Getting Started
```
clone this repository
npm install
setup the .env
run start.dev
```

### Set Up .env

Make `.env` file on **each** Node folder for the environment variables

```dosini
PORT=3000
MONGODB_URI=mongodb+srv://admin:admin@restapi.6lvxn.mongodb.net/sejuta-cita?retryWrites=true&w=majority
SECRET=sejutaCita
SECRET2=sejutaCita2
```

## API DOC
* [LINK](https://documenter.getpostman.com/view/13775058/TzRa64Cs) - Postman

## Flow API
![](./media/Flow-API.jpg)