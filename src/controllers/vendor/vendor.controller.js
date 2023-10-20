const Vendor = require("../../modal/vendor/vendor.model")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const index = async (req, res) => {
	try {
		const vendorList = await Vendor.find({}).sort({ createdAt: -1 });

		if (vendorList) {
			res.status(200).json({
				error: false,
				message: "Vendor List",
				data: vendorList,
			});
		}
	} catch (error) {
		res.status(500).json({
			error: true,
			message: error.message
		})
	}
};

const store = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		console.log(email);

		const vendorExist = await Vendor.findOne({ email });
		console.log(Boolean(!vendorExist));

		if (vendorExist) {
			res.status(400).json({
				error: true,
				message: "Email already exist",
			});
		}

		const hashedPassword = await bcrypt.hash(password, process.env.SALT * 1);

		const vendorCreate = await Vendor.create({
			name,
			email,
			password: hashedPassword,
		});

		if (vendorCreate) {
			res.status(201).json({
				error: false,
				message: "Vendor Create successfully",
				data: vendorCreate,
			});
		}
	} catch (error) {
		res.status(500).json({
			error: true,
			message: error.message
		})
	}
};

const update = async (req, res) => {
	try {
		console.log(req.params);
		const { id } = req.params;
		const { name, email, password } = req.body;
		const vendorExist = await Vendor.findById(new ObjectId(id));
		if (vendorExist) {
			const hashedPassword = await bcrypt.hash(password, process.env.SALT * 1);

			const vendorUpdate = await Vendor.findByIdAndUpdate(
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
				data: vendorUpdate,
			});
		} else {
			res.json({
				error: true,
				message: "Vendor doesn't exist",
			});
		}
	} catch (error) {
		res.status(500).json({
			error: true,
			message: error.message,
		});
	}
};

const destroy = async (req, res) => {
	try {
		const { id } = req.params;

		const vendorDelete = await Vendor.findByIdAndDelete(id);
		if (vendorDelete) {
			res.status(200).json({
				error: false,
				message: "Delete Successfully",
			});
		} else {
			res.status(400).json({
				error: true,
				message: "Vendor doesn't exit",
			});
		}
	} catch (error) {
		res.status(500).json({
			error: true,
			message: error.message
		})
	}
};

module.exports = { index, store, update, destroy };
