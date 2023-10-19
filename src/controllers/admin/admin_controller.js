const Admin = require("../../modal/admin/admin.modal");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const index = async (req, res) => {
  try {
    const adminList = await Admin.find({}).sort({ createdAt: -1 });

    if (adminList) {
      res.status(200).json({
        error: false,
        message: "Admin List",
        data: adminList,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const store = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(email);

    const adminExist = await Admin.findOne({ email });
    console.log(Boolean(!adminExist));

    if (adminExist) {
      res.status(400).json({
        error: true,
        message: "Email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, process.env.SALT * 1);

    const adminCreate = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    if (adminCreate) {
      res.status(201).json({
        error: false,
        message: "Create admin successfully",
        data: adminCreate,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const { name, email, password } = req.body;
    const adminExist = await Admin.findById(new ObjectId(id));
    if (adminExist) {
      const hashedPassword = await bcrypt.hash(password, process.env.SALT * 1);

      const adminUpdate = await Admin.findByIdAndUpdate(
        id,
        {
          name,
          email,
          password: hashedPassword,
        },
        { new: true }
      );
      res.status(200).json({
        error: false,
        message: "Update Successfully",
        data: adminUpdate,
      });
    } else {
      res.json({
        error: true,
        message: "Admin doesn't exist",
      });
    }
  } catch (error) {
    res.json({
      err: error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const adminDelete = await Admin.findByIdAndDelete(id);
    if (adminDelete) {
      res.status(200).json({
        error: false,
        message: "Delete Successfully",
      });
    } else {
      res.status(400).json({
        error: true,
        message: "Admin doesn't exit",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { index, store, update, destroy };
