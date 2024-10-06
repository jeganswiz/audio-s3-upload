import { Router } from "express";
import { voicememoController } from "../controllers";
import multer from "multer";
import { category } from "../validations";
import { errorFormatter } from "../middleware";

const storage = multer.memoryStorage();
const uploadMiddleWare = multer({
  storage,
  fileFilter: (_req, file, callback) => {
    if (file.mimetype.startsWith("audio/")) return callback(null, true);
    callback(new Error("File type not allowed"));
  },
});

export default Router()
  .post("/getall", voicememoController.GetAll)
  .post(
    "/",
    uploadMiddleWare.single("file"),
    category.create.validation,
    errorFormatter,
    voicememoController.Create
  )
  .put(
    "/:_id",
    uploadMiddleWare.single("file"),
    category.update.validation,
    errorFormatter,
    voicememoController.Update
  )
  .delete("/:_id", voicememoController.Delete);
