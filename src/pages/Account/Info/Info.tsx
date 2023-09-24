import { useEffect, useState } from "react";
import Button from "../../../components/Common/Atom/Button";
import { dateToString, stringToDate } from "../../../utils/time";
import LogoutButton from "../../../components/Account/LogoutButton.Organ";
import { Buyer } from "../../../interface/Buyer";
import { Client, ResponseData } from "../../../context/api";
import NickNameChangeModal from "../../../components/Account/Info/NickNameChangeModal.Organ";
import EmailChangeModal from "../../../components/Account/Info/EmailChangeModal.Organ";
import PhoneNumberChangeModal from "../../../components/Account/Info/PhoneNumberChangeModal.Organ";
import { CreditCardEditButtonMole } from "../../../components/Account/CreditCard/CreditCardEditButton.Mole";
import { ClientStorage } from "../../../context/ClientStorage";
import { AddressEditButtonMole } from "../../../components/Account/Address/AddressEditButton.Mole";

export type BuyerAccountResponse = Omit<Buyer, "password" | "createdAt" | "updatedAt" | "deletedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export default function AccountInfoPage() {
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

  useEffect(() => {
    const getMyAccount = async () => {
      const accessToken = ClientStorage.getTokenByKey("accessToken");

      Client.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      });
      const response = await Client.get("/buyer");
      const responseData = response.data as ResponseData<BuyerAccountResponse>;
      const myAccount = responseData.content;

      const { id, userId, name, nickName, email, phoneNumber, createdAt, updatedAt } = myAccount;

      setAccount({
        id,
        userId,
        name,
        nickName,
        email,
        phoneNumber,
        createdAt: stringToDate(createdAt),
        updatedAt: stringToDate(updatedAt),
      });
    };
    getMyAccount();
  }, []);

  // change Modal
  const [isNickNameChangeModal, setIsNickNameChangeModal] = useState(false);
  const [isEmailChangeModal, setIsEmailChangeModal] = useState(false);
  const [isPhoneNumberChangeModal, setIsPhoneNumberChangeModal] = useState(false);

  return (
    <div>
      <div>이름</div>
      <div>{account.name}</div>

      <div>닉네임</div>
      <div>{account.nickName}</div>
      <Button onClick={(e) => setIsNickNameChangeModal(true)}> 닉네임 변경하기 </Button>

      <div>이메일</div>
      <div>{account.email}</div>
      <Button onClick={(e) => setIsEmailChangeModal(true)}> 이메일 변경하기 </Button>

      <div>핸드폰 번호</div>
      <div>{account.phoneNumber}</div>
      <Button onClick={(e) => setIsPhoneNumberChangeModal(true)}> 핸드폰 번호 변경하기 </Button>

      <div>생성일</div>
      <div>{dateToString(account.createdAt)}</div>

      <LogoutButton />
      {isNickNameChangeModal && <NickNameChangeModal onClose={setIsNickNameChangeModal} />}
      {isEmailChangeModal && <EmailChangeModal onClose={setIsEmailChangeModal} />}
      {isPhoneNumberChangeModal && <PhoneNumberChangeModal onClose={setIsPhoneNumberChangeModal} />}

      <CreditCardEditButtonMole />
      <AddressEditButtonMole />
    </div>
  );
}
