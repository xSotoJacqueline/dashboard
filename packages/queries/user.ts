import { prisma } from "../services/db";
// Define Role enum manually if not exported by @prisma/client
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export const createUser = async (email: string, name?: string, role?: Role) => {
  return await prisma.user.create({
    data: {
      email,
      name,
      role: role || Role.USER,
      password: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
