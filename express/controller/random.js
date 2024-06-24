const chinaBoder = require("../data/chinaboder.json");
const turf = require("@turf/turf");
module.exports = {
  // 随机数
  getRandomPois: async (req, res, next) => {
    let num = Number(req.query?.num || 1);
    if (num > 10000) num = 10000;
    var points = turf.randomPoint(num, { bbox: turf.bbox(chinaBoder) });

    res.status(200).send({
      success: true,
      data: points,
    });
  },
};
