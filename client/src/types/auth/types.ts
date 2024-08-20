export type SignupFormData = {
  username: string;
  email: string;
  password: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type ChangePasswordFormData = {
  password: string;
  confirmPassword: string;
};
