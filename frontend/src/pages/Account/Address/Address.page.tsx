import { AddressCardMole } from '../../../components/Account/Address/AddressCard.Mole';
import { useEffect, useState } from 'react';
import { BuyerAddress } from '../../../interface/BuyerAddress';
import { Client, ResponseData } from '../../../context/api';
import { AddressAddModalOrgan } from '../../../components/Account/Address/AddressAddModal.Organ';
import Button from '../../../components/Common/Atom/Button';

export type AddressResponse = {
  buyerAddresses: BuyerAddress[];
};

export default function AccountAddressPage() {
  const [addressArray, setAddressArray] = useState([] as BuyerAddress[]);

  useEffect(() => {
    const getAddress = async () => {
      const response = await Client.get('/buyer/address');
      const responseData = response.data as ResponseData<AddressResponse>;
      const buyerAddresses = responseData.content.buyerAddresses;
      setAddressArray(buyerAddresses);
    };
    getAddress();
  }, []);

  const [isAddressAddModal, setIsAddressAddModal] = useState(false);

  return (
    <div>
      {addressArray.length === 0 ? (
        <div>저장 된 주소가 존재하지 않습니다.</div>
      ) : (
        addressArray.map((address) => {
          return <AddressCardMole key={address.id} {...address} />;
        })
      )}

      <Button onClick={(e) => setIsAddressAddModal(true)}> 주소 추가하기 </Button>

      {isAddressAddModal && <AddressAddModalOrgan onClose={setIsAddressAddModal} />}
    </div>
  );
}
