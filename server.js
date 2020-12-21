const express = require('express'); 
const cors = require('cors'); 
const path = require('path'); 
const mongoose = require('mongoose'); 
require('dotenv').config(); 
const bodyParser = require('body-parser');
// #6 Initialize an Express application 
const app = express();

app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb', extended: false}));

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true
  })
);


// Connect to Mongo
mongoose 
  .connect(process.env.mongoURI, { 
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false }) // Adding new mongo url parser 
  .then(() => console.log('MongoDB Connected...')) 
  .catch(err => console.log(err)); 


app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, 'dist/index.html')) 
}); 
const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));