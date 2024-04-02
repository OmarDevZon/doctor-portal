import catchAsync from "../../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../utils/sendResponse";
import { prick } from "../../../utils/prick";
import { userServices } from "./user.service";

export type TUser = {
  email: string;
};

// find admin controllers

const findUser = catchAsync(async (req, res) => {
  const filter = prick(req.query, ["email"]);
  const pagination = prick(req.query, ["page", "limit"]);
  const result = await userServices.findUser(filter, pagination);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User find successfully",
    data: result,
  });
});

export const userController = { findUser };
