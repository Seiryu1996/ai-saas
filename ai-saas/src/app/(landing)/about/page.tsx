import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sparkles, User, Target, Heart } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "運営者情報 | AI Creator",
  description: "AI Creatorの事業内容と運営者について",
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <Badge variant="outline" className="inline-flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>運営者情報</span>
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              AI Creatorについて
            </h1>
            <p className="text-xl text-muted-foreground">
              個人事業主として、AIテクノロジーでクリエイティブな価値を提供します。
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-screen-xl pb-20">
        {/* Mission */}
        <section className="mb-16">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">ミッション</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                AIの力を使って、誰もが簡単にプロフェッショナルなクリエイティブワークができる世界を目指しています。
                技術的な知識がなくても、アイデアを形にできるツールを提供することで、
                創造性の民主化を実現したいと考えています。
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Operator Info */}
        <section className="mb-16">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">運営者について</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">事業形態</h3>
                  <p className="text-muted-foreground">
                    個人事業主として運営しています。小回りの利いたサービス提供と、
                    ユーザー一人ひとりに寄り添ったサポートを心がけています。
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">専門分野</h3>
                  <p className="text-muted-foreground">
                    AI・機械学習技術、Web開発、UX/UIデザインの知識を活かし、
                    使いやすく実用的なAIツールの開発に取り組んでいます。
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-3">サービスへの想い</h3>
                <p className="text-muted-foreground">
                  大企業ではできない、個人ならではの柔軟性とスピード感を活かして、
                  本当に必要とされる機能を迅速に提供したいと考えています。
                  ユーザーの声に直接耳を傾け、継続的な改善を行っています。
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">大切にしていること</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              サービス提供において常に心がけている価値観です。
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">ユーザーファースト</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  ユーザーの声を最優先に、本当に使いやすいサービスを目指しています。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">継続的改善</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  技術の進歩に合わせて、常にサービスの品質向上に取り組んでいます。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">透明性</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  料金体系やサービス内容について、わかりやすく正直にお伝えします。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">お問い合わせ</CardTitle>
              <CardDescription>
                ご質問やご要望がございましたら、お気軽にお声がけください。
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                サービスに関するご質問、機能のご要望、技術的なサポートなど、
                どのようなことでもお気軽にお問い合わせください。
              </p>
              <p className="text-sm text-muted-foreground">
                個人事業主のため、返信にお時間をいただく場合がございますが、
                必ずお返事いたします。
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;