exports.handler = async function (event, context) {
  const redirect_uri = "http://127.0.0.1:5500/index.html"
  const AUTHORIZE = "https://accounts.spotify.com/authorize"
  const client_id = "/"
  const client_secret = "/"
  
  function requestAuthorization(){
    console.log('requestAuthorization fired');
    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url;
  }
  
  const code = ""
  
  function fetchAccessToken(code){
    console.log('fetchAccessToken fired');
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    console.log(body);
    callAuthorizationApi(body);
  }
  
  function refreshAccessToken(){
    console.log('refresh accesstoken fired');
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
  }
  
  function callAuthorizationApi(body) {
    console.log('callAuthorizationApi fired');
    fetch('https://accounts.spotify.com/api/token', {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(client_id + ":" + client_secret),
      }
    })
    .then(response => handleAuthorizationResponse(response));
  }
  
  function handleAuthorizationResponse(response) {
    console.log('handleAuthorizationFired');
    console.log(response);
    if (response.status === 200) {
      console.log("if fired");
      response.json()
      .then(bodyData => {
        if (bodyData.access_token !== undefined) {
          console.log('access_token ist defined')
          access_token = bodyData.access_token;
          localStorage.setItem("access_token", access_token);
        }
        if (bodyData.refresh_token !== undefined) {
          refresh_token = bodyData.refresh_token;
          localStorage.setItem("refresh_token", refresh_token);
        }
      })
    }
    else if (response.status === 400) {
      console.log('else if fired')
      refreshAccessToken();
      }
    else {
      alert('there was an error with code ' + response.status);
    }
  }
  fetchAccessToken(code);  
}

