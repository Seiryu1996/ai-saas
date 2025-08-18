import { Button } from "@/components/ui/button";
import { Sparkles, Twitter, Github, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 max-w-screen-xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">AI Creator</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              AIの力でクリエイティブワークを革新。画像生成から3Dモデル作成まで、
              あらゆるクリエイティブニーズにお応えします。
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="mailto:contact@aicreator.com">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">サービス</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard/tools/image-generator" className="hover:text-primary transition-colors">
                  画像生成
                </Link>
              </li>
              <li>
                <Link href="/dashboard/tools/remove-bg" className="hover:text-primary transition-colors">
                  背景除去
                </Link>
              </li>
              <li>
                <Link href="/dashboard/tools/optimize" className="hover:text-primary transition-colors">
                  画像圧縮
                </Link>
              </li>
              <li>
                <Link href="/dashboard/tools/3d-model-generator" className="hover:text-primary transition-colors">
                  3Dモデル生成
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">会社情報</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  会社概要
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <a 
                  href="https://status.aicreator.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  ステータスページ
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AI Creator. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              プライバシー
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              利用規約
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              サポート
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;