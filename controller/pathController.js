const pathService = require('../service/pathService')

const pathController = {};


pathController.searchPathBylocation= (req,res,next) => {
    let sx = req.query.sx;
    let sy = req.query.sy;
    let ex = req.query.ex;
    let ey = req.query.ey;


    pathService.getPathByLocation(sx,sy,ex,ey)
    .then((ret) => {
        ret = JSON.parse(ret);
        // const responseObject = {
        //     x : ret.documents[0].x,
        //     y : ret.documents[0].y,
        //     param : req.params.id
        // }
        console.log(ret.result);
        let pathLength = ret.result.path.length;
        let pointDistance = ret.result.pointDistance;

        

        console.log("길 찾기 결과 수 : " ,pathLength);

        console.log("출발지와 도착지의 직선거리 : " ,pointDistance);

        console.log("이동수단 : ",ret.result.path[0].pathType);
        
        let firstPub = getFirstPub(ret.result.path[10].subPath);


        console.log("첫번째 타는 교통수단 : ",firstPub);


        res.send(ret);
    })
    .catch((e) => {
        res.send(e);
    })
}

function getFirstPub(subPath){
    for(let i = 0; i<subPath.length; i++){
        if(subPath[i].trafficType == 1){
            return "지하철"
        }else if(subPath[i].trafficType == 2){
            return "버스"
        }
    }
}

pathController.searchPathByAddress= (req,res,next) => {
    pathService.getPathByAddress(req.params.id)
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
}





module.exports = pathController;
