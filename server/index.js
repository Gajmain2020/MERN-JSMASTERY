import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRouter from "./routes/user.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/posts", postRoutes);

app.use("/user", userRouter);
//MongoDB connection here....

// for mongoDB compass Local Connection
const CONNECTION_URL = process.env.CONNECTION_URL;

// for mongoDB atlas Connection
// const CONNECTION_URL =
//   "mongodb+srv://Gajendra:Gajendra@cluster0.utsv2kq.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running At :: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

// mongoose.set("useFindAndModify", false); // This is not working don't know why
