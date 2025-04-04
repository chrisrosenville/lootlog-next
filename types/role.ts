import { IUser } from "./user";

export interface IRole {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  users: IUser[];
}
