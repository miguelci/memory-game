const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
};

app.get('/cards', cors(corsOptions), (req, res) => {
  res.statusCode = 404;
  const errorMessage = {
      success: false,
     message: 'A number (4, 8 or 12) has to be sent as query parameter'
   };

  if (req.query.number === undefined) {
    return res.send(errorMessage)
  }
  const number = parseInt(req.query.number);

  if (typeof number !== 'number') {
    return res.send(errorMessage)
  }

  if (![4, 8, 12].includes(number)) {
    return res.send(errorMessage)
  }

  let generatedNumbers = [];
  const generateRandomNumbers = (n) => {

    let stillToFill = true;
    while(stillToFill) {

      let generatedNumber = Math.floor(Math.random() * 100);

      if (!generatedNumbers.includes(generatedNumber)) {
          generatedNumbers.push(generatedNumber);
      }

      if (generatedNumbers.length === n) {
        stillToFill = false;
      }
    }

  };

  generateRandomNumbers(number)
  res.statusCode = 200;
  res.send({
    success: true,
    list: generatedNumbers
  });
});

app.use((req, res) => res.sendStatus(404));

module.exports = app;
