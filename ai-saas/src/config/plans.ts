import { Crown, Rocket, Sparkle } from "lucide-react";

export const PLANS = {
    FREE: {
        NAME: "FREE",
        CREDIT: 30,
        PRICE_ID: "price_1RtsDS0wr7BuiSCuGWeNEpjw",
    },
    BASIC: {
        NAME: "BASIC",
        CREDIT: 300,
        PRICE_ID: "price_1RtsAu0wr7BuiSCutWpYpLfd",
    },
    PRO: {
        NAME: "PRO",
        CREDIT: 600,
        PRICE_ID: "price_1RtsBH0wr7BuiSCueYOEvMw9",
    },
}

export const plans = [
    {
        name: PLANS.FREE.NAME,
        icon: Sparkle,
        price: "￥0",
        description: "お試しで利用できるプラン",
        features: [
            `月${PLANS.FREE.CREDIT}クレジット付与`,
            "基本的な画像生成",
            "メールサポート"
        ],
        buttonText: `${PLANS.FREE.NAME}プランを選択`,
        priceId: PLANS.FREE.PRICE_ID,
    },
    {
        name: PLANS.BASIC.NAME,
        icon: Rocket,
        price: "￥1,500",
        description: "個人利用に適切なエントリープラン",
        features: [
            `月${PLANS.BASIC.CREDIT}クレジット付与`,
            "優先サポート",
            "商用利用可能",
            "メールサポート"
        ],
        popular: true,
        buttonText: `${PLANS.BASIC.NAME}プランを選択`,
        priceId: PLANS.BASIC.PRICE_ID,
    },
    {
        name: PLANS.PRO.NAME,
        icon: Crown,
        price: "￥3,000",
        description: "プロフェッショナルな制作活動に",
        features: [
            `月${PLANS.PRO.CREDIT}クレジット付与`,
            "24時間優先サポート",
            "メールサポート",
            "新機能先行利用可能",
        ],
        buttonText: `${PLANS.PRO.NAME}プランを選択`,
        priceId: PLANS.PRO.PRICE_ID,
    },
];