import React, { useState } from "react";
import styled from "styled-components";
import colors from "../utils/colors";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
// grid-row: ${(props) => Math.ceil(props.index / 2)};
// grid-column-start: 1;
// grid-column-end: -1;
// width: 1000px;

export default function Article(props) {
  console.log("https://www.jobkorea.co.kr/" + props.link);
  const style = {
    position: "absolute",
    top: props.size === "big" ? "50%" : "50%",
    left: props.size === "big" ? "50%" : "50vw",
    transform: "translate(-50%, -50%)",
    width: props.size === "big" ? 1000 : "90vw",
    bgcolor: "white",
    border: "2px solid #000",
    borderRadius: "15px",
    boxShadow: 24,
    p: "15px 20px 25px 20px",
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Container size={props.size} onClick={handleOpen} index={props.index}>
        <div>
          <Company size={props.size}>{props.company}</Company>
          <WrapTitle size={props.size}>{props.title}</WrapTitle>
        </div>
        <div>
          <WrapFooterText size={props.size}>{props.options.replace(/↑/g, "⬆").replace(/\//g, " / ")}</WrapFooterText>
          <WrapFooterText size={props.size} style={{ fontSize: 14, color: "rgba(0,0,0,0.6)" }}>
            {props.etc}
          </WrapFooterText>
        </div>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        // sx={{
        //   "&.MuiModal-root": {
        //     backgroundColor: "#EAE7DE",
        //   },
        // }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
            <IconContainer onClick={handleClose} color={colors.red}>
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </IconContainer>
            <a style={{ color: colors.black }} target="_blank" href={"https://www.jobkorea.co.kr/" + props.link}>
              <IconContainer onClick={handleClose} color={colors.blue}>
                <FontAwesomeIcon icon={faSignInAlt} size="lg" />
              </IconContainer>
            </a>
          </div>
          <div>
            <Company>{props.company}</Company>
            <Title>{props.title}</Title>
          </div>
          <div>
            <FooterText>{props.options.replace(/↑/g, "⬆").replace(/\//g, " / ")}</FooterText>
            <FooterText style={{ fontSize: props.size === "big" ? "14px" : "12px", color: "rgba(0,0,0,0.6)" }}>
              {props.etc}
            </FooterText>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const Cancel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
`;
const IconContainer = styled.div`
  cursor: pointer;
  :hover {
    color: ${(props) => props.color};
  }
`;
const Container = styled.div`
  cursor: pointer;
  width: ${(props) => (props.size === "big" ? "500px" : "90vw")};
  height: ${(props) => (props.size === "big" ? "180px" : "150px")};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
  padding: 25px;
  display: flex;
  flex-direction: column;
  :hover {
    background-color: white;
    box-shadow: 0 0 0 2px ${colors.blue};
  }
`;

const Company = styled.h1`
  font-size: ${(props) => (props.size === "big" ? "16px" : "14px")};
  font-family: "BM-Y";
`;
const Title = styled.h1`
  font-size: ${(props) => (props.size === "big" ? "20px" : "16px")};
  font-family: "BM-Pro";
  margin: 10px 0px 5px 0px;
`;
const WrapTitle = styled(Title)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const FooterText = styled.h1`
  margin-right: 15px;
  margin-top: 10px;
  font-size: ${(props) => (props.size === "big" ? "18px" : "14px")};
  font-family: "BM-Air";
`;
const WrapFooterText = styled(FooterText)`
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 15px;
  margin-top: 10px;
  font-family: "BM-Air";
  overflow: hidden;
`;
