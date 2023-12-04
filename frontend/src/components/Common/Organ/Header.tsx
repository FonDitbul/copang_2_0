import { Link } from 'react-router-dom';
import { ClientStorage } from '../../../context/ClientStorage';
import { useEffect, useState } from 'react';
import HeaderCartTitle from './HeaderCartTitle';
import HeaderOrderTitle from './HeaderOrderTitle';

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const accessToken = ClientStorage.getTokenOrNullByKey('accessToken');
    const accessTokenExpireAt = ClientStorage.getTokenOrNullByKey('accessTokenExpireAt');

    if (accessToken && accessTokenExpireAt) {
      // token 없을시 return
      setIsLogin(true);
    }
  });

  return (
    <header className="flex top-0 z-20">
      <div className="z-10 max-w-5xl justify-between font-mono t lg:flex px-12">
        <Link to="/">
          <p className="fixed left-0 top-0 flex w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            홈
          </p>
        </Link>
      </div>

      <div className="z-10 max-w-5xl justify-between font-mono t lg:flex px-4">
        {isLogin ? (
          <Link to="/cart">
            <HeaderCartTitle />
          </Link>
        ) : (
          <HeaderCartTitle />
        )}
      </div>

      <div className="z-10 max-w-5xl justify-between font-mono text-sm lg:flex px-4">
        {isLogin ? (
          <Link to="/order">
            <HeaderOrderTitle />
          </Link>
        ) : (
          <HeaderOrderTitle />
        )}
      </div>

      <div className="z-10 max-w-5xl justify-between font-mono text-sm lg:flex px-4">
        <Link to="/account">
          <p className="fixed left-0 top-0 flex w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            {isLogin ? '계정' : '로그인'}
          </p>
        </Link>
      </div>
    </header>
  );
}
