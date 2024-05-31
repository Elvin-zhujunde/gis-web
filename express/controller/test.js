module.exports = {
  test: async (req, res, next) => {
    // let { a, b, c } = req.query;
    res.status(200).send({
      success: true,
      data: 123,
    });
    
  },
};
