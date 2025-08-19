"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton, SignInButton } from "@clerk/nextjs";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-20 md:py-32 bg-primary/5">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <motion.div 
          className="text-center space-y-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              今すぐ始めて、
              <span className="text-primary block">創造性を解放しよう</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              5分でアカウント作成完了。即座に5クレジットをプレゼント。
              <br className="hidden md:block" />
              クレジットカード登録は不要です。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SignUpButton
              mode="modal"
              fallbackRedirectUrl={"/dashboard"}
              forceRedirectUrl={"/dashboard"}
            >
              <Button size="lg" className="w-full sm:w-auto inline-flex items-center">
                <Sparkles className="mr-2 w-5 h-5" />
                無料でアカウント作成
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </SignUpButton>
            <SignInButton
              mode="modal"
              fallbackRedirectUrl={"/dashboard"}
              forceRedirectUrl={"/dashboard"}
            >
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                既にアカウントをお持ちの方
              </Button>
            </SignInButton>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center space-x-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>クレジットカード不要</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>即座に利用開始</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>いつでもキャンセル可能</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;