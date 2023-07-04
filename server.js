const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const dotenv = require('dotenv')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const connectDB = require('./config/db')
// const Handlebars = require('handlebars')
const flash = require('connect-flash')
// const helmet = require('helmet')
// const compression = require('compression')
// const helpers = require('./utils/hbsHelpers')


//env variable
dotenv.config()

//Connecting to database
connectDB()

//express valiable
const app = express()

// Initialize session store
const store = new MongoStore({
    uri: process.env.MONGO_URI,
    collection: "sessions",
  });

// // Catch errors
store.on('error', function(error) {
    console.log(error);
  });

  //body parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
})
);

app.use(flash())

//set static folder
app.use(express.static(path.join(__dirname,'public')))

//Initilaizie template engine (handlebars)
app.engine('.hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', '.hbs')

//Initiliaizia router
app.use('/',require('./routes/homeRouters'))
app.use('/posters',require('./routes/posterRouters'))
app.use('/auth',require('./routes/authRoutes'))
app.use('/profile',require('./routes/profileRoutes'))

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`server ${PORT} portda ishga tushdi...`);
})

