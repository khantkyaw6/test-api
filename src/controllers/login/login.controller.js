const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../../modal/admin/admin.modal");

const store = async (req, res) => {
  try {
    const { mail_or_phone, password } = req.body;
    console.log({ mail_or_phone, password });

    const adminExist = await Admin.findOne({
      $or: [{ email: mail_or_phone }, { phone: mail_or_phone }],
    });

    if (adminExist) {
      const hashPassword = adminExist.password;
      console.log(hashPassword);
      const checkPassword = await bcrypt.compare(password, hashPassword);

      if (checkPassword) {
        const token = await jwt.sign(
          { mail_or_phone, password },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );

        res.status(200).json({
          error: false,
          message: "Login successfully",
          token,
        });
      } else {
        res.status(500).json({
          error: true,
          message: "Password incorrect",
        });
      }
    } else {
      res.status(500).json({
        error: true,
        message: "Email or Phone number doesn't exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = { store };
