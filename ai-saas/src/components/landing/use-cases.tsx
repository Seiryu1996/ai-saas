"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Target, Share2, Store, Film, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const UseCases = () => {
  const useCases = [
    {
      icon: Palette,
      title: "デザイナー・クリエイター",
      description: "コンセプトアート、イラスト、ロゴデザインの制作時間を大幅短縮",
      examples: ["コンセプトアート生成", "ロゴバリエーション作成", "テクスチャ素材生成"],
      color: "text-pink-500",
      bgColor: "bg-pink-500/10"
    },
    {
      icon: Target,
      title: "マーケター",
      description: "広告素材、バナー、SNS投稿用画像を効率的に制作",
      examples: ["広告バナー作成", "商品画像加工", "キャンペーン素材制作"],
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Share2,
      title: "SNS運用者",
      description: "魅力的な投稿画像やストーリー素材を継続的に生成",
      examples: ["投稿画像作成", "ストーリー素材", "プロフィール画像加工"],
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Store,
      title: "EC事業者",
      description: "商品画像の背景除去や加工で、売上向上をサポート",
      examples: ["商品画像加工", "背景統一", "サムネイル生成"],
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      icon: Film,
      title: "動画クリエイター",
      description: "サムネイル、タイトル画像、エフェクト素材を簡単作成",
      examples: ["動画サムネイル", "タイトル画像", "エフェクト素材"],
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Briefcase,
      title: "企業・個人事業主",
      description: "プレゼン資料、提案書、営業資料の視覚的要素を強化",
      examples: ["プレゼン画像", "図表・チャート", "企業ロゴ"],
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10"
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
    <section id="use-cases" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Section Header */}
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline">活用事例</Badge>
          <h2 className="text-3xl md:text-5xl font-bold">
            あらゆる業界で
            <span className="text-primary block">活用されています</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            デザイナーからマーケター、個人クリエイターまで、
            幅広い業界のプロフェッショナルが活用しています。
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {useCases.map((useCase, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${useCase.bgColor} flex items-center justify-center mb-4`}>
                    <useCase.icon className={`w-6 h-6 ${useCase.color}`} />
                  </div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  <CardDescription>{useCase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground">主な活用例:</h4>
                    <ul className="space-y-1">
                      {useCase.examples.map((example, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="text-3xl font-bold text-primary">10,000+</div>
            <div className="text-sm text-muted-foreground">アクティブユーザー</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">1M+</div>
            <div className="text-sm text-muted-foreground">生成された画像</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">95%</div>
            <div className="text-sm text-muted-foreground">顧客満足度</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">対応言語</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;