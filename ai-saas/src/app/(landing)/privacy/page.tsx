import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Lock, FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | AI Creator",
  description: "AI Creatorのプライバシーポリシーと個人情報の取り扱いについて",
};

const PrivacyPage = () => {
  const lastUpdated = "2024年1月1日";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <Badge variant="outline" className="inline-flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>プライバシーポリシー</span>
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              プライバシーポリシー
            </h1>
            <p className="text-xl text-muted-foreground">
              お客様の個人情報保護に関する取り組みについて
            </p>
            <p className="text-sm text-muted-foreground">
              最終更新日: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-screen-xl pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Basic Policy */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-primary" />
                <CardTitle>基本方針</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                AI Creator（以下「当サービス」）は、個人事業主として運営するAIツール提供サービスです。
                お客様の個人情報の保護は、当サービスの最も重要な責務の一つと認識し、
                個人情報保護法その他関連する法令を遵守して、適切に取り扱います。
              </p>
              <p className="text-muted-foreground">
                個人事業主として運営しているため、大企業とは異なる運営体制ですが、
                お客様の個人情報の保護について責任を持って取り組んでいます。
              </p>
            </CardContent>
          </Card>

          {/* Collection of Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Eye className="w-6 h-6 text-primary" />
                <CardTitle>収集する情報</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. アカウント情報</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>メールアドレス</li>
                  <li>ユーザー名（任意）</li>
                  <li>プロフィール画像（任意）</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">2. 利用情報</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>サービス利用履歴</li>
                  <li>生成したコンテンツのメタデータ</li>
                  <li>クレジット使用履歴</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">3. 技術的情報</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>IPアドレス</li>
                  <li>ブラウザ情報</li>
                  <li>アクセスログ</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Use of Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-primary" />
                <CardTitle>情報の利用目的</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. サービス提供</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>AIツールの提供・運営</li>
                  <li>ユーザーアカウントの管理</li>
                  <li>課金・決済処理</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">2. サービス改善</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>利用状況の分析</li>
                  <li>新機能の開発</li>
                  <li>パフォーマンスの最適化</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">3. サポート</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>お問い合わせ対応</li>
                  <li>技術サポート</li>
                  <li>トラブルシューティング</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Lock className="w-6 h-6 text-primary" />
                <CardTitle>データの安全性</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">セキュリティ対策</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>SSL/TLS暗号化による通信の保護</li>
                  <li>認証システム（Clerk）による安全なログイン</li>
                  <li>定期的なセキュリティアップデート</li>
                  <li>不正アクセス監視</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">データ保持</h3>
                <p className="text-muted-foreground">
                  アップロードされた画像は処理完了後、原則として削除されます。
                  ただし、サービス改善のために必要最小限のメタデータを保持する場合があります。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Third Party Services */}
          <Card>
            <CardHeader>
              <CardTitle>第三者サービス</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                当サービスでは、以下の第三者サービスを利用しています：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>Clerk</strong>: ユーザー認証</li>
                <li><strong>Stripe</strong>: 決済処理</li>
                <li><strong>Netlify</strong>: ホスティング</li>
                <li><strong>Google Analytics</strong>: アクセス解析（該当する場合）</li>
              </ul>
              <p className="text-muted-foreground">
                これらのサービスには、それぞれのプライバシーポリシーが適用されます。
              </p>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card>
            <CardHeader>
              <CardTitle>お客様の権利</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                お客様は以下の権利を有します：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>個人情報の開示請求</li>
                <li>個人情報の訂正・削除請求</li>
                <li>個人情報の利用停止請求</li>
                <li>アカウントの削除</li>
              </ul>
              <p className="text-muted-foreground">
                これらの権利行使をご希望の場合は、お問い合わせフォームよりご連絡ください。
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>お問い合わせ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                プライバシーポリシーに関するご質問やご要望がございましたら、
                お問い合わせページよりご連絡ください。
                個人事業主として運営しているため、回答にお時間をいただく場合がございますが、
                必ずご対応いたします。
              </p>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle>ポリシーの更新</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                本プライバシーポリシーは、法令の変更やサービスの改善に伴い、
                事前の通知なしに更新される場合があります。
                重要な変更については、サービス内またはメールにてお知らせいたします。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;