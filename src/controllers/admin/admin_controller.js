const Admin = require("../../modal/admin/admin.modal");

const index = async (req, res) => {
  const adminList = await Admin.find({});
  console.log(adminList);
  if (adminList) {
    res.status(200).json({
      error: false,
      message: "Admin List",
      data: adminList,
    });
  }
};

const store = async (req, res) => {
  console.log(req.body);

  const adminExist = await Admin.find({ email: req.body.email });
  if (adminExist) {
    res.status(400).json({
      error: true,
      message: "Email already exist",
    });
  }

  const adminCreate = await Admin.create(req.body);

  res.status(200).json({
    error: false,
    message: "create admin",
    data: adminCreate,
  });
};

const update = async (req, res) => {};

const destroy = async (req, res) => {};

module.exports = { index, store, update, destroy };
