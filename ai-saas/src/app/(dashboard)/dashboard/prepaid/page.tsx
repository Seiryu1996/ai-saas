import { Metadata } from "next";
import PrepaidPackages from "@/components/prepaid/prepaid-packages";

export const metadata: Metadata = {
  title: "プリペイドクレジット購入 | AI Creator",
  description: "必要な分だけクレジットを購入できるプリペイドパッケージ",
};

const PrepaidPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-screen-xl">
        <PrepaidPackages />
      </div>
    </div>
  );
};

export default PrepaidPage;