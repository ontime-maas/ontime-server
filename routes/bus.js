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
  });
// const parseString = require('xml2js').parseString;
var convert = require('xml-js');
// 대중교통 정류장 검색
// 안드로이드에서 정류장 arsId 가져오기
router.get('/station', (req, response, next) => {
    let stationName = req.query.stationName;
    let stationId = req.query.stationId;

    const options = {
        uri: 'https://api.odsay.com/v1/api/searchStation',
        qs: {
          apiKey: "xLNnzzYE2gTHq/PiSt54nS1ag2uBq042bECGL6mq4PM",
          lang: 0,
          stationName: stationName
        }
      };
    
    request(options, (err, res, body) => {
        if (err) {
            response.json(err);
        }
        body = JSON.parse(body);
        // response.json(body);
        body.result.station.forEach(element => {
            console.log(element);
            if(element.stationID == stationId){
                return response.json(element);
            }
        });
    })
});

router.get('/station/arsid', (req, response, next) => {
    let stationName = req.query.stationName;
    let stationId = req.query.stationId;

    const options = {
        uri: 'https://api.odsay.com/v1/api/searchStation',
        qs: {
          apiKey: "xLNnzzYE2gTHq/PiSt54nS1ag2uBq042bECGL6mq4PM",
          lang: 0,
          stationName: stationName
        }
      };
    
    request(options, (err, res, body) => {
        if (err) {
            response.json(err);
        }
        body = JSON.parse(body);
        // response.json(body);
        body.result.station.forEach(element => {
            console.log(element);
            if(element.stationID == stationId){
                
                let ret = {
                    arsID : element.arsID.split('-')[0]+element.arsID.split('-')[1]
                }
                return response.json(ret);
            }
        });
    })
});

router.get('/station/arrive', (req, response, next) => {
    let arsIdd = req.query.arsId;
    let a = "I9IKiG3GwYwHbGGI9Aj9tALcoiJHVP7I6%2F58Lqog0dl7PMENlfwfUkAynzP%2BhWEUi%2FTOJsWbG6gT7pidnCI59w%3D%3D"
    const options = {
        uri: "http://ws.bus.go.kr/api/rest/stationinfo/getStationByUid?serviceKey="+a+"&arsId="+arsIdd
        // qs: {
        //   serviceKey: "I9IKiG3GwYwHbGGI9Aj9tALcoiJHVP7I6%2F58Lqog0dl7PMENlfwfUkAynzP%2BhWEUi%2FTOJsWbG6gT7pidnCI59w%3D%3D",
        //   arsId: arsIdd
        // }
      };

      console.log(options.qs);
    
    request(options, (err, res, body) => {
        if (err) {
            response.json(err);
        }
        let ret = convert.xml2json(body , {compact: true, spaces: 2})
        ret = JSON.parse(ret);
        response.json(ret.ServiceResult.msgBody.itemList);
            // console.log(ret.ServiceResult.msgBody[0].itemList);
            // response.json(ret.ServiceResult.msgBody[0].itemList);
    })
});



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
