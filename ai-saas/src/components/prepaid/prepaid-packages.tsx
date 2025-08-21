"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Crown, Sparkles, Star, Gem, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { prepaidPackages } from "@/config/prepaid";
import { useState } from "react";
import { toast } from "sonner";

const PrepaidPackages = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const packageIcons = {
    mini: Zap,
    starter: Sparkles,
    standard: Star,
    premium: Crown,
    deluxe: Gem,
    ultimate: Trophy,
  };

  const handlePurchase = async (packageId: string) => {
    setIsLoading(packageId);
    
    try {
      const response = await fetch('/api/prepaid/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packageId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '決済処理でエラーが発生しました');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('決済URLの取得に失敗しました');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error(error instanceof Error ? error.message : '購入処理でエラーが発生しました');
    } finally {
      setIsLoading(null);
    }
  };

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
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Badge variant="outline">プリペイドクレジット</Badge>
        <h2 className="text-3xl md:text-4xl font-bold">
          必要な分だけ
          <span className="text-primary block">クレジットを購入</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          使いたい時に必要な分だけ。お得なパッケージで前払いクレジットを購入できます。
        </p>
      </div>

      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {prepaidPackages.map((pkg, index) => {
          const IconComponent = packageIcons[pkg.id as keyof typeof packageIcons];
          const pricePerCredit = Math.round((pkg.price / pkg.credits) * 10) / 10;
          
          return (
            <motion.div key={pkg.id} variants={itemVariants}>
              <Card className={`relative h-full ${pkg.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      人気
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                    pkg.popular ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <IconComponent className={`w-8 h-8 ${pkg.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <CardDescription className="mt-2">{pkg.description}</CardDescription>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-3xl font-bold">¥{pkg.price.toLocaleString()}</span>
                    </div>
                    <div className="text-lg font-semibold text-primary">
                      {pkg.credits.toLocaleString()}クレジット
                    </div>
                    <div className="text-sm text-muted-foreground">
                      1クレジット約¥{pricePerCredit}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Button 
                    className="w-full" 
                    variant={pkg.popular ? "default" : "outline"}
                    size="lg"
                    disabled={isLoading === pkg.id || !pkg.priceId}
                    onClick={() => handlePurchase(pkg.id)}
                  >
                    {isLoading === pkg.id ? (
                      "処理中..."
                    ) : !pkg.priceId ? (
                      "準備中"
                    ) : (
                      "購入する"
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      • 即座にクレジット追加<br/>
                      • 有効期限なし<br/>
                      • 安全なStripe決済
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold">プリペイドクレジットについて</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-1">使用順序</h4>
            <p>サブスクリプションのクレジットを優先的に消費し、不足分をプリペイドクレジットから補填します。</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">有効期限</h4>
            <p>プリペイドクレジットに有効期限はありません。いつでもご利用いただけます。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrepaidPackages;