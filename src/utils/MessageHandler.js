const { BadRequestError, ServerError } = require("../core/error.response");
const HandleError = require("../utils/HandleError");

module.exports = async (bsfunction, req, res) => {
  try {
    const parameters = req.method === "POST" ? req.body : req.query;
    const result = await bsfunction(parameters);
    res.json({ result: "success", content: result });
  } catch (e) {
    console.log('ERROR: ', e);
    if (e instanceof HandleError) {
      const response = JSON.parse(e.message);
      res
        .status(response?.status)
        .json({ result: 'fail', message: response?.message });
    } else {
      res
        .status(500)
        .json({ result: 'fail', message: 'Technical Error' });
    }
  }
};
