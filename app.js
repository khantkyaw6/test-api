const express = require("express");
const cors = require("cors");
const validateToken = require("./src/middlewares/validate.token");
const adminRoutes = require("./src/routes/admin/admin_route");
const loginRoutes = require("./src/routes/login/login.route");
const vendorRoutes = require("./src/routes/vendor/vendor.route");
const roleRoutes = require("./src/routes/role/role.route");

const app = express();
const baseUrl = "/api/admin";
const baseVendorUrl = "/api/vendor";

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(`${baseUrl}`, adminRoutes);
app.use(`${baseVendorUrl}`, vendorRoutes);
app.use(`${baseUrl}`, loginRoutes);
app.use(`${baseUrl}`, validateToken, roleRoutes);

module.exports = app;
