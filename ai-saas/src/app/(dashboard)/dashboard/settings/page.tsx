import PageContainer from "@/components/dashboard/page-container"
import PageHeader from "@/components/dashboard/page-header";
import ProfileSection from "@/components/dashboard/settings/profile-section";
import SubscriptionSettingsForm from "@/components/dashboard/settings/subscription-settings-form";
import { getUser } from "@/utils/utils";

const Setting = async () => {
    const result = await getUser(true);
    
    if ('error' in result) {
        if (result.status === 401) {
            return <div>ログインしてください。</div>;
        }
        throw new Error("ユーザが見つかりませんでした。");
    }

    const { user, dbUser } = result;

    if (!dbUser) {
        throw new Error("ユーザが見つかりませんでした。");
    }

    return (
        <PageContainer>
            <PageHeader
                title="設定"
                description="アカウントの確認とサブスクリプションの設定を管理します"
            />
            {/* Accout Info */}
            <div className="max-w-2xl">
                <ProfileSection
                    email={user.emailAddresses[0].emailAddress}
                    subscriptionStatus={dbUser.subscriptionStatus}
                    nextBillingDate={dbUser.subscriptions?.stripeCurrentPeriodEnd}
                />
            </div>
            {/* Form */}
            <div className="max-w-2xl">
                <SubscriptionSettingsForm user={dbUser} />
            </div>
        </PageContainer>
    )
  }
  
  export default Setting;