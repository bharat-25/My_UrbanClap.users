export type AcceptAny=any
export interface SessionAttributes {
    id: number;
    userId: number;
    device: string;
    is_active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  export interface UserAttributes {
    id: number;
    username: string;
    phone_number: string;
    email: string;
    password:string;
    address:string;
    session:boolean;
    status:boolean;
    role:string;
    createdAt?: Date;
    updatedAt?: Date;
  }
