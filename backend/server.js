const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectionDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
