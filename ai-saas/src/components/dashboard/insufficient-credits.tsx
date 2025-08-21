"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Plus, CreditCard } from "lucide-react";
import Link from "next/link";

interface InsufficientCreditsProps {
  requiredCredits: number;
  currentCredits: number;
}

const InsufficientCredits = ({ requiredCredits, currentCredits }: InsufficientCreditsProps) => {
  const neededCredits = requiredCredits - currentCredits;

  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-destructive">
          <AlertTriangle className="w-5 h-5" />
          <span>クレジットが不足しています</span>
        </CardTitle>
        <CardDescription>
          この機能を使用するには{requiredCredits}クレジットが必要ですが、
          現在{currentCredits}クレジットしかありません。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">不足分:</span>
            <span className="text-lg font-bold text-destructive">
              {neededCredits}クレジット
            </span>
          </div>
        </div>

        <div className="grid gap-3">
          <Link href="/dashboard/prepaid" className="w-full">
            <Button className="w-full" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              プリペイドクレジット購入
            </Button>
          </Link>
          
          <Link href="/dashboard/plan" className="w-full">
            <Button variant="outline" className="w-full" size="lg">
              <CreditCard className="w-4 h-4 mr-2" />
              サブスクリプションプラン
            </Button>
          </Link>
        </div>

        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
          <p className="font-medium mb-1">💡 お得な選択</p>
          <p>
            継続利用なら<strong>サブスクリプション</strong>、
            今回だけなら<strong>プリペイド</strong>がおすすめです。
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsufficientCredits;