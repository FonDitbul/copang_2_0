"use client";
import Button from "@/components/Common/atom/Button";
import { useRouter } from "next/navigation";
import { clearStorage } from "@/lib/clinet-storage";

export default function LogoutButton() {
  const router = useRouter();

  const logoutOnClick = () => {
    clearStorage();
    return router.push("/");
  };

  return <Button onClick={logoutOnClick}>로그아웃 버튼</Button>;
}
