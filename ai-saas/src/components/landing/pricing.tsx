"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { CheckCircle, Zap, Crown, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { PLANS } from "@/config/plans";

const Pricing = () => {
  const plans = [
    {
      name: "FREE",
      displayName: "フリープラン",
      price: "¥0",
      period: "/月",
      description: "個人利用や試用に最適",
      icon: Zap,
      badge: null,
      features: [
        "5クレジット/月",
        "画像生成 (基本)",
        "背景除去 (基本)",
        "画像圧縮",
        "コミュニティサポート"
      ],
      buttonText: "無料で始める",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "BASIC",
      displayName: "ベーシックプラン",
      price: "¥980",
      period: "/月",
      description: "継続的な利用におすすめ",
      icon: Crown,
      badge: "人気",
      features: [
        "50クレジット/月",
        "画像生成 (高品質)",
        "背景除去 (高精度)",
        "画像圧縮・最適化",
        "3Dモデル生成 (基本)",
        "優先サポート",
        "API アクセス"
      ],
      buttonText: "ベーシックを選ぶ",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "PRO",
      displayName: "プロプラン",
      price: "¥2,980",
      period: "/月",
      description: "プロフェッショナル向け",
      icon: Rocket,
      badge: "最高品質",
      features: [
        "200クレジット/月",
        "画像生成 (プレミアム)",
        "背景除去 (AI精度)",
        "画像圧縮・最適化",
        "3Dモデル生成 (高品質)",
        "バッチ処理",
        "専用サポート",
        "API アクセス",
        "商用利用可能"
      ],
      buttonText: "プロを選ぶ",
      buttonVariant: "default" as const,
      popular: false
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
    <section id="pricing" className="py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Section Header */}
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline">料金プラン</Badge>
          <h2 className="text-3xl md:text-5xl font-bold">
            シンプルで
            <span className="text-primary block">透明性のある料金</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            必要な分だけお支払い。いつでもプランの変更やキャンセルが可能です。
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`relative h-full ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                    plan.popular ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{plan.displayName}</CardTitle>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <SignUpButton
                    mode="modal"
                    fallbackRedirectUrl={"/dashboard"}
                    forceRedirectUrl={"/dashboard"}
                  >
                    <Button 
                      className="w-full" 
                      variant={plan.buttonVariant}
                      size="lg"
                    >
                      {plan.buttonText}
                    </Button>
                  </SignUpButton>

                  <div className="space-y-3">
                    <h4 className="font-semibold">含まれる機能:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          className="mt-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">よくある質問</h3>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">クレジットとは何ですか？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  クレジットは各機能を利用するための単位です。画像生成は5クレジット、背景除去は2クレジットなど、機能によって消費量が異なります。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">プランはいつでも変更できますか？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  はい、いつでもプランの変更やキャンセルが可能です。アップグレードは即座に反映され、ダウングレードは次回請求期間から適用されます。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">無料トライアルはありますか？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  フリープランで全機能をお試しいただけます。クレジットカードの登録は不要です。有料プランも7日間の返金保証付きです。
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;