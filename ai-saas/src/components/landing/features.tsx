"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { Image, Layers, ImageDown, Armchair, Zap, Clock, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: Image,
      title: "AI画像生成",
      description: "テキストから高品質な画像を生成。プロフェッショナルなイラスト、写真、アートワークまで幅広く対応。",
      badge: "人気",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Layers,
      title: "背景除去",
      description: "ワンクリックで背景を自動除去。人物、商品、オブジェクトを綺麗に切り抜き。",
      badge: "高精度",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: ImageDown,
      title: "画像圧縮・最適化",
      description: "品質を保ちながらファイルサイズを大幅削減。Web用、印刷用に最適化。",
      badge: "高速",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      icon: Armchair,
      title: "3Dモデル生成",
      description: "テキストや画像から3Dモデルを自動生成。プロトタイプ作成やデザインに活用。",
      badge: "NEW",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "高速処理",
      description: "最新のAI技術により、数秒で高品質な結果を提供"
    },
    {
      icon: Clock,
      title: "24/7利用可能",
      description: "いつでもどこでも、必要な時にすぐ利用可能"
    },
    {
      icon: Shield,
      title: "セキュア",
      description: "アップロードされたデータは暗号化され安全に処理"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Section Header */}
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="inline-flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>主要機能</span>
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold">
            クリエイティブワークを
            <span className="text-primary block">革新するAI機能</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            プロフェッショナルなクリエイティブツールを、
            シンプルで直感的なインターフェースで提供します。
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <Badge variant="secondary">{feature.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              className="text-center space-y-4"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center pt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SignUpButton
            mode="modal"
            fallbackRedirectUrl={"/dashboard"}
            forceRedirectUrl={"/dashboard"}
          >
            <Button size="lg">今すぐ無料で試す</Button>
          </SignUpButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;