import logo from "./logo.svg";
import "./App.css";
// import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
function App() {
  let [flagList, setFlagList] = useState([]);
  let [cardList, setCardList] = useState([]);
  let [searchText, setSearchText] = useState("");
  // https://restcountries.com/v3.1/all
  useEffect(() => {
    try {
      fetch("https://restcountries.com/v3.1/all")
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setFlagList(res);
        })
        .catch((err) => {
          console.log("err-> ", err);
        });
    } catch (error) {}
  }, []);
  useEffect(() => {
    let list = [];
    console.log(searchText);
    if (flagList.length > 0 && searchText.length > 0) {
      list = flagList.filter((ele) => {
        //console.log(str.includes(substr));
        let name = ele.name.common.toLowerCase();
        if (name.includes(searchText.toLowerCase())) {
          return ele;
        }
      });
      console.log("filtered List-> ", list);
      setFlagList(list);
    } else {
      try {
        fetch("https://restcountries.com/v3.1/all")
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            console.log(res);
            setFlagList(res);
          })
          .catch((err) => {
            console.log("err-> ", err);
          });
      } catch (error) {}
    }
  }, [searchText]);
  useEffect(() => {
    if (flagList.length) {
      let cardList = flagList.map((ele) => {
        return (
          <Grid
            item
            xl={12 / 7}
            lg={5}
            md={4}
            sm={3}
            key={ele.name.common}
            className="cardbox"
          >
            <img
              src={ele.flags.png}
              alt={ele.flags.alt}
              width="100px"
              height="100px"
            />
            <h2 className="ctyName">{ele.name.common}</h2>
          </Grid>
        );
      });
      setCardList(cardList);
    }
  }, [flagList]);
  return (
    <div>
      {/* <h1>country flag</h1> */}
      <header>
        <input
          placeholder="Search for countries..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          className="searchBox"
        />
      </header>
      <div className="mainDiv">
        <Grid container spacing={2}>
          {cardList}
        </Grid>
      </div>
    </div>
  );
}

export default App;
