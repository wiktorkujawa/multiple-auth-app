const express = require('express'); 
const cors = require('cors'); 
const path = require('path'); 
const mongoose = require('mongoose'); 
require('dotenv').config(); 
require('./modules/auth');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const auth = require('./routes/auth');
const session = require('express-session');

app.use(cookieParser());
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb', extended: false}));

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true
  })
);



// Express session
app.use(
  session({
    secret: process.env.sessionSecret,
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());


// Connect to Mongo
mongoose 
  .connect(process.env.mongoURI, { 
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false }) // Adding new mongo url parser 
  .then(() => console.log('MongoDB Connected...')) 
  .catch(err => console.log(err)); 

app.use('/auth', auth);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => { 
  console.log(__dirname);
    res.sendFile(path.join(__dirname, 'dist/index.html')) 
}); 
const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));