import { User } from "../models";

import {
  LoginData,
  RegisterData
} from "../types/auth.types";

import {
  comparePassword,
  hashPassword
} from "../utils/password";

import {
  generateToken
} from "../utils/jwt";

export const register = async (
  data: RegisterData
) => {

  if (
    !data.name ||
    !data.email ||
    !data.password ||
    !data.role
  ) {
    throw new Error(
      "Name, email, password and role are required"
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

  const hashedPassword = await hashPassword(
    data.password
  );

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role,
    status: true
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};

export const login = async (
  data: LoginData
) => {

  if (!data.email || !data.password) {
    throw new Error(
      "Email and password are required"
    );
  }

  const user = await User.findOne({
    where: {
      email: data.email,
      status: true
    }
  });

  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const passwordValid = await comparePassword(
    data.password,
    user.password
  );

  if (!passwordValid) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const token = generateToken({
    id: user.id,
    role: user.role
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};