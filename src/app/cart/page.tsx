import CartCard from "@/components/Cart/CartCard";
import CartCostTotal from "@/components/Cart/CartCostTotal";

export default function Cart() {
  return (
    <div className="h-screen bg-dark-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
        </div>
        <CartCostTotal />
      </div>
    </div>
  );
}
