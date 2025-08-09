import { Crown, Rocket, Sparkle } from "lucide-react";

export const plans = [
    {
        name: "FREE",
        icon: Sparkle,
        price: "￥0",
        description: "個人利用に適切なエントリープラン",
        features: [
            "月30クレジット付与",
            "基本的な画像生成",
            "メールサポート"
        ],
        buttonText: "Starterプランを選択",
        priceId: "price_1RtsDS0wr7BuiSCuGWeNEpjw",
    },
    {
        name: "BASIC",
        icon: Rocket,
        price: "￥1,500",
        description: "プロフェッショナルな制作活動に",
        features: [
            "月300クレジット付与",
            "優先サポート",
            "商用利用可能",
            "メールサポート"
        ],
        popular: true,
        buttonText: "Proプランを選択",
        priceId: "price_1RtsAu0wr7BuiSCutWpYpLfd",
    },
    {
        name: "PRO",
        icon: Crown,
        price: "￥3,000",
        description: "ビジネス向けの完全なソリューション",
        features: [
            "月600クレジット付与",
            "24時間優先サポート",
            "メールサポート",
            "新機能先行利用可能",
        ],
        buttonText: "Enterpriceプランを選択",
        priceId: "price_1RtsBH0wr7BuiSCueYOEvMw9",
    },
];