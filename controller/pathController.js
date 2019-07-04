const pathService = require('../service/pathService')

const pathController = {};


pathController.searchPathBylocation= (req,res,next) => {
    let sx = req.query.sx;
    let sy = req.query.sy;
    let ex = req.query.ex;
    let ey = req.query.ey;
    let maxPath = req.query.maxPath;

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
        console.log("길 찾기 결과 수 : " ,pathLength);

        for(let i =0 ; i<maxPath; i++){
            if(i >= ret.result.path.length){
                break;
            }
            console.log(`${i+1} 번째 길찾기 결과입니다.`);
            console.log(`${i+1} 번째 경로는 총 ${ret.result.path[i].subPath.length}번 행동을 취해야합니다`);
            for(let j = 0; j<ret.result.path[i].subPath.length; j++){
                console.log(`${ret.result.path[i].subPath[j].trafficType} 로 ${ret.result.path[i].subPath[j].distance} 만큼 이동합니다.
                 약 ${ret.result.path[i].subPath[j].sectionTime}분이 소요됩니다`);
            }
            console.log(ret.result.path[i]);
        }

        let pointDistance = ret.result.pointDistance;
        console.log("출발지와 도착지의 직선거리 : " ,pointDistance);


        
        



        console.log("이동수단 : ",ret.result.path[11].pathType);
        
        let firstPub = getFirstPub(ret.result.path[11].subPath);


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
            return "1"
        }else if(subPath[i].trafficType == 2){
            return "2"
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
