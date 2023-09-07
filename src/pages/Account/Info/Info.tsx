// import { useEffect, useState } from "react";
// import { dateToString, stringToDate } from "../../util/time";
// import Button from "../../components/Common/atom/Button";
// import LogoutButton from "../../components/Account/detail/logout.button";
//
// export default function AccountInfoPage() {
//   const [account, setAccount] = useState({
//     id: 0,
//     userId: "",
//     name: "",
//     nickName: "",
//     email: "",
//     phoneNumber: "",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   });
//   const router = useRouter();
//
//   useEffect(() => {
//     const getMyAccount = async () => {
//       const accessToken = getStorage("accessToken");
//       if (!accessToken) {
//         return alert("재 로그인 바랍니다.");
//       }
//       const myAccount = await authApi<BuyerAccount>(accessToken, `http://${serverUrl}/buyer`);
//
//       const { id, userId, name, nickName, email, phoneNumber, createdAt, updatedAt } = myAccount.content;
//
//       setAccount({
//         id,
//         userId,
//         name,
//         nickName,
//         email,
//         phoneNumber,
//         createdAt: stringToDate(createdAt),
//         updatedAt: stringToDate(updatedAt),
//       });
//     };
//     getMyAccount();
//   }, []);
//
//   // TODO Design 변경
//   return (
//     <div>
//       <div>이름</div>
//       <div>{account.name}</div>
//       <div>닉네임</div>
//       <div>{account.nickName}</div>
//       <Button> 닉네임 변경하기 </Button>
//       <div>이메일</div>
//       <div>{account.email}</div>
//       <Button> 이메일 변경하기 </Button>
//       <div>핸드폰 번호</div>
//       <div>{account.phoneNumber}</div>
//       <Button> 핸드폰 번호 변경하기 </Button>
//
//       <div>생성일</div>
//       <div>{dateToString(account.createdAt)}</div>
//
//       <LogoutButton />
//     </div>
//   );
// }
