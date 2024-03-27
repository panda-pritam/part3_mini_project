import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  let [countriesList, setCountriesList] = useState([]);
  let [selectedCountries, setselectedCountries] = useState(false);
  let [stateList, setStateList] = useState([]);
  let [selectedState, setselectedState] = useState(false);
  let [cityList, setCityList] = useState([]);
  let [selectedCity, setselectedCity] = useState(false);
  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        return setCountriesList(res);
      })
      .catch((err) => {
        console.log("err to lode countries list -> ", err);
      });
    setStateList([]);
  }, []);

  useEffect(() => {
    //console.log("selected country-> ", selectedCountries);
    if (selectedCountries) {
      // console.log("selected country-> ", selectedCountries);
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountries}/states`
      )
        .then((res) => res.json())
        .then((res) => setStateList(res))
        .catch((err) => {
          console.log("err to lode State list -> ", err);
        });
      setCityList([]);
    }
    if (selectedState) {
      console.log(selectedCountries, " -> ", selectedState);
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountries}/state=${selectedState}/cities`
      )
        .then((res) => res.json())
        .then((res) => setCityList(res))
        .catch((err) => {
          console.log("err to lode City list -> ", err);
        });
    }
  }, [selectedCountries, selectedState]);

  return (
    <div className="mainDiv">
      <h1>Select Location</h1>
      <div>
        <select
          id="Country"
          onChange={(e) => {
            //console.log(e.target.value);
            if (e.target.value !== "select-country") {
              //console.log("in if", e.target.value);
              setselectedCountries(e.target.value);
              setselectedState(false);
              setselectedCity(false);
            }
          }}
        >
          <option value="select-country">Select Country</option>
          {countriesList.length > 0
            ? countriesList.map((name) => {
                return (
                  <option value={name} key={name}>
                    {name}
                  </option>
                );
              })
            : ""}
        </select>
        <select
          onChange={(e) => {
            if (e.target.value !== "Select State") {
              setselectedState(e.target.value);
              setselectedCity(false);
            }
          }}
          disabled={!selectedCountries}
        >
          <option value="Select State">Select State</option>

          {stateList.length > 0
            ? stateList.map((name) => (
                <option value={name} key={name}>
                  {name}
                </option>
              ))
            : ""}
        </select>
        <select
          onChange={(e) => {
            if (e.target.value !== "Select City") {
              setselectedCity(e.target.value);
            }
          }}
          disabled={!selectedState}
        >
          <option value="Select City">Select City</option>

          {cityList.length > 0
            ? cityList.map((name) => (
                <option value={name} key={name}>
                  {name}
                </option>
              ))
            : ""}
        </select>
      </div>
      {selectedCountries && selectedState && selectedCity ? (
        <div className="testDiv">
          <span className="text">
            <p>You Selected</p>
          </span>{" "}
          <span className="city">
            {" "}
            <h1>{selectedCity},</h1>
          </span>{" "}
          <span className="state">
            <h2>
              {selectedState}, {selectedCountries}
            </h2>
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
