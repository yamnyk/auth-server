const config = require('./config');
const cors = require('cors');
const express = require('express');
const usersRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const tokenVerifyMiddleware = require('./middlewares/tokenVerifyMiddleware');

const app = express();

/* applying middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/users', tokenVerifyMiddleware);


/* db */
const MongoClient = require('mongodb').MongoClient(config.dbConnect, {useUnifiedTopology: true});
console.log(require('mongodb'));
/* db connect */
MongoClient.connect((err, client) => {
  if (err) return console.error(err)
  console.log('mongodb connected')
  
  const db = client.db('gogi');
  const usersCollection = db.collection('users');
  
  /* applying routes */
  app.use('/users', usersRoutes);
  app.use('/auth', authRoutes);
  
  app.get('/', (req, resp) => {
    console.log('request is happening');
    resp.send({
      status: "root get request succeeded"
    });
  })
  
});
app.listen(config.PORT, () => {
  console.log(`server is listening on port ${config.PORT}`);
})
