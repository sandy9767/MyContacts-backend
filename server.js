const express = require("express");
const dotenv = require("dotenv").config();
const fileUpload = require('express-fileupload');

const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const contactRouter = require("./routes/contactRoutes")
const userRouter = require("./routes/userRoutes")

connectDb();
const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(express.json()); // to parse body to accept json
app.use(fileUpload()); // to take form data
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));