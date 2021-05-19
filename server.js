const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:${process.env.MONGODB_URI}/theravetheorychat` || `mongodb://localhost:27017/theravetheorychat`);

const port = process.env.PORT || 4000;

console.log('peepee');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// // create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
