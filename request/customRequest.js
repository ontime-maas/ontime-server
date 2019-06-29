const request = require('request');
const secret = require('../secret/apikey');

const kakaoRequest = request.defaults({
    headers: {
        'Authorization': 'KakaoAK ' + secret.kakaoApiKey
    }
});

module.exports = {
    kakaoRequest: kakaoRequest
}