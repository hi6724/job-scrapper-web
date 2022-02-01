import React from "react";

export default function Footer({ size }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          height: size === "big" ? "100px" : "90px",
          padding: size === "big" ? "15px 200px" : "8px 8px",
          flexDirection: "column",
          gap: size === "big" ? "15px" : "5px",
        }}
      >
        <h1 style={{ fontFamily: "BM-E", fontSize: size === "big" ? "13px" : "11px" }}>
          ㈜노마드코더 / 하훈목 / 전화번호: +8180-9457-9431 / 이메일주소: hunmok1027@gmail.com
        </h1>
        <h1 style={{ fontFamily: "BM-E", fontSize: size === "big" ? "13px" : "9px" }}>
          경기도 부천시 원미구 장말로 136
        </h1>
        <h1 style={{ fontFamily: "BM-E", fontSize: size === "big" ? "8px" : "9px" }}>&copy; HUNMOK1027.,2022</h1>
      </div>
    </>
  );
}
