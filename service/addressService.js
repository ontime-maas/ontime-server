const addressService = {};
const request = require('request');
const secret = require('../secret/apikey');
const kakaoRequest = request.defaults({
    headers: {'Authorization': 'KakaoAK '+secret.kakaoApiKey}
});


addressService.getAddressInfo = (address) =>{
    const options = {
        uri:'https://dapi.kakao.com/v2/local/search/address.json',
        qs:{
            query: address
        }
    };
    return new Promise((resolve,reject) => {
        kakaoRequest(options,(err,res,body) => {
            if(err){
                reject(err);
            }
            resolve(body);
        })
    })
}

module.exports = addressService;
