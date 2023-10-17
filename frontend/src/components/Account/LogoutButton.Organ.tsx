import Button from "../Common/Atom/Button";
import { useNavigate } from "react-router-dom";
import { ClientStorage } from "../../context/ClientStorage";

export default function LogoutButton() {
  const navigate = useNavigate();
  const logoutOnClick = () => {
    ClientStorage.clear();
    navigate("/");
    return;
  };

  return <Button onClick={logoutOnClick}>로그아웃 버튼</Button>;
}
