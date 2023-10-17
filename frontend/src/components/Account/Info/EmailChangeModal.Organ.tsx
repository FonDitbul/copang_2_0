import { Modal } from '../../Common/Atom/Modal';
import React, { useState } from 'react';
import { SignUpDuplicateAction } from '../SignUpDuplicationAction';
import SignUpInput from '../SignUpInput.Mole';
import { AvailableState, InputOnChangeType } from '../../../pages/Account/SignUp/SignUp';
import Button from '../../Common/Atom/Button';
import { Client } from '../../../context/api';
import { emailValidation } from '../SignUp.Logic';

interface PropsType {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmailChangeModal({ onClose }: PropsType) {
  const [email, setEmail] = useState('');
  const [isEmailAvailable, setIsEmailAvailable] = useState('INIT' as AvailableState);

  const emailChangeClickEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email) {
      return alert('이메일을 입력해 주세요.');
    }

    if (!emailValidation(email)) {
      return alert('이메일 형식이 올바르지 않습니다.');
    }

    await Client.post('/buyer/change/email', {
      email: email,
    });

    alert('변경 완료');
    location.reload();
    return;
  };

  return (
    <Modal onClose={onClose}>
      <SignUpInput
        id="email"
        text="이메일"
        value={email}
        onChange={(e: InputOnChangeType) => {
          setIsEmailAvailable('INIT');
          setEmail(e.target.value);
        }}
        duplicateButton={{
          title: '이메일',
          value: email,
          onClick: async () => {
            await SignUpDuplicateAction('EMAIL', email, setIsEmailAvailable);
          },
          availableState: isEmailAvailable,
        }}
        type="text"
      />
      <Button disabled={isEmailAvailable !== 'AVAILABLE' ? true : false} onClick={emailChangeClickEvent}>
        변경하기
      </Button>
    </Modal>
  );
}
