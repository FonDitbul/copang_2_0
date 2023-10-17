import { Link } from 'react-router-dom';

export default function SignUpLink() {
  return (
    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
      <Link to={'/account/sign-up'}>
        <p className="font-medium text-primary-600 hover:underline dark:text-primary-500">계정 생성하기</p>
      </Link>
    </p>
  );
}
