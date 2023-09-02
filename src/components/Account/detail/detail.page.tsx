"use client";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/Account/detail/logout.button";
import { useEffect, useState } from "react";
// import { AuthApi } from "@/lib/Auth.api";
import { authApi, BuyerAccount } from "@/lib/api/Auth.api";
import { getStorage } from "@/lib/clinet-storage";
import { serverUrl } from "@/lib/api/api";
import { Buyer } from "@/interface/Buyer";
import {dateToString, stringToDate} from "@/util/time";

export default function AccountDetailPage() {
  const [account, setAccount] = useState({
    id: 0,
    userId: "",
    name: "",
    nickName: "",
    email: "",
    phoneNumber: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const router = useRouter();

  useEffect(() => {
    const getMyAccount = async () => {
      const accessToken = getStorage("accessToken");
      if (!accessToken) {
        return alert("재 로그인 바랍니다.");
      }
      const myAccount = await authApi<BuyerAccount>(
        accessToken,
        `http://${serverUrl}/buyer`,
      );

      const {
        id,
        userId,
        name,
        nickName,
        email,
        phoneNumber,
        createdAt,
        updatedAt,
      } = myAccount.content;

      setAccount({
        id,
        userId,
        name,
        nickName,
        email,
        phoneNumber,
        createdAt: stringToDate(createdAt),
        updatedAt: stringToDate(updatedAt)
      });
    };
    getMyAccount();
  }, []);

  return (
    <div>
      <div>이름</div>
      <div>{account.name}</div>
      <div>닉네임</div>
      <div>{account.nickName}</div>
      <div>이메일</div>
      <div>{account.email}</div>
      <div>핸드폰 번호</div>
      <div>{account.phoneNumber}</div>

      <LogoutButton />
    </div>
  );
}
