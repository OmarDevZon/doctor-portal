import { PrismaClient, userRole } from "@prisma/client";
import { hashPassword } from "../../../utils/hashPassword";
import { filter } from "../../../utils/filter";

// create admin

const prisma = new PrismaClient();



// find admin service
const findUser = async (param: any, pagination: any) => {
  const result = await prisma.user.findMany(filter(param));

  if (result.length < 1) {
    return "User Not Fount";
  }
  return result;
};

export const userServices = {  findUser };
