import Data from "../models/user.js";

class dataController {
  async dataPost(req, res) {
    try {
      const { name, age, hobbies } = req.body;
      const id = req.params;
      console.log(req.params.id);
      const user = new Data({ id, name, age, hobbies });
      await user.save();
      return res.json({ message: "Success" });
    } catch (e) {
      console.log(e);
    }
  }

  async dataGet(req, res) {
    try {
      const { name, age, hobbies } = req.body;
      const id = req.params.id;
      const userId = await Data.findOne({ id });
      if (userId) {
        return res.json({ name, age, hobbies });
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new dataController();
// export default dataController;
