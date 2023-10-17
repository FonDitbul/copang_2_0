import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Common/Organ/Header';
import Footer from './components/Common/Organ/Footer';
import ProductHome from './pages/Product/ProductHome';
import ProductDetail from './pages/Product/ProductDetail';
import CartPage from './pages/Cart/Cart';
import OrderHistoryPage from './pages/Order/OrderHistory.page';
import Account from './pages/Account/Account';
import AccountSignUp from './pages/Account/SignUp/SignUp';
import AccountCreditCardPage from './pages/Account/CreditCard/CreditCard';
import AccountCreditCardAddPage from './pages/Account/CreditCard/CreditCardAdd.page';
import AccountAddressPage from './pages/Account/Address/Address.page';
import OrderProcessByCartPage from './pages/Order/OrderProcessByCart.page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ProductHome />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/order" element={<OrderHistoryPage />}></Route>
          <Route path="/order/cart/buy" element={<OrderProcessByCartPage />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/account/sign-up" element={<AccountSignUp />}></Route>
          <Route path="/account/credit-card" element={<AccountCreditCardPage />}></Route>
          <Route path="/account/credit-card/add" element={<AccountCreditCardAddPage />}></Route>
          <Route path="/account/address" element={<AccountAddressPage />}></Route>
          <Route path="/product/:id" element={<ProductDetail />}></Route>

          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          {/*<Route path="*" element={<NotFound />}></Route>*/}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
