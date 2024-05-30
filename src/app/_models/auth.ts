export class Auth {}

export interface Auth {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: boolean;
  message: string;
  token:string;
  adminDetails: any
}

export interface SetPassword {
  password: string;
  confirmPassword: string;
}
export interface resetPassword {
  newPassword: string;
  resetPasswordCode: string;
}
