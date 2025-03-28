import { ICategory } from "./category";
import { IComment } from "./comment";
import { IImage } from "./image";
import { IUser } from "./user";
import { IVideo } from "./video";

export interface IArticle {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  body: string;

  category: ICategory;
  comments: IComment[];
  author: IUser;

  isPublic: boolean;
  isFeatured: boolean;

  image?: IImage | null;
  video?: IVideo | null;
}
