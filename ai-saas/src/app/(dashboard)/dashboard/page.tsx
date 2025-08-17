import PageContainer from "@/components/dashboard/page-container";
import PageHeader from "@/components/dashboard/page-header";
import { getUser } from "@/utils/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import { PLANS } from "@/config/plans";
import { getUserCredits } from "@/lib/db/services/credits";

const DashboardPage = async () => {
  const result = await getUser(true);
  
  if ('error' in result) {
    if (result.status === 401) {
      return <div>ログインしてください。</div>;
    }
    throw new Error("ユーザが見つかりませんでした。");
  }

  const { user, dbUser } = result;
  const credits = await getUserCredits();

  return (
    <PageContainer>
      <PageHeader
        title={`こんにちは、${user.firstName || 'ユーザー'}さん！`}
        description="ダッシュボードでアカウントの概要を確認できます"
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              残りクレジット
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{credits}</div>
            <p className="text-xs text-muted-foreground">
              利用可能なクレジット
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              プランステータス
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge variant={dbUser.subscriptionStatus === PLANS.FREE.NAME ? "secondary" : "default"}>
                {dbUser.subscriptionStatus}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              現在のプラン
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Quick Actions & Activities */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>クイックアクション</CardTitle>
            <CardDescription>
              よく使う機能にすぐアクセス
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {dbUser.subscriptionStatus === PLANS.FREE.NAME && (
              <Button asChild className="w-full" variant="default">
                <Link href="/dashboard/plan">
                  <Zap className="mr-2 h-4 w-4" />
                  プランをアップグレード
                </Link>
              </Button>
            )}
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/settings">
                <CreditCard className="mr-2 h-4 w-4" />
                設定を管理
              </Link>
            </Button>
          </CardContent>
        </Card>

      </div>

    </PageContainer>
  );
};

export default DashboardPage;