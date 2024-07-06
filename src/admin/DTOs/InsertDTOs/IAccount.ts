export interface IAccount {
    id: string;
    name: string;
    email: string;
  }
  
  export interface IAccountView {
    id: string;
    name: string;
    email: string;
  }
  
  export interface LoginCredentials {
    EmailOrUserName: string;
    Password: string;
  }
  
  export interface LoginResponse {
    token: string;
    expireDate: string;
    Role: string;
    name: string;
  }
  