import express from "express";

import { doctorList } from "../controllers/doctorController.js";

// import upload from "../middlewares/multer.js";
// import authAdmin from "../middlewares/authAdmin.js";
// import { changeAvailablity } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);

export default doctorRouter;
