"use client";
import Link from "next/link";

export default function SignUpLink() {
  return (
    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
      <Link href="/account/signUp">
        <p className="font-medium text-primary-600 hover:underline dark:text-primary-500">
          계정 생성하기
        </p>
      </Link>
    </p>
  );
}