import { User } from "../models";
import { hashPassword } from "../utils/password";

export const getUsers = async () => {
  return User.findAll({
    attributes: {
      exclude: ["password"]
    },
    where: {
      status: true
    }
  });
};

export const getUserById = async (id: number) => {
  const user = await User.findOne({
    where: {
      id,
      status: true
    },
    attributes: {
      exclude: ["password"]
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "GESTOR";
}) => {

  if (!data.name || !data.email || !data.password) {
    throw new Error(
      "Name, email and password are required"
    );
  }

  if (data.password.length < 6) {
    throw new Error(
      "Password must contain at least 6 characters"
    );
  }

  const existingUser = await User.findOne({
    where: {
      email: data.email
    }
  });

  if (existingUser) {
    throw new Error(
      "Email already registered"
    );
  }

  const password = await hashPassword(
    data.password
  );

  const user = await User.create({
    name: data.name,
    email: data.email,
    password,
    role: data.role,
    status: true
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status
  };
};

export const updateUser = async (
  id: number,
  data: {
    name?: string;
    email?: string;
    password?: string;
    role?: "ADMIN" | "GESTOR";
  }
) => {

  const user = await User.findOne({
    where: {
      id,
      status: true
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (data.email) {
    const existingUser = await User.findOne({
      where: {
        email: data.email
      }
    });

    if (
      existingUser &&
      existingUser.id !== id
    ) {
      throw new Error(
        "Email already registered"
      );
    }
  }

  if (data.password) {

    if (data.password.length < 6) {
      throw new Error(
        "Password must contain at least 6 characters"
      );
    }

    data.password = await hashPassword(
      data.password
    );
  }

  await user.update(data);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status
  };
};

export const deleteUser = async (
  id: number
) => {

  const user = await User.findOne({
    where: {
      id,
      status: true
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  await user.update({
    status: false
  });
};