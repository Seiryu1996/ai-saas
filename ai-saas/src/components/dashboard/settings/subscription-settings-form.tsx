"use client";

import { Button } from "@/components/ui/button";
import { PLANS } from "@/config/plans";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface SettingsFormProps {
  user: User;
}

const SubscriptionSettingsForm = ({ user }: SettingsFormProps) => {
  const router = useRouter();
  const handleManageSubscription = async () => {
    try {
      const response = await fetch("/api/create-portal-session", {
        method: "POST"
      });

      const data = await response.json();
      router.push(data.url);
    } catch (error) {
      console.error("Error:", error);
    }
  };  
  
  return (
      <div className="grid gap-4 p-4 border-2 rounded-lg">
        <div className="grid gap-2">
          {user?.subscriptionStatus !== PLANS.FREE.NAME ? (
            <>
              <p className="text-sm text-muted-goreground">
                現在のサブスクリプションを管理します
              </p>
              <Button onClick={handleManageSubscription}>
                サブスクリプション管理
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-goreground">
                有料プランから変更された場合は、購入されたクレジットをそのまま利用可能です
              </p>
            </>
          )}
        </div>
      </div>
    )
}

export default SubscriptionSettingsForm;