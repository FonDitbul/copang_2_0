import { Link } from 'react-router-dom';

export default function Header() {
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
        <Link to="/cart">
          <p className="left-0 top-0 flex w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            장바구니 보기
          </p>
        </Link>
      </div>

      <div className="z-10 max-w-5xl justify-between font-mono text-sm lg:flex px-4">
        <Link to="/order">
          <p className="fixed left-0 top-0 flex w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            구매내역보기
          </p>
        </Link>
      </div>

      <div className="z-10 max-w-5xl justify-between font-mono text-sm lg:flex px-4">
        <Link to="/account">
          <p className="fixed left-0 top-0 flex w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            계정
          </p>
        </Link>
      </div>
    </header>
  );
}