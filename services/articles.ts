"use server";
import { z } from "zod";

import { convertCanvasToBlob, resizeImage } from "@/lib/image";
import {
  existingArticleSchema,
  newArticleSchema,
} from "@/lib/schemas/articleSchemas";

import { prisma } from "@/prisma/prisma";

export const createArticle = async (data: any) => {
  try {
    const canvas = await resizeImage(data.image[0]);
    if (canvas) {
      const blob = await convertCanvasToBlob(
        canvas,
        data.image[0].type,
        data.image[0].name,
      );
      if (blob) data.image[0] = blob;
    }

    const res = await prisma.article.create({
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
        categoryId: data.categoryId,
        authorId: data.authorId,
        statusId: data.statusId,
      },
    });

    return res;
  } catch (err) {
    console.error("Error creating article:", err);
    throw err;
  }
};

export const getAllArticles = async () => {
  try {
    return await prisma.article.findMany();
  } catch (error) {
    console.error("Error getting articles:", error);
    return null;
  }
};

export const getArticlesByUser = async (userId: number) => {
  try {
    return await prisma.article.findMany({
      where: {
        authorId: userId,
      },
    });
  } catch (error) {
    console.error("Error getting articles:", error);
    return null;
  }
};

export const getArticleByUser = async (userId: number, articleId: number) => {
  try {
    return await prisma.article.findUnique({
      where: {
        id: articleId,
        authorId: userId,
      },
    });
  } catch (error) {
    console.error("Error getting article:", error);
    return null;
  }
};

const newArticleValuesToFormData = async (
  data: z.infer<typeof newArticleSchema>,
) => {
  try {
    const formData = new FormData();
    const imageFile = data.image[0];

    formData.append("title", data.title);
    formData.append("body", data.body);
    formData.append("categoryName", data.categoryName);

    return formData;
  } catch (error) {
    console.error("Error converting new article to form data:", error);
    return null;
  }
};

const updateArticleValuesToFormData = async (
  article: z.infer<typeof existingArticleSchema>,
  // oldArticle: TArticle,
) => {
  try {
    const formData = new FormData();
    const imageFile = article.image;

    // If the image object doesn't have an ID, a new image has been chosen.
    if (!imageFile.id) {
      const canvas = await resizeImage(imageFile);
      if (canvas) {
        const blob = await convertCanvasToBlob(
          canvas,
          imageFile.type,
          imageFile.name,
        );
        if (blob) formData.append("image", blob);
      }
    }

    formData.append("title", article.title);
    formData.append("body", article.body);
    formData.append("categoryName", article.categoryName);

    return formData;
  } catch (error) {
    console.error("Error converting new article to form data:", error);
    return null;
  }
};

export const updateArticle = async (
  updatedArticle: z.infer<typeof existingArticleSchema>,
) => {
  try {
    const formData = await updateArticleValuesToFormData(updatedArticle);

    if (!formData) return null;

    const res = await prisma.article.update({
      where: {
        id: updatedArticle.id,
      },
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        content: formData.get("content") as string,
        categoryId: formData.get("categoryId") as unknown as number,
        authorId: formData.get("authorId") as unknown as number,
      },
    });

    return res;
  } catch (err) {
    console.error("Error creating article:", err);
    throw err;
  }
};

export const deleteArticle = async (articleId: number) => {
  try {
    const res = await prisma.article.delete({
      where: {
        id: articleId,
      },
    });

    return res;
  } catch (err) {
    console.error("Error deleting article:", err);
    return null;
  }
};

export const getFrontpageArticles = async () => {
  try {
    return await prisma.article.findMany({
      take: 15,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    });
  } catch (err) {
    console.log("Error getting other frontpage articles:", err);
    throw new Error("Failed to fetch frontpage articles");
  }
};

// export const getArticleById = async (articleId: number) => {
//   try {
//     const res = await serverFetch(`/articles/${articleId}`, {
//       method: "GET",
//     });

//     if (res.ok) return (await res.json()) as TArticle;

//     return null;
//   } catch (err) {
//     console.log("Error getting article by ID:", err);
//     throw new Error("Failed to fetch article by ID");
//   }
// };

// export const getArticlesByCategoryName = async (
//   category: string,
//   amount: number,
// ) => {
//   try {
//     const res = await serverFetch(`/articles/category/${category}/${amount}`, {
//       method: "GET",
//     });

//     if (res.ok) return (await res.json()) as TArticle[];

//     return null;
//   } catch (err) {
//     console.log("Error getting articles by category:", err);
//     throw new Error("Failed to fetch articles by category");
//   }
// };
