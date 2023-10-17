import StarAtom from "../../Common/Atom/Star";
import { BuyerAddress } from "../../../interface/BuyerAddress";
import { Address } from "../../../interface/Address";
import CloseButton from "../../Common/Atom/CloseButton";
import React from "react";
import { Client } from "../../../context/api";
import AddressRepresentativeStar from "./AddressRepresentativeStar.Mole";

export function AddressCardMole(buyerAddress: BuyerAddress) {
  const addressParse = JSON.parse(buyerAddress.address) as Address;

  let star = <StarAtom isFull={buyerAddress.isRepresentative} />;
  if (!buyerAddress.isRepresentative) {
    // 대표 address가 아닌 경우
    star = <AddressRepresentativeStar id={buyerAddress.id} />;
  }

  const deleteClickEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    Client.delete("/buyer/address", {
      data: {
        id: buyerAddress.id,
      },
    }).then(() => {
      location.reload();
    });
    return;
  };

  return (
    <div className="p-5 border">
      {star}
      <CloseButton onClick={deleteClickEvent} />
      {/*<h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">*/}
      {/*  <a href="#">수신자</a>*/}
      {/*</h3>*/}
      <div className="flex flex-col">
        <span className="text-gray-500 dark:text-gray-400"> {addressParse.postalCode} </span>
        <span className="text-gray-500 dark:text-gray-400"> {addressParse.roadAddress} </span>
        <span className="text-gray-500 dark:text-gray-400"> {addressParse.jibunAddress} </span>
        {addressParse.etc && (
          <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{addressParse.etc}</p>
        )}
      </div>
    </div>
  );
}
