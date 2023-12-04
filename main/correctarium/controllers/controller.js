const calculates = require("../service/calculates.js");

class Controller {
  async controller(req, res, next) {
    try {
      const { language, mimetype, count } = req.body;
      const price = await calculates.calculatePrice(language, mimetype, count);
      const time = await calculates.calculateTime(language, mimetype, count);
      const deadline = await calculates.calculateDeadline(time);
      return res.send({
        price: price,
        time: time,
        deadline: deadline / 1000,
        deadline_date: new Date(deadline).toLocaleString(),
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new Controller();
