"use server";

import { TArticle } from "@/types/article.types";
import { serverFetch } from "..";

export const getFrontpageArticles = async () => {
  try {
    const res = await serverFetch(`/articles/frontpage`, {
      method: "GET",
    });

    if (res.ok) {
      const articles = (await res.json()) as {
        featured: TArticle;
        articles: TArticle[];
      };

      return articles;
    }

    return null;
  } catch (err) {
    console.log("Error getting other frontpage articles:", err);
    throw new Error("Failed to fetch frontpage articles");
  }
};

export const getArticleById = async (articleId: number) => {
  try {
    const res = await serverFetch(`/articles/${articleId}`, {
      method: "GET",
    });

    if (res.ok) return (await res.json()) as TArticle;

    return null;
  } catch (err) {
    console.log("Error getting article by ID:", err);
    throw new Error("Failed to fetch article by ID");
  }
};

export const getArticlesByCategoryName = async (
  category: string,
  amount: number,
) => {
  try {
    const res = await serverFetch(`/articles/category/${category}/${amount}`, {
      method: "GET",
    });

    if (res.ok) return (await res.json()) as TArticle[];

    return null;
  } catch (err) {
    console.log("Error getting articles by category:", err);
    throw new Error("Failed to fetch articles by category");
  }
};
