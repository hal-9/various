const fetch = require("node-fetch");
const btoa = require("btoa");

exports.handler = async function (event, context) {
  const code =
    "AQBshmpxKFNGt_W9dpfbMilHgJMXZoaveYC_xhRFVimuLxMWJBIQesXwdHKDC81Lg5bgg9SoEje5BYD0Xzy0-sqS_JlyMTR6m8MHJVgBUhZ1SXE5y1Nq_TQEgPxY5d2QN4rp5LNJdv9qKQ6Oa-XopP33yjjIIFJq5X_xWr8QyEgOhBiMxhgoFyB-jQAex-wCDH6g9K9lM1QhtOPd_4gNU1ctDUTdt6kBh2m6GNIWsj3D5folKb4QRoiNo-pmqGbUGSweuCBsC8XKXMla8_LP7NSzPnGegUQHtMMuIQBxzpbzhX2YdE4eL-HcziaDvz9glAEEc-beOZ4u5pwYWijMXmkjrwZUbz6-F8Ro_aMhcBbsDVYKLPSmJJQvNttk2jMJLRkpin-sxqJM5YdJS3RVYMPiRjirEXHt9loTf1oIObhMESMhYLRR9baaHw";
  let refreshToken;
  let accessToken;
  const redirect_uri = "http://localhost:8889/";
  const client_id = "e1418b9264424319a857c3e2b53b0eb6";
  const client_secret = "7ebfc44506374ab7a5e6809e54930d4e";

  function fetchAccessToken(code) {
    console.log("fetchAccessToken fired");
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    console.log(body);
    callAuthorizationApi(body);
  }

  function callAuthorizationApi(body) {
    console.log("callAuthorizationApi fired");
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(client_id + ":" + client_secret),
      },
    }).then((response) => handleAuthorizationResponse(response));
  }

  function handleAuthorizationResponse(response) {
    console.log("handleAuthorizationFired");
    console.log(response);
    if (response.status === 200) {
      console.log("if fired");
      response.json().then((bodyData) => {
        if (bodyData.access_token !== undefined) {
          console.log("access_token ist defined");
          let accessToken = bodyData.access_token;
          console.log("accessToken = " + accessToken);
        }
        if (bodyData.refresh_token !== undefined) {
          let refreshToken = bodyData.refreshToken;
          console.log("refreshToken = " + refreshToken);
        }
      });
    } else if (response.status === 400) {
      console.log("else if fired");
      refreshAccessToken();
    }
  }

  function refreshAccessToken() {
    console.log("refresh accesstoken fired");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refreshToken;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
  }

  fetchAccessToken(code);

  return {
    statusCode: 250,
    body: JSON.stringify({ accessToken }),
  };
};
