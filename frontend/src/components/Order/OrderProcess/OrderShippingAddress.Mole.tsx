import { BuyerAddress } from "../../../interface/BuyerAddress";
import React, { useEffect, useState } from "react";
import { AddressEditButtonMole } from "../../Account/Address/AddressEditButton.Mole";
import { Address } from "../../../interface/Address";

export default function OrderShippingAddressMole({
  addresses,
  setFunction,
}: {
  addresses: BuyerAddress[];
  setFunction: React.Dispatch<React.SetStateAction<Address>>;
}) {
  const [address, setAddress] = useState({
    postalCode: "",
    address: "",
    roadAddress: "",
    jibunAddress: "",
  } as Address);

  useEffect(() => {
    let representativeAddress = addresses.find((address) => address.isRepresentative);

    if (!representativeAddress) {
      representativeAddress = addresses[0];
    }

    const addressObject = JSON.parse(representativeAddress.address) as Address;
    setAddress(addressObject);
    setFunction(addressObject);
  }, []);

  if (addresses.length === 0) {
    return (
      <div className="max-w-5xl justify-between mb-6 rounded-lg p-6 shadow-md sm:justify-start border-2">
        <h1 className="mb-10 text-center text-2xl font-bold">배송지 정보</h1>
        <span> 주소가 하나도 없습니다. </span>
        <AddressEditButtonMole />
      </div>
    );
  }

  return (
    <div className="max-w-5xl justify-between mb-6 rounded-lg p-6 shadow-md sm:justify-start border-2">
      <h1 className="mb-10 text-center text-2xl font-bold">배송지 정보</h1>
      <span>{address.postalCode}</span>
      <br />
      <span>{address.roadAddress}</span>
      <br />
      <span>{address.jibunAddress}</span>
    </div>
  );
}
