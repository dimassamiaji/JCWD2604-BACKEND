/** @format */

import multer from "multer";
import uuid from "uuid";
import moment from "moment";
import { Request } from "express";
export const fileUploader = ({
  destinationFolder = "",
  prefix = "",
  filetype = "",
}) => {
  const storageConfig = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, `${__dirname}/../public/${destinationFolder}`);
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      console.log(file);
      const fileExtention = file.mimetype.split("/")[1];
      const filename = `${prefix}_${moment().format(
        "YYYY-MM-DD-HH-mm-ss-SSS-" + uuid.v1()
      )}.${fileExtention}`;
      cb(null, filename);
    },
  });
  const uploader = multer({
    storage: storageConfig,
    fileFilter: (req: Request, file: Express.Multer.File, cb) => {
      if (file.mimetype.split("/")[0] != filetype) {
        return cb(null, false);
      }
      return cb(null, true);
    },
    limits: {
      fileSize: 10000000,
    },
  });
  return uploader;
};
