import { ChangeEvent, useState } from "react";
import Input from "../../../components/Common/atom/Input";
import Button from "../../../components/Common/atom/Button";
import SignUpLinkButton from "../../../components/Account/SignUpLink.Mole";
import { useNavigate } from "react-router-dom";
import { Client, ResponseData } from "../../../context/api";

export type Token = {
  value: string;
  expiredAt: Date;
};

export type TokenResponse = {
  value: string;
  expiredAt: string;
};
export type LoginResponse = {
  accessToken: TokenResponse;
  refreshToken: TokenResponse;
};
const loginByServer = async (userId: string, password: string) => {
  const response = await Client.post("/buyer/login", {
    userId,
    password,
  });
  const responseData = response.data as ResponseData<LoginResponse>;
  const result = responseData.content;

  localStorage.setItem("accessToken", result.accessToken.value);
  localStorage.setItem("accessTokenExpireAt", result.accessToken.expiredAt);
  localStorage.setItem("refreshToken", result.refreshToken.value);
  localStorage.setItem("refreshTokenExpireAt", result.refreshToken.expiredAt);
};

export default function AccountLoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginButtonClick = async () => {
    if (!userId || !password) {
      return alert("로그인 혹은 패스워드를 입력해주세요");
    }

    await loginByServer(userId, password);
    alert("로그인 성공");
    navigate("/");
    return;
  };

  const setUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const setPasswordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {" "}
                  아이디{" "}
                </label>
                <Input
                  name="id"
                  id="아이디 입력"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="아이디"
                  onChange={setUserIdChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {" "}
                  비밀번호{" "}
                </label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={setPasswordOnChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start px-4">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                      로그인 정보 저장하기{" "}
                    </label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  비밀번호를 잊어버리셨나요?
                </a>
              </div>
              <Button
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={loginButtonClick}
              >
                로그인
              </Button>

              <SignUpLinkButton />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
