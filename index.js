const express = require('express')
const routes = require('./src/routes/routes');

const app = express()
const port = 3001

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*' /* could be 'brendanmeachen.co.uk */); //Solve CORS issues
  res.setHeader('Access-Control-Allow-Methods', 'POST'); //set the methods external clients can use
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/screens', routes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
