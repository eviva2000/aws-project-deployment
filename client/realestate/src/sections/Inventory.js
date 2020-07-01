import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Inventory = (props) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = "https://realestate-da8f.restdb.io/rest/addresses";
  const [homes, setHomes] = useState([]);
  useEffect(() => {
    async function fetchAllHomes() {
      const options = {
        crossDomain: true,
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-apikey": API_KEY,
          "cache-control": "no-cache",
        },
      };
      const api_call = await fetch(API_URL, options);
      const response = await api_call.json();
      console.log(response);
      setHomes(response);
    }
    fetchAllHomes();
  }, [API_KEY]);

  // console.log(API_KEY);
  let homeLink = homes.map((home) => {
    return (
      <Link key={home._id} to={`/inventory/${home._id}`}>
        <div id="home">
          <div
            style={{
              width: "100%",
              height: "25vh",
              backgroundImage: `url(https://realestate-da8f.restdb.io/media/${home.image})`, //`url(${imageUrl})`
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 1em",
            }}
          >
            <h3>{home.price}DKK</h3>
            <p>
              {home.beds} | {home.bath} | {home.area}sqm
            </p>
          </div>
          <div style={{ paddingLeft: "1em" }}>
            {" "}
            {home.city} | {home.street} | {home.postalcode}
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div id="homeContainer">{homeLink ? homeLink : <h2>Loading ....</h2>} </div>
  );
};
export default Inventory;
