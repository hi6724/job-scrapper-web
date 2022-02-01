import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import TopHeader from "./components/TopHeader";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Home from "./screens/Home";

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
`;

export default function App() {
  const [size, setSize] = useState(window.innerWidth > 1050 ? "big" : "small");
  const [datas, setDatas] = useState();
  const [loading, setLoading] = useState();
  const [totalPage, setTotalPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  window.addEventListener("resize", (e) => {
    e.target.innerWidth > 1050 ? setSize("big") : setSize("small");
  });

  return (
    <>
      <GlobalStyle />
      <div style={{ minHeight: "100vh", backgroundColor: "#EAE7DE" }}>
        <TopHeader
          size={size}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setLoading={setLoading}
          setDatas={setDatas}
          setTotalPage={setTotalPage}
        />
        <Home
          size={size}
          loading={loading}
          datas={datas}
          totalPage={totalPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        <Footer size={size} />
      </div>
    </>
  );
}
