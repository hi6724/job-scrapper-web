import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import colors from "../utils/colors";
import TagNav from "./TagNav";

export default function TopHeader({
  setDatas,
  setTotalPage,
  setLoading,
  currentPage,
  setCurrentPage,
  size,
}) {
  const { register, watch, setValue, handleSubmit, getValues } = useForm();

  const [parameter, setParameter] = useState([
    ["none"],
    ["none"],
    ["none"],
    ["none"],
    ["none"],
    ["none"],
    ["none"],
    ["none"],
  ]);
  const getJobs = async () => {
    window.scrollTo({ top: 0 });
    setDatas([]);
    const keyword = getValues("keyword");
    let URL = `https://job-scrapper.onrender.com/search2/${keyword}/${currentPage}`;
    parameter.map((pp, i) => {
      let temp = "";
      pp.map((p, i) => {
        if (p !== "none") {
          if (i === pp.length - 1) {
            temp += `${p}`;
          } else {
            temp += `${p},`;
          }
        } else {
          temp = "none";
        }
      });
      URL += `/${temp}`;
    });
    setLoading(true);
    const { data: jobs } = await axios.get(URL);
    setLoading(false);
    setDatas(jobs.data);
    setTotalPage(jobs.total);
  };

  const onValid = async () => {
    setCurrentPage(1);
    getJobs();
  };
  useEffect(() => {
    if (getValues("keyword").length > 0) {
      setTimeout(window.scrollTo(0, 0), 100);
      getJobs();
    }
  }, [currentPage]);
  return (
    <div>
      <Container size={size}>
        <Logo onClick={() => setDatas(undefined)}>
          <img
            style={{ marginRight: size === "big" ? 25 : 0 }}
            src={"/images/nomad-job.png"}
            height={size === "big" ? 80 : 0}
          />
        </Logo>
        <form
          onSubmit={handleSubmit(onValid)}
          style={{ display: "flex", borderCollapse: "collapse" }}
        >
          <div style={{ position: "relative", display: "flex" }}>
            <div style={{ position: "relative" }}>
              <Input
                size={size}
                {...register("keyword")}
                placeholder="검색어 입력"
              />
              {watch("keyword") && (
                <Cancel onClick={() => setValue("keyword", "")}>
                  <StyledIcon icon={faTimes} color="gray" />
                </Cancel>
              )}
            </div>
            <Box onClick={handleSubmit(onValid)}>검색</Box>
          </div>
        </form>
      </Container>
      <TagNav parameter={parameter} setParameter={setParameter} size={size} />
    </div>
  );
}
const Logo = styled.div`
  cursor: pointer;
`;
const StyledIcon = styled(FontAwesomeIcon)`
  transition: all 0.1s ease-out;
  :hover {
    color: ${colors.black};
  }
`;
const Cancel = styled.div`
  position: absolute;
  text-align: center;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;
const Input = styled.input`
  font-size: 18px;
  font-family: "BM-Air";
  border: 0;
  background-color: rgba(255, 255, 255, 0.8);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  outline: none;
  padding: 12px;
  height: 48px;
  width: ${(props) => (props.size === "big" ? "280px" : "65vw")};
  transition: all 0.5s ease-out;
`;
const Container = styled.div`
  gap: 25px;
  height: ${(props) => (props.size === "big" ? "125px" : "80px")};
  display: flex;
  align-items: center;
  padding: ${(props) => (props.size === "big" ? "40px 80px" : "0")};
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
`;
const Box = styled.div`
  color: white;
  font-size: ${(props) => (props.size === "big" ? "18px" : "14px")};
  font-weight: 600;
  font-family: "BM-Air";
  background-color: ${colors.black};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: ${(props) => (props.size === "big" ? "70px" : "min(17vw,60px)")};
  border-top-right-radius: 5px;
  transition: all 0.1s ease-out;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: ${colors.blue};
  }
`;
