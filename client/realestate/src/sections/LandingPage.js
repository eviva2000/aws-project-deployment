import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [txtSearch, setTxtSearch] = useState("");
  const [notFoundMessage, setNotFoundMessage] = useState(false);
  const [searchResultDisplay, setSearchResultDisplay] = useState("none");
  const [addresses, setAddresses] = useState([]);
  const showSearchResults = () => {
    setSearchResultDisplay("block");
  };
  const hideSearchResults = () => {
    setSearchResultDisplay("none");
  };
  const getInputValue = (event) => {
    setTxtSearch({
      [event.target.id]: event.target.value,
    });
    console.log(event.target.value);
  };
  const API_URL = `https://realestate-da8f.restdb.io/rest/addresses?q={"city":"${txtSearch.searchInput}"}`;
  const API_KEY = "5ed0af472032862ff2ce2612";
  const searchByCity = async () => {
    // console.log(txtSearch.searchInput);
    const options = {
      crossDomain: true,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-apikey": API_KEY,
        "cache-control": "no-cache",
      },
    };
    const fetchCity = await fetch(API_URL, options);
    let result = await fetchCity.json();
    console.log(result);
    if (result.length === 0) {
      setNotFoundMessage(true);
    } else {
      setNotFoundMessage(false);
    }
    setAddresses(result);
    showSearchResults();
  };

  return (
    <div id="landingPage">
      <div className="searchContainer">
        <h2>Looking for your dream house?</h2>
        <div>
          <form autoComplete="off">
            <div onClick={searchByCity} style={{ cursor: "pointer" }}>
              <i className="fas fa-search"></i>
            </div>
            <input
              type="text"
              name="txtSearch"
              id="searchInput"
              placeholder="Search by City or Postal code"
              onChange={getInputValue}
              onBlur={hideSearchResults}
              autoFocus
            />
          </form>
          <div id="searchResult" style={{ display: searchResultDisplay }}>
            {!notFoundMessage ? (
              addresses.map((address) => {
                return (
                  <Link
                    id="searchItem"
                    key={address._id}
                    to={`/inventory/${address._id}`}
                  >
                    <p>
                      {address.city} - Postal code:{address.postalcode}
                    </p>
                  </Link>
                );
              })
            ) : (
              <p id="notFound">Nothing found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
