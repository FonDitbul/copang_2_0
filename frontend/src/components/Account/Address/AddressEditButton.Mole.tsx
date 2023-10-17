import Button from '../../Common/Atom/Button';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export function AddressEditButtonMole() {
  const navigate = useNavigate();

  const buttonOnclick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/account/address');
    return;
  };

  return <Button onClick={buttonOnclick}>주소 편집하기</Button>;
}
