import express from "express";
import dotenv from "dotenv/config.js";
import getConnection from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/urls", urlRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
