import { getFrontpageArticles } from "@/services/articles";

import { LoadingScreen } from "@/components/ui/loading";
import { FeaturedSection } from "@/components/sections/featured/FeaturedSection";
import { CategoryPreviewSection } from "@/components/sections/category-preview/CategoryPreviewSection";
import { Welcome } from "@/components/sections/Welcome";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/footer/Footer";

export default async function Home() {
  const articles = await getFrontpageArticles();

  if (!articles) return <LoadingScreen />;

  console.log(articles);

  return (
    <>
      <main className="mx-auto flex w-full max-w-siteWidth flex-col gap-4 p-4">
        <Welcome />
        <FeaturedSection
          featured={articles.slice(0, 1)}
          articles={articles.slice(1, 4)}
        />
        <CategoryPreviewSection
          sectionTitle="News"
          route="/news"
          articles={articles.filter(
            (article) => article.category.name === "news",
          )}
        />
        <CategoryPreviewSection
          sectionTitle="Reviews"
          route="/reviews"
          articles={articles.filter(
            (article) => article.category.name === "review",
          )}
        />
        <CategoryPreviewSection
          sectionTitle="Tech"
          route="/tech"
          articles={articles.filter(
            (article) => article.category.name === "tech",
          )}
        />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
