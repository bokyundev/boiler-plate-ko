const mongoose = require('mongoose');  // MonggoDB

const bcrypt = require('bcrypt');      // 비밀번호 암호화
const saltRounds = 10;                 // salt 길이           

const jwt = require('jsonwebtoken');

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

// Schema.pre =>  save 이전 단계에 실행, next에 도달하면 save 진행
userSchema.pre('save', function(next){
    
    var user = this;

    // 비밀번호 변경 시에만 암호화
    if(user.isModified('password')){

        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err); // 에러 발생 시 에러 그대로 return

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// 비밀번호 비교
userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainPassword : 입력 비밀번호
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
}

// 로그인 토큰 발행
userSchema.methods.generateToken = function(cb) {
    var user = this;

    // jwt 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user)
    })
};

// 모델 생성(모델로 스키마 감싸기)
const User = mongoose.model('User', userSchema);

// 다른 파일들에서도 사용 가능하도록
module.exports = { User }