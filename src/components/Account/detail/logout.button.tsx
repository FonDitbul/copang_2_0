'use client'
import Button from "@/components/Common/atom/Button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logoutOnClick = () => {
    localStorage.clear();
    return router.push("/");
  };

  return (
    <div>
      <Button onClick={logoutOnClick}>로그아웃 버튼</Button>
    </div>
  );
}
