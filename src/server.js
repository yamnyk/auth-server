const config = require('./config');
const cors = require('cors');
const express = require('express');
const usersRoutes = require('./routes/user.routes');
const tokenVerifyMiddleware = require('./middlewares/tokenVerifyMiddleware');

const app = express();

/* applying middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use('/users', tokenVerifyMiddleware);
app.use('/users/:endpoint', tokenVerifyMiddleware);

/* applying routes */
app.use('/users', usersRoutes);

app.get('/', (req, resp) => {
  console.log('request is happening');
  resp.send({
    status: "root get request succeeded"
  });
})

app.listen(config.PORT, () => {
  console.log(`server is listening on port ${config.PORT}`);
})