"use client";

import { navItems } from "@/config/nav";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import AuthButton from "../auth/auth-button";

const DashboardNav = () => {
    const pathName = usePathname();

    return <nav className="grid gap-2 items-start">
        {navItems.map((item) => (
            <Button
                key={item.href}
                variant={pathName === item.href ? "secondary" : "ghost"}
                className={
                    cn("justify-start", pathName === item.href && "bg-accent")
                }
                asChild
            >
                <Link href={item.href}>
                    {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                    {item.title}
                </Link>
            </Button>
        ))}

        <div className="my-4 px-4 md:hidden">
            <AuthButton />
        </div>
    </nav>;
};

export default DashboardNav;