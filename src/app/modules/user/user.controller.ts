import catchAsync from "../../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../utils/sendResponse";
import { adminServices } from "./user.service";

export type TUser = {
  email: string;
};

const createAdmin = catchAsync(async (req, res) => {

  const result = await adminServices.createAdmin(req.body as any);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is retrieved successfully",
    data: result,
  });
});

// find admin controllers
const findAdmin = catchAsync(async (req, res) => {
  const result = await adminServices.findAdmin();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is retrieved successfully",
    data: result,
  });
});

export const userController = { createAdmin, findAdmin };
