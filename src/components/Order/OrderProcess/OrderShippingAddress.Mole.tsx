import { BuyerAddress } from "../../../interface/BuyerAddress";
import React from "react";
import { AddressEditButtonMole } from "../../Account/Address/AddressEditButton.Mole";
import { Address } from "../../../interface/Address";

export default function OrderShippingAddressMole({ addresses }: { addresses: BuyerAddress[] }) {
  if (addresses.length === 0) {
    return (
      <div className="max-w-5xl justify-between mb-6 rounded-lg p-6 shadow-md sm:justify-start border-2">
        <h1 className="mb-10 text-center text-2xl font-bold">배송지 정보</h1>
        <span> 주소가 하나도 없습니다. </span>
        <AddressEditButtonMole />
      </div>
    );
  }

  let representativeAddress = addresses.find((address) => address.isRepresentative);

  if (!representativeAddress) {
    representativeAddress = addresses[0];
  }

  const addressObject = JSON.parse(representativeAddress.address) as Address;

  return (
    <div className="max-w-5xl justify-between mb-6 rounded-lg p-6 shadow-md sm:justify-start border-2">
      <h1 className="mb-10 text-center text-2xl font-bold">배송지 정보</h1>
      <span>{addressObject.postalCode}</span>
      <br />
      <span>{addressObject.roadAddress}</span>
      <br />
      <span>{addressObject.jibunAddress}</span>
    </div>
  );
}
