import { IArticle } from "./article";
import { IComment } from "./comment";

export interface IUser {
  id: number;
  userName: string;
  fullName: string;
  email: string;
  password: string;
  roleName: string;
  articles: IArticle[];
  comments: IComment[];
}

export interface IRegisterCredentials
  extends Omit<IUser, "id" | "roleName" | "articles" | "comments"> {
  userName: string;
  fullName: string;
  email: string;
  password: string;
}

export interface ILoginCredentials
  extends Omit<
    IUser,
    "id" | "roleName" | "articles" | "comments" | "fullName" | "userName"
  > {
  email: string;
  password: string;
}
