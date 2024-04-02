import { PrismaClient, userRole } from "@prisma/client";
import { hashPassword } from "../../../utils/hashPassword";

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
const findAdmin = async (param: any) => {
  const addConditions = [];

  if (param.search) {
    addConditions.push({
      OR: [
        {
          name: {
            contains: param.search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: param.search,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  const whereCondition = { AND: addConditions };

  const result = prisma.admin.findMany({
    where: whereCondition,
  });
  return result;
};

export const adminServices = { createAdmin, findAdmin };
