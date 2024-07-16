const Customers = require("../models/People/customers");
const UserController = {
  EditProfileUser: async (req, res) => {
    try {
      const oldInforUser = await Customers.findById(req.params.id);
      await oldInforUser.updateOne({ $set: req.body });
      const newInforUser = await await Customers.findById(req.params.id);
      return res.status(200).json({
        status: true,
        message: "Edit Infor Successfully",
        data: newInforUser,
      });
    } catch (error) {
      return res.status(500).json({ message: "Edit Infor is Failure" });
    }
  },
};
module.exports = UserController;
