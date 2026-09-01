import { UserRole } from "../models/User";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  role: UserRole;
}

export interface AuthenticatedUser {
  id: number;
  role: UserRole;
}