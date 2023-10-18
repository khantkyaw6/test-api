const express = require("express");
const cors = require("cors");
const adminRoutes = require("./src/routes/admin/admin_route");

const app = express();
const baseUrl = "/api/admin";

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(`${baseUrl}`, adminRoutes);

module.exports = app;
