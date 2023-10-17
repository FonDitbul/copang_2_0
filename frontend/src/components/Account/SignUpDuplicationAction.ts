import { Dispatch, SetStateAction } from 'react';
import { Client, ResponseData } from '../../context/api';
import { AvailableState, DuplicationType } from '../../pages/Account/SignUp/SignUp';

export const SignUpDuplicateAction = async (type: DuplicationType, value: string, setFunction: Dispatch<SetStateAction<AvailableState>>) => {
  let result: boolean = true;

  if (!value) {
    throw new Error('value 입력이 필요합니다.');
  }

  if (type === 'USER_ID') {
    const response = await Client.get(`/buyer/exist-user-id/${value}`);
    const responseData = response.data as ResponseData<boolean>;
    result = responseData.content;
  }

  if (type === 'NICK_NAME') {
    const response = await Client.get(`/buyer/exist-user-nick-name/${value}`);
    const responseData = response.data as ResponseData<boolean>;
    result = responseData.content;
  }

  if (type === 'EMAIL') {
    const response = await Client.get(`/buyer/exist-user-email/${value}`);
    const responseData = response.data as ResponseData<boolean>;
    result = responseData.content;
  }

  if (type === 'PHONE_NUMBER') {
    const response = await Client.get(`/buyer/exist-user-phone-number/${value}`);
    const responseData = response.data as ResponseData<boolean>;
    result = responseData.content;
  }

  if (result) {
    setFunction('DUPLICATE');
  }
  setFunction('AVAILABLE');
};
