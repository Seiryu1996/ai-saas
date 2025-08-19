import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertCircle, CreditCard, Shield } from "lucide-react";
import { PLANS, plans } from "@/config/plans";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | AI Creator",
  description: "AI Creatorの利用規約とサービス利用条件について",
};

const TermsPage = () => {
  const lastUpdated = "2025年9月1日";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <Badge variant="outline" className="inline-flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>利用規約</span>
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              利用規約
            </h1>
            <p className="text-xl text-muted-foreground">
              AI Creatorサービスの利用条件について
            </p>
            <p className="text-sm text-muted-foreground">
              最終更新日: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-screen-xl pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Service Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-primary" />
                <CardTitle>第1条 サービス概要</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                AI Creator（以下「当サービス」）は、個人事業主が運営するAI技術を活用した
                クリエイティブツール提供サービスです。画像生成、背景除去、画像圧縮、
                3Dモデル生成などの機能を提供します。
              </p>
              <p className="text-muted-foreground">
                本規約は、当サービスを利用するすべてのお客様に適用されます。
                当サービスをご利用いただく前に、必ず本規約をお読みください。
              </p>
            </CardContent>
          </Card>

          {/* User Obligations */}
          <Card>
            <CardHeader>
              <CardTitle>第2条 ユーザーの義務</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">2-1. 禁止事項</h3>
                <p className="text-muted-foreground mb-2">ユーザーは以下の行為を行ってはなりません：</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>法令に違反する行為</li>
                  <li>他人の知的財産権を侵害する行為</li>
                  <li>他人のプライバシーを侵害する行為</li>
                  <li>アダルトコンテンツや暴力的なコンテンツの生成</li>
                  <li>差別的、誹謗中傷的なコンテンツの生成</li>
                  <li>システムに過度な負荷をかける行為</li>
                  <li>サービスの運営を妨害する行為</li>
                  <li>他人になりすます行為</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">2-2. アカウント管理</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>ログイン情報は適切に管理してください</li>
                  <li>アカウントの第三者への譲渡は禁止されています</li>
                  <li>不正利用を発見した場合は速やかにご報告ください</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-primary" />
                <CardTitle>第3条 料金・支払い</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">3-1. 料金体系</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {plans.map((plan) => (
                    <li key={plan.name}>
                      {plan.name === PLANS.FREE.NAME ? 'フリー' : plan.name === PLANS.BASIC.NAME ? 'ベーシック' : 'プロ'}プラン: 
                      月{plan.name === PLANS.FREE.NAME ? PLANS.FREE.CREDIT : plan.name === PLANS.BASIC.NAME ? PLANS.BASIC.CREDIT : PLANS.PRO.CREDIT}クレジット
                      （{plan.price}{plan.name === PLANS.FREE.NAME ? '' : '/月'}）
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">3-2. 支払い条件</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>有料プランの料金は月額制で、毎月自動課金されます</li>
                  <li>支払いはStripeを通じて処理されます</li>
                  <li>返金は原則として行いませんが、サービスに重大な不具合があった場合は個別に対応いたします</li>
                  <li>料金の変更は30日前に通知いたします</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">3-3. プラン変更・解約</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>プランの変更はいつでも可能です</li>
                  <li>アップグレードは即座に反映されます</li>
                  <li>ダウングレードは次回請求期間から適用されます</li>
                  <li>解約はいつでも可能で、次回請求期間から適用されます</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>第4条 知的財産権</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">4-1. 生成コンテンツの権利</h3>
                <p className="text-muted-foreground">
                  ユーザーが当サービスを利用して生成したコンテンツの権利は、
                  原則としてユーザーに帰属します。ただし、以下の点にご注意ください：
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>第三者の権利を侵害するコンテンツの生成は禁止されています</li>
                  <li>AI学習データに含まれる元素材の権利は考慮されません</li>
                  <li>商用利用については各プランの条件をご確認ください</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">4-2. サービスの権利</h3>
                <p className="text-muted-foreground">
                  当サービスのシステム、デザイン、コンテンツに関する知的財産権は
                  当サービス運営者に帰属します。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Liability */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-primary" />
                <CardTitle>第5条 免責事項</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">5-1. サービスの提供</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>当サービスは「現状有姿」で提供されます</li>
                  <li>サービスの完全性、正確性、可用性を保証するものではありません</li>
                  <li>個人事業主として運営しているため、メンテナンス等で一時的にサービスが利用できない場合があります</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">5-2. 損害の責任</h3>
                <p className="text-muted-foreground">
                  当サービスの利用または利用不能により生じた損害について、
                  運営者は責任を負いません。ただし、運営者の故意または重大な過失による場合は除きます。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Service Suspension */}
          <Card>
            <CardHeader>
              <CardTitle>第6条 サービス停止・アカウント削除</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">6-1. サービス停止</h3>
                <p className="text-muted-foreground mb-2">以下の場合、サービスを一時停止することがあります：</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>システムメンテナンス</li>
                  <li>緊急的なセキュリティ対応</li>
                  <li>天災等の不可抗力</li>
                  <li>その他、運営上必要と判断される場合</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">6-2. アカウント削除</h3>
                <p className="text-muted-foreground mb-2">以下の場合、アカウントを削除することがあります：</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>本規約に違反した場合</li>
                  <li>長期間の利用停止</li>
                  <li>その他、運営に支障をきたす行為があった場合</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-primary" />
                <CardTitle>第7条 プライバシー・データ取扱い</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                個人情報の取扱いについては、別途「プライバシーポリシー」に定めるところによります。
              </p>
              <div>
                <h3 className="font-semibold mb-2">7-1. データの保管</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>アップロードされた画像は処理完了後、原則として削除されます</li>
                  <li>生成されたコンテンツは一時的に保管される場合があります</li>
                  <li>アカウント削除時は関連するデータも削除されます</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>第8条 規約の変更</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                本規約は、法令の変更やサービスの改善に伴い、事前の通知なしに変更される場合があります。
                重要な変更については、サービス内またはメールにてお知らせいたします。
                変更後の規約は、サイト上に掲載した時点で効力を生じます。
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle>第9条 準拠法・管轄</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                本規約は日本法に準拠し、解釈されるものとします。
                当サービスに関する紛争については、運営者の住所地を管轄する裁判所を
                専属的合意管轄裁判所とします。
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>第10条 お問い合わせ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                本規約に関するご質問やサービスについてのお問い合わせは、
                お問い合わせページよりご連絡ください。
                個人事業主として運営しているため、回答にお時間をいただく場合がございますが、
                必ずご対応いたします。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;