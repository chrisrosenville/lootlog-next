export interface IComment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  articleId: number;
  userId: number;
}
