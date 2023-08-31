"use client";
import AccountLogin from "@/components/Account/login/login";

export default function Account() {
  if (localStorage.getItem("accessToken")) {
    return <div>로그인 정보 페이지</div>;
  }

  return (
    <div>
      <AccountLogin />
    </div>
  );
}
