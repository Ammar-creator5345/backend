export interface RegisterUserService {
  name: string;
  email: string;
  password: string;
  role: string;
  age: number;
}


export interface LoginUserService {
  email: string;
  password: string;
}
