"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, CreditCard, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CreditInfo {
  subscriptionCredits: number;
  prepaidCredits: number;
  totalCredits: number;
  subscriptionStatus: string;
}

const CreditBalance = () => {
  const [credits, setCredits] = useState<CreditInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    try {
      const response = await fetch('/api/user/credits');
      if (response.ok) {
        const data = await response.json();
        setCredits(data);
      }
    } catch (error) {
      console.error('Failed to fetch credits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>クレジット残高</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-8 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!credits) {
    return null;
  }

  const getSubscriptionStatusColor = (status: string) => {
    switch (status) {
      case 'PRO':
        return 'bg-purple-500';
      case 'BASIC':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getSubscriptionStatusText = (status: string) => {
    switch (status) {
      case 'PRO':
        return 'プロプラン';
      case 'BASIC':
        return 'ベーシックプラン';
      default:
        return 'フリープラン';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>クレジット残高</span>
          </div>
          <Badge className={getSubscriptionStatusColor(credits.subscriptionStatus)}>
            {getSubscriptionStatusText(credits.subscriptionStatus)}
          </Badge>
        </CardTitle>
        <CardDescription>
          利用可能なクレジット数と内訳
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 合計クレジット */}
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-primary">
            {credits.totalCredits.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            合計利用可能クレジット
          </div>
        </div>

        {/* クレジット内訳 */}
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium">サブスクリプション</span>
            </div>
            <span className="font-bold">{credits.subscriptionCredits.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">プリペイド</span>
            </div>
            <span className="font-bold">{credits.prepaidCredits.toLocaleString()}</span>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="space-y-2">
          <Link href="/dashboard/prepaid" className="w-full">
            <Button className="w-full" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              プリペイドクレジット購入
            </Button>
          </Link>
          
          {credits.subscriptionStatus === 'FREE' && (
            <Link href="/dashboard/billing" className="w-full">
              <Button className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                サブスクリプション契約
              </Button>
            </Link>
          )}
        </div>

        {/* 使用順序の説明 */}
        <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
          <p className="font-medium mb-1">クレジット使用順序</p>
          <p>サブスクリプションのクレジットを優先的に消費し、不足分をプリペイドクレジットから補填します。</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditBalance;