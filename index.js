import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./admin/routes/user.js";
import authRoutes from "./admin/routes/auth.js";
import productRoutes from "./admin/routes/product.js";
import rewardRoutes from "./admin/routes/reward.js";
import qrcodeRoutes from "./admin/routes/qrcode.js";
import scanQRCodeRoutes from "./admin/routes/scanqrcode.js";
import redeemRoutes from "./admin/routes/redeem.js";
import languageMiddleware from "./admin/middlewares/languageMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

export const dbConnection = () => {
  // MongoDB Connection
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", (error) => console.log(error));
  db.once("open", () =>
    console.log(`Connected to Database ${process.env.MONGO_URI}`)
  );
};

dbConnection();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/qrcodes", qrcodeRoutes);
app.use("/api/scanqrcode", scanQRCodeRoutes);
app.use("/api/redeem", redeemRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
