export type User = {
  password: string;
  id: string;
  email: string;
  name: string;
  created_at: string;
};

export type UserDTO = {
  id: string;
  email: string;
  name: string;
  created_at: string;
};

export type RegisterInput = {
  email: string;
  password: string;
  name: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: UserDTO;
  token: string;
};
