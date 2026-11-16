import PortfolioHome from "@/components/sections/PortfolioHome";
import { getAllContent } from "@/lib/content";

export default function HomePage() {
  const content = getAllContent();
  return <PortfolioHome content={content} />;
}
