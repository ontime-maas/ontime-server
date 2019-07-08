const pathService = {};
const request = require('request');


pathService.getPathByLocation = (sx, sy, ex, ey) => {
  const options = {
    uri: 'https://api.odsay.com/v1/api/searchPubTransPath',
    qs: {
      apiKey: "xLNnzzYE2gTHq/PiSt54nS1ag2uBq042bECGL6mq4PM",
      // lang : "0",
      // output: "json",
      SX: sx,
      SY: sy,
      EX: ex,
      EY: ey
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      console.log("dfasdf");
      if (err) {
        reject(err);
      }
      resolve(body);
    })
  })
}



module.exports = pathService;