import Button from '../../Common/Atom/Button';
import { Modal } from '../../Common/Atom/Modal';
import Input from '../../Common/Atom/Input';
import DaumPostcode from 'react-daum-postcode';
import { Address as DaumAddress } from 'react-daum-postcode';
import React, { useState } from 'react';
import { Client } from '../../../context/api';

interface PropsType {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddressAddModalOrgan({ onClose }: PropsType) {
  const [isSelected, setIsSelected] = useState(false);
  const [address, setAddress] = useState({} as DaumAddress);
  const [etc, setEtc] = useState<string | undefined>(undefined);

  const onClickButtonEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    Client.post('/buyer/address/add', {
      address: {
        postalCode: address.zonecode,
        address: address.address,
        roadAddress: address.roadAddress,
        jibunAddress: address.jibunAddress,
        etc: etc,
      },
    }).then((r) => {
      alert('주소 추가가 완료되었습니다.');
      location.reload();
    });
  };

  return (
    <Modal onClose={onClose}>
      <DaumPostcode
        onComplete={setAddress} // 값을 선택할 경우 실행되는 이벤트
        autoClose={true} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
        defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
        onClose={() => setIsSelected(true)}
      />

      {isSelected && <span> {address.address} </span>}
      {isSelected && <span> {address.jibunAddress} </span>}

      <div>
        <span>상세 주소 입력</span>
        <Input
          onChange={(e) => {
            setEtc(e.target.value);
          }}
          placeholder={'상세 주소 입력'}
        />
      </div>

      <Button onClick={onClickButtonEvent}> 추가하기 </Button>
    </Modal>
  );
}
