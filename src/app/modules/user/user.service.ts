import { PrismaClient, userRole } from "@prisma/client";
import bcrypt from "bcrypt";

// create admin

const prisma = new PrismaClient();

const createAdmin = async (data: any) => {
  // password hashed
  const hashPassword = await bcrypt.hash(data.password, Number(12));

  const userData = {
    email: data.adminData.email,
    password: hashPassword,
    role: userRole.admin,
  };

  const adminData = {
    name: data.adminData.name,
    email: data.adminData.email,
    profile: data.adminData.profile || "",
    contactNumber: data.adminData.contactNumber,
    role: userRole.admin,
  };

  // const result = await prisma.$transaction(async (transactionClient) => {
  //   const createUser = await transactionClient.user.create({
  //     data: userData,
  //   });
  //   const createAdmin = await transactionClient.admin.create({
  //     data: adminData,
  //   });
  //   return createUser;
  // });

  try {
    const result = await prisma.$transaction(async (transactionClient) => {
      const createUser = await transactionClient.user.create({
        data: userData,
      });
      const createAdmin = await transactionClient.admin.create({
        data: adminData,
      });
      return createUser;
    });
    return result;

    // const deletedAdmins = await prisma.user.deleteMany({}); // Empty filter object deletes all records
    // console.log('Deleted admins:', deletedAdmins);

    // const result = await prisma.user.create({
    //   data: userData,
    // });
    // return result

    // const admin = await prisma.admin.create({
    //   data: adminData,
    // });
    // return admin;
  } catch (error) {
    if (error) {
      throw new Error(
        "asdfffffffffffffffffffffffffffffffffffffffffffffffffffffff"
      );
    }
    console.error("Error creating admin record:", error);
  }
};

// find admin service
const findAdmin = async () => {
  const result = "Admin create successful";
  return result;
};

export const adminServices = { createAdmin, findAdmin };
