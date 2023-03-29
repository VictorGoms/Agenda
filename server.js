require('dotenv').config();
const express = require('express'); //express
const app = express(); //express
const mongoose = require('mongoose') //mongodb
mongoose.connect(process.env.CONECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true,})
.then(()=> {
     app.emit('pronto')
})
.catch(e => console.log(e)); //mongoDB
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes'); // routes (express)
const path = require ('path'); //caminhos e diretorios (__dirname __filename)

const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware'); //middleware (express)


app.use(express.urlencoded({extended: true})); //express
app.use(express.static(path.resolve(__dirname, 'public'))); //path

const sessionOptions = session({
    secret: 'eopfmepmfkwemweeflewplasdsam()',
    store: MongoStore.create ({ mongoUrl: process.env.CONECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*7,
        httpOnly: true
    }
});


app.use(sessionOptions)
app.use(flash());

app.set ('views', path.resolve(__dirname, 'src', 'views'));//path + criando um ejs
app.set ('view engine', 'ejs'); //criando um ejs
app.use(csrf());
app.use(middlewareGlobal);//middleware
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);//routes (express)


app.on ('pronto', ()=>{
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('servidor execultando na porta 3000');
    }); //nodemoon
}) //mongoDB


