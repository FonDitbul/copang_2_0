import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Organ/Header";
import Footer from "./components/Common/Organ/Footer";
import ProductHome from "./pages/Product/ProductHome";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ProductHome />}></Route>
          {/*<Route path="/account" element={<Product />}></Route>*/}
          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          {/*<Route path="*" element={<NotFound />}></Route>*/}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
