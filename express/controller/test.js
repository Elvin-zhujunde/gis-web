const axios = require("axios");

module.exports = {
  test: async (req, res, next) => {
    // let { a, b, c } = req.query;

    let data = await axios.get(
      `https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json`
    );

    res.status(200).send({
      success: true,
      data: data.data,
    });
  },
};
