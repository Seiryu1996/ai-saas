"use client"

import { navItems } from "@/config/nav"
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NavItems = () => {
    const pathName = usePathname();
    return (
        <>
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
        </>
    );
}

export default NavItems;