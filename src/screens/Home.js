import React from "react";
import styled, { css } from "styled-components";
import Article from "../components/Article";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
export default function Home({ datas, totalPage, currentPage, setCurrentPage, loading, size }) {
  return (
    <>
      <div>
        <Container>
          <BigText size={size} style={{ height: size === "big" ? "85px" : "35px" }}>
            원하는 직업을 찾아보세요!
          </BigText>
        </Container>
        {loading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReactLoading type={"balls"} color={"#123123"} height={667} width={375} />
          </div>
        )}
        {datas === undefined && (
          <Container>
            <div
              style={{
                height: size === "big" ? 425 : "",
                padding: "40px",
                display: "flex",
                justifyContent: "center",
                flexDirection: size === "small" ? "column" : "row",
              }}
            >
              <div>
                <Title>안녕하세요</Title>
                <Payload>이 사이트는 뉴닉의 디자인을 참고해서 디자인 했습니다</Payload>
                <Payload>스크래핑은 잡코리아에서 해오고 있습니다</Payload>
                <Payload>프론트엔드는 리액트를 사용하였고 백엔드는 장고를 활용하였습니다</Payload>
                <Payload>장고를 처음 써봐서 장고에 대해서 공부하는게 제일 어려웠습니다 😥</Payload>
              </div>
              <div style={{ overflow: "hidden", height: size === "big" ? 385 : "", zIndex: 1, width: "auto" }}>
                <img
                  style={{ overflow: "hidden", height: "auto", zIndex: 1, width: size === "big" ? 443 : "80vw" }}
                  src={"/images/gosum-home.png"}
                />
              </div>
            </div>
          </Container>
        )}
        {datas !== undefined && (
          <div
            style={{
              gridColumnStart: 1,
              gridColumnEnd: -1,
              height: 45,
              display: "flex",
              alignItems: "center",
              marginLeft: 15,
            }}
          >
            <h1 style={{ fontFamily: "BM-Y" }}>총 {totalPage}건</h1>
          </div>
        )}
        {totalPage === 0 && (
          <NoResult>
            <BigText style={{ height: 85, border: "none", padding: 0 }}>결과없음</BigText>
          </NoResult>
        )}
        <GridWrapper>
          {datas !== undefined &&
            datas.map((data, i) => {
              if (i % 2 === 0) {
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: size === "big" ? "row" : "column",
                    }}
                  >
                    <Article size={size} index={i} {...data} />
                    {datas[i + 1] !== undefined && <Article size={size} index={i} {...datas[i + 1]} />}
                  </div>
                );
              }
            })}
          <PageBtnContainer>
            {currentPage > 10 && (
              <IconContainer onClick={() => setCurrentPage((Math.floor(currentPage / 10) - 1) * 10 + 1)}>
                <FontAwesomeIcon icon={faBackward} />
              </IconContainer>
            )}

            {totalPage / 200 >= Math.ceil(currentPage / 10) ? (
              <>
                <div style={{ display: "flex" }}>
                  {Array.from(Array(10), (e, i) => {
                    const value = (Math.ceil(currentPage / 10) - 1) * 10 + i + 1;
                    return (
                      <PageBtn
                        size={size}
                        selected={value === currentPage}
                        key={i}
                        onClick={() => setCurrentPage(value)}
                      >
                        <h1>{value}</h1>
                      </PageBtn>
                    );
                  })}
                </div>
                <IconContainer onClick={() => setCurrentPage(Math.ceil(currentPage / 10) * 10 + 1)}>
                  <FontAwesomeIcon icon={faForward} />
                </IconContainer>
              </>
            ) : (
              <div style={{ display: "flex" }}>
                {Array.from(Array(Math.ceil(totalPage / 20) - Math.ceil(currentPage / 10) + 1), (e, i) => {
                  return (
                    <PageBtn
                      size={size}
                      onClick={() => setCurrentPage((Math.ceil(currentPage / 10) - 1) * 10 + i + 1)}
                      key={i}
                    >
                      {(Math.ceil(currentPage / 10) - 1) * 10 + i + 1}
                    </PageBtn>
                  );
                })}
              </div>
            )}
          </PageBtnContainer>
        </GridWrapper>
      </div>
    </>
  );
}

const GridWrapper = styled.div`
  margin-top: 5px;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, 1000px);
  grid-gap: 1px;
`;

const IconContainer = styled.div`
  cursor: pointer;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  display: flex;
  color: rgba(0, 0, 0, 0.6);
  :hover {
    color: black;
  }
`;
const PageBtn = styled.div`
  cursor: pointer;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.size === "big" ? "32px" : "20px")};
  height: ${(props) => (props.size === "big" ? "32px" : "20px")};
  display: flex;
  color: ${(props) => (props.selected ? "black" : "rgba(0, 0, 0, 0.6)")};
  font-size: ${(props) => (props.size === "big" ? "14px" : "10px")};
  font-family: ${(props) => (props.selected ? "BM-Pro" : "BM-Air")};
  border: ${(props) => (props.selected ? "2px solid rgba(0, 0, 0, 0.6)" : "none")};
  ${(props) =>
    !props.selected &&
    css`
      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.2);
      }
    `}
`;
const Payload = styled.h1`
  font-family: "BM-Air";
  margin-bottom: 10px;
`;
const Title = styled(Payload)`
  font-size: 30px;
  margin-bottom: 25px;
`;
const PageBtnContainer = styled.div`
  margin: 24px;
  grid-column-start: 1;
  grid-column-end: -1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NoResult = styled.div`
  grid-column-start: 1;
  grid-column-end: -1;
  height: 350px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background-color: #ff6b00;
`;
const BigText = styled.h1`
  display: flex;
  align-items: center;
  font-family: "BM-Pro";
  font-size: ${(props) => (props.size === "big" ? "40px" : "20px")};
  background-color: #eae7de;
  padding-left: ${(props) => (props.size === "big" ? "235px" : "20px")};
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
`;
