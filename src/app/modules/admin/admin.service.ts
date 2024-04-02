import { Prisma, PrismaClient, userRole } from "@prisma/client";
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
  //get a object all data without search data
  const { search, ...filterData } = param;
  const addConditions: Prisma.AdminWhereInput[] = [];

  if (param.search) {
    addConditions.push({
      OR: ["name", "email"].map((field) => ({
        [field]: {
          contains: param.search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    addConditions.push({
      AND: Object.keys(filterData).map((keys) => ({
        [keys]: {
          equals: filterData[keys],
          mode: "insensitive",
        },
      })),
    });

   
  }

  const whereCondition: Prisma.AdminWhereInput = { AND: addConditions };

  const result = prisma.admin.findMany({
    where: whereCondition,
  });

  return result;
};

export const adminServices = { createAdmin, findAdmin };
