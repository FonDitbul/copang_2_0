import Button from '../Common/Atom/Button';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function CartBuyProcessButtonMole() {
  const navigate = useNavigate();

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/order/cart/buy');
    return;
  };

  return (
    <Button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={onClickHandler}>
      결제하기
    </Button>
  );
}
