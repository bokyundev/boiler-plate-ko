// 서버 기동 시 시작 => index.js

// express 모듈 가져옴
const express = require('express');
// express app 생성
const app = express();
// 포트 지정
const port = 5000;

// MongoDB 연결
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bokyundev:bokyun1234@boilerplate.ote0a.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...')) // then : 완료
  .catch(err => console.log(err));                 // catch(err) : 에러

app.get('/', (req, res) => res.send('Hello World~~~!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));