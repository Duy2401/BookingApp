const Customers = require('../../models/People/customers');

const CustomersController = {
  // Đăng ký đối tác
  RegisterPartner: async (req, res) => {
    try {
      // Tìm khách hàng bằng email và ID
      const customer = await Customers.findOne(req.body.customer_email);
      if (!customer) {
        return res.status(404).json({
          status: false,
          message: 'Customer not found',
        });
      }

      // Cập nhật vai trò của khách hàng
      customer.isRole = 3;
      await customer.save();
      // Kiểm tra lại dữ liệu sau khi lưu
      const updatedCustomer = await Customers.findOne(req.body.customer_email);

      return res.status(200).json({
        status: true,
        message: 'Registration is successful',
        data: updatedCustomer,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: 'Error during registration',
        data: error.message,
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
        message: 'Update info is success',
        data: updatedCustomer,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: 'Erro when update infor',
        data: error,
      });
    }
  },
};
module.exports = CustomersController;
