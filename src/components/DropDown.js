import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import styled from "styled-components";
import colors from "../utils/colors";
import { Button, Divider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const careerList = [
  { careerMin: 1, careerMax: 3, text: "1~3년" },
  { careerMin: 4, careerMax: 6, text: "4~6년" },
  { careerMin: 7, careerMax: 9, text: "7~9년" },
  { careerMin: 10, careerMax: 15, text: "10~15년" },
  { careerMin: 16, careerMax: 20, text: "16~20년" },
  { careerMin: 21, careerMax: 99, text: "21년 이상" },
];

export default function DropDown(props) {
  const handleCareer = (min, max) => {
    if (careerMin === "none" && careerMax === "none") {
      if (!personName.includes("2")) {
        let temp = personName;
        temp.push("2");
        setPersonName(temp);
      }
      setCareerMax(max);
      setCareerMin(min);
    }
    if (careerMin > careerMax) {
      setCareerMax("none");
      setCareerMin("none");
    }
    if (careerMax === max) {
      setCareerMax(min - 1);
      return;
    }
    if (careerMin === min) {
      setCareerMin(max + 1);
      return;
    }
    if (careerMax + 1 <= min) {
      setCareerMax(max);
      return;
    }
    if (careerMin - 1 >= max) {
      setCareerMin(min);
      return;
    }
    setCareerMax(max);
    setCareerMin(min);
  };
  const [personName, setPersonName] = React.useState([]);

  const [careerMin, setCareerMin] = React.useState("none");
  const [careerMax, setCareerMax] = React.useState("none");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    let temp = props.parameter;
    temp[1] = [careerMin.toString()];
    temp[2] = [careerMax.toString()];
    props.setParameter(temp);
  }, [careerMax, careerMin]);
  React.useEffect(() => {
    let temp = props.parameter;
    temp[props.id] = personName.length > 0 ? personName : ["none"];
    props.setParameter(temp);
  }, [personName]);

  const handleChange = (event) => {
    let temp = props.parameter;
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    temp[props.id] = typeof value === "string" ? value.split(",") : value;
    if (value.includes !== "2") {
      setCareerMax("none");
      setCareerMin("none");
    }
    if (!value.length > 0) {
      temp[props.id] = ["none"];
    }
    props.setParameter(temp);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: props.size === "big" ? 100 : 0 }} size="small">
      <InputLabel
        sx={{
          transform: props.size === "small" ? "translate(14px, 4px) scale(1)" : "",
          top: 0,
          left: -10,
          fontFamily: "BM-Air",
          fontSize: props.size === "small" ? "12px" : "16px",
          "&.MuiInputLabel-shrink": {
            display: "none",
          },
        }}
        id="demo-multiple-chip-label"
      >
        {props.title}
      </InputLabel>
      <Select
        sx={
          props.size === "small" && {
            height: props.size === "small" ? "25px" : "100%",
            width: props.size === "small" ? "min(20vw,65px)" : "100%",
            fontSize: props.size === "small" ? "12px" : "16px",
          }
        }
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        autoWidth
        multiple
        value={personName}
        onChange={handleChange}
        renderValue={(selected) => (
          <Text>
            {selected.length > 1 ? `${props.data[selected[0]]} 외 ${selected.length - 1}` : props.data[selected[0]]}
          </Text>
        )}
        MenuProps={{
          MenuListProps: {
            style: { display: "grid", gridTemplateColumns: props.id === 0 ? "repeat(3,1fr)" : "repeat(2,1fr)" },
          },
        }}
      >
        <MenuItem disabled value="" style={{ gridColumnStart: 1, gridColumnEnd: 2 }}>
          <em style={{ fontFamily: "BM-Pro" }}>{props.title}</em>
        </MenuItem>

        {Object.keys(props.data).map((id, i) => (
          <MenuItem
            style={{ gridRow: props.id === 0 ? Math.floor(i / 3) + 2 : Math.floor(i / 2) + 2 }}
            selected
            sx={{ height: 16, marginBottom: 1, fontSize: props.size === "big" ? "16px" : "12px" }}
            key={id}
            value={id}
          >
            <Checkbox checked={personName.indexOf(id) > -1} />

            <BlackText>{props.data[id]}</BlackText>
          </MenuItem>
        ))}
        {props.id === 0 && (
          <div style={{ gridRow: 3, gridColumnStart: 1, gridColumnEnd: -1, margin: 8 }}>
            <div style={{ display: "grid", gap: 1, gridTemplateColumns: "repeat(3,1fr)" }}>
              {careerList.map((career, i) => (
                <TextBox
                  selected={career.careerMin >= careerMin && career.careerMax <= careerMax}
                  onClick={() => handleCareer(career.careerMin, career.careerMax)}
                  key={i}
                >
                  {career.text}
                </TextBox>
              ))}
            </div>
          </div>
        )}

        <Divider style={{ gridRow: 10, gridColumnStart: 1, gridColumnEnd: -1, marginBottom: 12 }} variant="middle" />
        <BtnContainer style={{ gridRow: 11, gridColumnStart: 1, gridColumnEnd: -1 }}>
          <Button
            onClick={() => {
              setPersonName(["none"]);
              setCareerMax("none");
              setCareerMin("none");
            }}
            sx={{
              color: "black",
              borderColor: "black",
              fontSize: 16,
              fontFamily: "BM-Air",
              ":hover": { borderColor: "black" },
            }}
            size="small"
            variant="outlined"
          >
            초기화
          </Button>
          <Button size="small" variant="contained">
            <FontAwesomeIcon icon={faCheck} color="white" />
            <WhiteText onClick={() => setOpen(false)}>적용</WhiteText>
          </Button>
        </BtnContainer>
      </Select>
    </FormControl>
  );
}
const TextBox = styled.div`
  cursor: pointer;
  box-shadow: ${(props) => (props.selected ? " 0 0 0 1px rgb(51, 153, 254)" : "0 0 0 1px rgba(0, 0, 0, 0.2)")};

  font-family: "BM-Air";
  font-size: 14px;
  color: ${(props) => (props.selected ? "rgb(51, 153, 254)" : "rgba(0, 0, 0, 0.6)")};
  padding: 13px 5px;
  display: flex;
  justify-content: center;
  :hover {
    box-shadow: 0 0 0 2px ${colors.blue};
    color: ${colors.blue};
  }
`;

const BtnContainer = styled.div`
  gap: 5px;
  display: flex;
  justify-content: center;
`;
const WhiteText = styled.h1`
  margin-left: 4px;
  font-family: "BM-Air";
  font-size: 16px;
  color: white;
`;
const BlackText = styled.h1`
  font-family: "BM-Air";
  color: ${colors.black};
`;

const Text = styled.h1`
  font-family: "BM-Air";
  color: ${colors.blue};
`;
