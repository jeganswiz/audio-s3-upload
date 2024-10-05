import { RequestHandler } from "../types";
import { Voicememo } from "../models";
import { deleteFile, getFileURL, uploadFile } from "../helpers";

const GetAll: RequestHandler = async (req, res) => {
  try {
    let voicememos = [];
    const voicememosWithOutURL:any = await Voicememo.find({}).lean();
    for (const voicememo of voicememosWithOutURL) {
      const file = await getFileURL(voicememo.file);
      voicememos.push({ ...voicememo, file });
    }
    res.status(200).json({
      msg: "Success",
      isSuccess: true,
      data: voicememos,
    });
  } catch (error) {
    console.log(error);
    
    // If any other error happens handle here
    const msg = error instanceof Error ? error.message : "Can't get voicememos";
    return res.status(500).json({ msg, isSuccess: false });
  }
};
const Create: RequestHandler = async (req, res) => {
  try {
    const { file } = req;
    if (!file)
      return res.status(400).json({
        msg: "Please select a file for upload",
        isSuccess: false,
      });
    const voiceFileName = `${Date.now()}-${file.originalname}`;
    await uploadFile({
      buffer: file.buffer,
      filename: voiceFileName,
      mimetype: file.mimetype,
    });
    const voicememo = await new Voicememo({
      notes: req.body.notes,
      file: voiceFileName,
    }).save();
    res.status(201).json({
      msg: "Created Successfully",
      isSuccess: true,
      data: voicememo,
    });
  } catch (error) {
    console.log("errorrrrrrr", error);
    // If any other error happens handle here
    const msg =
      error instanceof Error ? error.message : "Can't create a new voicememo";
    return res.status(500).json({ msg, isSuccess: false });
  }
};
const Update: RequestHandler = async (req, res) => {
  try {
    const { _id } = req.params;
    const notes = req.body.notes;
    const { file } = req;
    const voicememo:any = await Voicememo.findById(_id);
    if (file) {
      await uploadFile({
        buffer: file.buffer,
        filename: voicememo?.file!,
        mimetype: file.mimetype,
        isUpdatingFile: true,
      });
    }
    await voicememo?.updateOne({ notes }, { new: true });
    res.status(201).json({
      msg: "Updated Successfully",
      isSuccess: true,
    });
  } catch (error) {
    // If any other error happens handle here
    const msg =
      error instanceof Error ? error.message : "Can't update voicememo";
    return res.status(500).json({ msg, isSuccess: false });
  }
};
const Delete: RequestHandler = async (req, res) => {
  try {
    const { _id } = req.params;
    const voicememo:any = await Voicememo.findById(_id);
    await deleteFile(voicememo?.file!);
    await voicememo?.deleteOne();
    res.status(200).json({
      msg: "Deleted Successfully",
      isSuccess: true,
    });
  } catch (error) {
    // If any other error happens handle here
    const msg =
      error instanceof Error ? error.message : "Can't delete voicememo";
    return res.status(500).json({ msg, isSuccess: false });
  }
};

export const voicememoController = { GetAll, Create, Update, Delete };
