"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MessageCircle, Clock, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        toast.error(`サーバーエラーが発生しました (${response.status})`);
        return;
      }

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setFormData({
          name: "",
          email: "",
          subject: "",
          category: "",
          message: ""
        });
      } else {
        if (result.errors && Array.isArray(result.errors)) {
          const fieldErrors: Record<string, string> = {};
          result.errors.forEach((error: any) => {
            if (error.path && error.path.length > 0) {
              fieldErrors[error.path[0]] = error.message;
            }
          });
          setErrors(fieldErrors);
          toast.error("入力内容をご確認ください");
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error("送信中にエラーが発生しました。しばらく後でお試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <Badge variant="outline" className="inline-flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>お問い合わせ</span>
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              お問い合わせ
            </h1>
            <p className="text-xl text-muted-foreground">
              ご質問やご要望がございましたら、お気軽にお声がけください。
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-screen-xl pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <User className="w-6 h-6 text-primary" />
                    <CardTitle>個人事業主として運営</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    AI Creatorは個人事業主として運営しています。
                    一人ひとりのご要望に真摯に対応いたします。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-primary" />
                    <CardTitle>対応時間</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    平日・土日祝日問わず対応していますが、
                    個人事業主のため返信に1-3営業日いただく場合があります。
                    緊急性の高いお問い合わせは件名に【緊急】とご記載ください。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-6 h-6 text-primary" />
                    <CardTitle>お問い合わせの種類</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 技術的なサポート</li>
                    <li>• 機能の使い方</li>
                    <li>• 新機能のご要望</li>
                    <li>• 料金・プランについて</li>
                    <li>• 不具合の報告</li>
                    <li>• その他のご質問</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>お問い合わせフォーム</CardTitle>
                  <CardDescription>
                    以下のフォームにご記入の上、送信ボタンを押してください。
                    必ずご返信いたします。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">お名前 *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="山田太郎"
                          required
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">メールアドレス *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="example@email.com"
                          required
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">お問い合わせ種別 *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                          <SelectValue placeholder="お問い合わせの種類を選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">技術的なサポート</SelectItem>
                          <SelectItem value="usage">機能の使い方</SelectItem>
                          <SelectItem value="feature">新機能のご要望</SelectItem>
                          <SelectItem value="billing">料金・プランについて</SelectItem>
                          <SelectItem value="bug">不具合の報告</SelectItem>
                          <SelectItem value="other">その他</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-red-500">{errors.category}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">件名 *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="お問い合わせの件名"
                        required
                        className={errors.subject ? "border-red-500" : ""}
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-500">{errors.subject}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">メッセージ *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="お問い合わせの詳細をご記入ください。不具合の場合は、発生した状況や手順も含めてお教えください。"
                        className={`min-h-[120px] ${errors.message ? "border-red-500" : ""}`}
                        required
                      />
                      {errors.message && (
                        <p className="text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        * は必須項目です。個人情報の取り扱いについては、
                        プライバシーポリシーをご確認ください。
                      </p>
                      
                      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        <Mail className="w-4 h-4 mr-2" />
                        {isSubmitting ? "送信中..." : "送信する"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>よくあるご質問</CardTitle>
                  <CardDescription>
                    お問い合わせ前にこちらもご確認ください
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Q: 返信にはどのくらい時間がかかりますか？</h3>
                    <p className="text-muted-foreground">
                      A: 通常1-3営業日以内にご返信いたします。個人事業主として運営しているため、
                      お時間をいただく場合がございますが、必ずお返事いたします。
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Q: 機能の使い方がわからないのですが？</h3>
                    <p className="text-muted-foreground">
                      A: 各機能の使い方について詳しくサポートいたします。
                      具体的にどの機能でお困りかお教えください。
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Q: 新しい機能を追加してもらえますか？</h3>
                    <p className="text-muted-foreground">
                      A: ユーザーの皆様からのご要望は大変貴重です。
                      技術的に実現可能で多くの方に役立つ機能については、積極的に検討いたします。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;