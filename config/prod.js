// DB 접속정보 보호 -> dev.js에 URL 등록 후 gitignore에 추가. 이후 index.js에서 import해서 사용
module.exports = {
    mongoURI: process.env.MONGO_URI
}