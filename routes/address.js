var express = require('express');
var router = express.Router();
const request = require('request');
const secret = require('../secret/apikey')
const kakaoRequest = request.defaults({
    headers: {'Authorization': 'KakaoAK '+secret.kakaoApiKey}
  })

// 주소에 대한 좌표를 얻기
router.get('/:id', function(req, res, next) {
    getAddressInfo(req.params.id)
        .then((ret) => {
            ret = JSON.parse(ret);
            const responseObject = {
                x : ret.documents[0].x,
                y : ret.documents[0].y,
                param : req.params.id
            }
            res.send(responseObject);
        })
        .catch((e) => {
            res.send(e);
        })

});

function getAddressInfo(address){
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




module.exports = router;
