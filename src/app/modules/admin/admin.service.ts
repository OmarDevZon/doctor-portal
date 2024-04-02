import { PrismaClient, userRole } from "@prisma/client";
import { hashPassword } from "../../../utils/hashPassword";
import { filter } from "../../../utils/filter";

// create admin

const prisma = new PrismaClient();

const createAdmin = async (data: any) => {
  // password hashed
  const password = await hashPassword(data.password);

  const userData = {
    email: data.adminData.email,
    password,
    role: userRole.admin,
  };

  const adminData = {
    name: data.adminData.name,
    email: data.adminData.email,
    profile: data.adminData.profile || "",
    contactNumber: data.adminData.contactNumber,
    role: userRole.admin,
  };

  try {
    // include transaction
    const result = await prisma.$transaction(async (transactionClient) => {
      // create user
      await transactionClient.user.create({
        data: userData,
      });

      // create admin
      const createAdmin = await transactionClient.admin.create({
        data: adminData,
      });
      return createAdmin;
    });
    return result;
  } catch (error) {
    if (error) {
      throw new Error("Admin create filled");
    }
    console.error("Error creating admin record:", error);
  }
};

// find admin service
const findAdmin = async (param: any, pagination: any) => {
  // const { search, ...filterData } = param;
  // const {page, limit} = pagination;

  // // console.log(page, limit, "file name : admin.service line number : +-55");

  // const addConditions = [];

  // if (param.search) {
  //   addConditions.push({
  //     OR: ["name", "email"].map((field) => ({
  //       [field]: {
  //         contains: param.search,
  //         mode: "insensitive",
  //       },
  //     })),
  //   });
  // }

  // if (Object.keys(filterData).length > 0) {
  //   addConditions.push({
  //     AND: Object.keys(filterData).map((keys) => ({
  //       [keys]: {
  //         equals: filterData[keys],
  //         mode: "insensitive",
  //       },
  //     })),
  //   });
  // }

  // const whereCondition = { AND: addConditions };

  // const filter = { where: whereCondition };

  const result = await prisma.admin.findMany(filter(param, pagination));

  if (result.length < 1) {
    return "User Not Fount";
  }
  return result;
};

export const adminServices = { createAdmin, findAdmin };
