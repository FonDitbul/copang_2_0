import Button from '../../Common/Atom/Button';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function CreditCardAddButton() {
  const navigate = useNavigate();

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/account/credit-card/add');
    return;
  };

  return <Button onClick={onClickHandler}>결제 카드 추가하기</Button>;
}
