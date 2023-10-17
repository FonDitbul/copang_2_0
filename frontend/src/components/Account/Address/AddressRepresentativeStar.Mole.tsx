import React from 'react';
import { Client } from '../../../context/api';
import StarAtom from '../../Common/Atom/Star';

type PropsType = {
  id: number;
};
export default function AddressRepresentativeStar({ id }: PropsType) {
  const onClickEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await Client.patch('buyer/address/representative', {
      id,
    });
    location.reload();
    return;
  };
  return <StarAtom isFull={false} onClick={onClickEvent} />;
}
