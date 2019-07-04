var express = require('express');
var router = express.Router();
const request = require('request');
const secret = require('../secret/apikey')
const tmoneyRequest = request.defaults({
    headers: {
        'Accept': 'application/xml',
        'Content-type': 'application/x-www-form-urlencoded',
        'x-Gateway-APIKey': secret.tmoneyApiKey
    }
  })

// 주소에 대한 좌표를 얻기
router.get('/:busNumber', function(req, res, next) {
    getBusByBusNumber(req.params.busNumber)
        .then((ret) => {
            res.send(ret);
            // ret = JSON.parse(ret);
            // const responseObject = {
            //     x : ret.documents[0].x,
            //     y : ret.documents[0].y,
            //     param : req.params.id
            // }
            // res.send(responseObject);
        })
        .catch((e) => {
            res.send(e);
        })
});

router.get('/info/:busId', function(req, res, next) {
    getBusInfoByBusId(req.params.busId)
        .then((ret) => {
            res.send(ret);
            // ret = JSON.parse(ret);
            // const responseObject = {
            //     x : ret.documents[0].x,
            //     y : ret.documents[0].y,
            //     param : req.params.id
            // }
            // res.send(responseObject);
        })
        .catch((e) => {
            res.send(e);
        })
});

function getBusByBusNumber(busNumber){

    console.log(busNumber);
    const options = {
        uri:'https://apigw.tmoney.co.kr:5556/gateway/szBusRouteListGet/v1/busRouteInfo/getBusRouteList',
        qs:{
            serviceKey: '01234567890',
            strSrch: busNumber,
            busRouteType  : '2'
        }
    };
    return new Promise((resolve,reject) => {
        tmoneyRequest(options,(err,res,body) => {
            if(err){
                reject(err);
            }
            // console.log(res);
            resolve(body);
        })
    })
}

function getBusInfoByBusId(busNumber){
    console.log(busNumber);
    const options = {
        uri:'https://apigw.tmoney.co.kr:5556/gateway/szRouteInfoGet/v1/busRouteInfo/getRouteInfo ',
        qs:{
            serviceKey: '01234567890',
            busRouteId: busNumber,
            // busRouteType  : '2'
        }
    };
    return new Promise((resolve,reject) => {
        tmoneyRequest(options,(err,res,body) => {
            if(err){
                reject(err);
            }
            // console.log(res);
            resolve(body);
        })
    })
}



module.exports = router;
