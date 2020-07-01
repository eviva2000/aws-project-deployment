import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const HomeProfile = () => {
  const [home, setHome] = useState([]);
  const { homeId } = useParams();
  const API_URL = "https://realestate-da8f.restdb.io/rest/addresses";
  const API_KEY = "5ed0af472032862ff2ce2612";
  useEffect(() => {
    async function fetchHome() {
      const url = `${API_URL}/${homeId}`;
      const api_cal = await fetch(url, {
        crossDomain: true,
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-apikey": API_KEY,
          "cache-control": "no-cache",
        },
      });
      const response = await api_cal.json();
      setHome(response);
      console.log(response);
    }
    fetchHome(); // eslint-disable-next-line
  }, []);

  return (
    <>
      {home ? (
        <div id="homeProfileContainer">
          <div id="imageWrapper">
            <div
              style={{
                width: "100%",
                backgroundImage: `url(https://realestate-da8f.restdb.io/media/${home.image})`, //`url(${imageUrl})`
                backgroundPosition: "center",
                backgroundSize: "cover",
                gridRow: "1 / 5",
              }}
            ></div>
            <div id="takeTour">
              {" "}
              Interested in this property?
              <div
                className="btn"
                style={{
                  border: "rgb(167, 166, 171) 1px solid",
                }}
              >
                Take a tour
              </div>
            </div>
          </div>
          <div id="homeInfo">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 1em",
              }}
            >
              <h3>{home.price}DKK</h3>
              <div style={{ paddingLeft: "1em" }}>
                {" "}
                {home.beds}bd | {home.bath}ba | {home.area}sqm
              </div>
            </div>
            <div style={{ paddingLeft: "1em" }}>
              {" "}
              {home.city} | {home.street} | {home.postalcode}
            </div>
            <div id="description">
              <div></div>
              <p>{home.description}</p>
            </div>
            <div id="btns">
              <div
                className="btn"
                style={{
                  border: "#e8505b 1px solid",
                  color: "#e8505b",
                }}
              >
                Take a tour
              </div>
              <div
                className="btn"
                style={{
                  marginLeft: "1em",
                  backgroundColor: "#e8505b",
                  color: "white",
                }}
              >
                Contact agent
              </div>
            </div>
            <hr />
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3002.6133721334145!2d-73.14261198505395!3d41.18659927928308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e80c540ed85383%3A0x1f19914bf8341e26!2s1574+Stratford+Ave%2C+Stratford%2C+CT+06615%2C+USA!5e0!3m2!1sen!2sdk!4v1559070448677!5m2!1sen!2sdk"
                width="100%"
                height="300"
                frameBorder="0"
                allowFullScreen
                title="AdressMap"
              />
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading....</h2>
      )}
    </>
  );
};
export default HomeProfile;
