import { NavItem } from "@/types/nav";
import { Armchair, Image, ImageDown, Layers, LayoutDashboard, Settings } from "lucide-react";


export const navItems: NavItem[] = [
    {
        title: "ダッシュボード",
        href: "/dashboard",
        icon : LayoutDashboard,
    },
    {
        title: "画像生成",
        href: "/dashboard/tools/image-generator",
        icon : Image,
    },
    {
        title: "背景削除",
        href: "/dashboard/tools/remove-bg",
        icon : Layers,
    },
    {
        title: "画像圧縮",
        href: "/dashboard/tools/optimize",
        icon : ImageDown,
    },
    {
        title: "3Dモデリング",
        href: "/dashboard/tools/3d-model-generator",
        icon : Armchair
    },
    {
        title: "設定",
        href: "/dashboard/settings",
        icon : Settings,
    },
];