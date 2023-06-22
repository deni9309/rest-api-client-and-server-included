const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const { auth } = require('./middlewares/authMiddleware');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/furniture-2023')
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // for parsing Ajax queries
app.use(cors());
////manual middleware for removing restriction Same-Origin-Policy (allow CORS)
// app.use((req, res, next) => {
//     res.setHeader('Access-Controll-Allow-Origin', '*');
//     res.setHeader('Access-Controll-Allow-Methods', '*');
//     res.setHeader('Access-Controll-Allow-Headers', '*');

//     next()
// });
app.use(auth);

app.use(routes);

app.listen(3030, () => console.log('RESTful server is listening on port 3030...'));