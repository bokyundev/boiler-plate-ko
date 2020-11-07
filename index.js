// 서버 기동 시 시작 => index.js

// express 모듈 가져옴
const express = require('express');
// express app 생성
const app = express();
// 포트 지정
const port = 5000;

const bodyParser = require('body-parser');
const { User } = require("./models/User");

// bodyParser 설정 : client <-> server간 통신
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());

// MongoDB 연결
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bokyundev:bokyun1234@boilerplate.ote0a.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...')) // then : 완료
  .catch(err => console.log(err));                 // catch(err) : 에러

app.get('/', (req, res) => res.send('Hello World~~~!'));

app.post('/register', (req, res) => {

    // 회원 가입 할 때 필요한 정보를 client에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success: true
        })
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));