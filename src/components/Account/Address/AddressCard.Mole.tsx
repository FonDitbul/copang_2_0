import StarAtom from "../../Common/Atom/Star";
import { BuyerAddress } from "../../../interface/BuyerAddress";
import { Address } from "../../../interface/Address";

export function AddressCardMole({ address }: BuyerAddress) {
  const addressParse = JSON.parse(address) as Address;

  return (
    <div className="p-5 border">
      <StarAtom isFull={true} />
      <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        <a href="#">수신자</a>
      </h3>
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
