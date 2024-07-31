const Customers = require("../../models/People/customers");

const CustomersController = {
  // Đăng ký đối tác
  RegisterPartner: async (req, res) => {
    try {
      const ChangeRole = await Customers.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true, runValidators: true }
      );
      return res.status(200).json({
        status: true,
        message: "Registe is success",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Erro when Register",
        data: error,
      });
    }
  },
  // Thay đổi thông tin
  UpdateInfor: async (req, res) => {
    try {
      const updatedCustomer = await Customers.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
      console.log(updatedCustomer);
      return res.status(200).json({
        status: true,
        message: "Update info is success",
        data: updatedCustomer,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Erro when update infor",
        data: error,
      });
    }
  },
};
module.exports = CustomersController;
