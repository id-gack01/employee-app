const express = require('express');
const cors = require('cors');

// to run, write npm start, this is the index.js of the tutorial 

//separate local import and package imports 
const app = express();
//BodyParser was deprecated so I used the express inbuilt function to turn the shit into a json
// app.use(express.json());
// const bodyParser = require('body-parser')
// const bodyparser = require('body-parser'); 
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.use(cors({origin: 'http://localhost:4200'})); //middleware object that allows posts from any port number or domain to interact with the app,  https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

const port = 3000;
//below is how 
const { mongoose } = require('./db.js') //look at Destructuring assignment, db.js exports a mongoose module. This is how the database connects through to my app
const employeeController = require('./controllers/employeeController')

app.get('/', (req, res) => {
  res.send('Employee App Backend is here!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use('/employees', employeeController);