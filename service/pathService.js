const pathService = {};
const request = require('request');
const secret = require('../secret/apikey');
const kakaoRequest = request.defaults({
    headers: {'Authorization': 'KakaoAK '+secret.kakaoApiKey}
});


pathService.getPathByLocation = (sx,sy,ex,ey) =>{
    const options = {
        uri:'https://api.odsay.com/v1/api/searchPubTransPath',
        qs:{
            apiKey: "xLNnzzYE2gTHq/PiSt54nS1ag2uBq042bECGL6mq4PM",
            // lang : "0",
            // output: "json",
            SX: sx,
            SY: sy,
            EX: ex,
            EY: ey
        }
    };

    return new Promise((resolve,reject) => {
        request(options,(err,res,body) => {
            console.log("dfasdf");
            if(err){
                reject(err);
            }
            resolve(body);
        })
    })
}

pathService.getPathByAddress = (address) =>{
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

module.exports = pathService;
