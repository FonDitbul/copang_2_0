import { Client } from '../../../context/api';
import StarAtom from '../../Common/Atom/Star';
import React from 'react';

type PropsType = {
  id: number;
};
export default function CreditCardRepresentativeStar({ id }: PropsType) {
  const onClickEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await Client.patch('buyer/card/representative', {
      id,
    });
    location.reload();
    return;
  };
  return <StarAtom isFull={false} onClick={onClickEvent} />;
}
