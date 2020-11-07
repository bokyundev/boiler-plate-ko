const mongoose = require('mongoose');

// 스키마 생성
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 공백제거
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {        // 유효성 체크 용
        type: String
    },
    tokenExp: {     // 토큰 유효 기간
        type: Number
    }
});

// 모델 생성(모델로 스키마 감싸기)
const User = mongoose.model('User', userSchema);

// 다른 파일들에서도 사용 가능하도록
module.exports = { User }