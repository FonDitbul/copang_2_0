"use client";
import AccountLogin from "@/components/Account/login/login";
import AccountSettingPage from "@/components/Account/detail/detail.page";
import { getStorage } from "@/lib/clinet-storage";

export default function Account() {
  if (getStorage("accessToken")) {
    return <AccountSettingPage />;
  }

  return (
    <div>
      <AccountLogin />
    </div>
  );
}
