import { IArticle } from "./article";

export interface ICategory {
  id: number;
  name: string;
  articles: IArticle[];
  createdAt: Date;
  updatedAt: Date;
}
