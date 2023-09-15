import Button from "../../components/Common/Atom/Button";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();
  const logoutOnClick = () => {
    localStorage.clear();
    navigate("/");
    return;
  };

  return <Button onClick={logoutOnClick}>로그아웃 버튼</Button>;
}
