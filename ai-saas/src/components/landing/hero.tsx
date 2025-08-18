"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Image, Layers, ImageDown, Armchair, Sparkles, Star, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      
      <div className="container mx-auto px-4 max-w-screen-xl relative">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="inline-flex items-center space-x-2 px-4 py-2">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Creative Suite</span>
            </Badge>
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            AIの力で
            <span className="text-primary block">クリエイティブを加速</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            画像生成、背景除去、圧縮、3Dモデル作成まで。
            <br className="hidden md:block" />
            あらゆるクリエイティブ作業をAIがサポートします。
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/sign-up" className="inline-flex items-center">
                無料で始める
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="#features">
                機能を見る
              </Link>
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div 
            className="flex items-center justify-center space-x-8 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>10,000+ ユーザー</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 fill-current" />
              <span>4.9/5 評価</span>
            </div>
          </motion.div>

          {/* Feature icons */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Image className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium">画像生成</span>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium">背景除去</span>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ImageDown className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium">画像圧縮</span>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Armchair className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium">3D生成</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;