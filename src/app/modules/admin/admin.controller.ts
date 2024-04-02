import catchAsync from "../../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../utils/sendResponse";
import { adminServices } from "./admin.service";
import { prick } from "../../../utils/prick";
import { toUSVString } from "util";

export type TUser = {
  email: string;
};

const createAdmin = catchAsync(async (req, res) => {
  const result = await adminServices.createAdmin(req.body as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin create successfully",
    data: result,
  });
});

// find admin controllers


const findAdmin = catchAsync(async (req, res) => {
  const filter = prick(req.query , ['name']);
  const result = await adminServices.findAdmin(filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin find successfully",
    data: result,
  });
});

export const adminController = { createAdmin, findAdmin };
