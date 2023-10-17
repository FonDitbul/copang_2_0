import AccountLoginPage from './Login/Login';
import AccountInfoPage from './Info/Info';

export default function Account() {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return <AccountInfoPage />;
  }
  return (
    <div>
      <AccountLoginPage />
    </div>
  );
}
