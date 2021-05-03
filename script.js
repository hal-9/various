fetch('https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=metric&appid=998827d16513d893f0e9b7e95eaaea4a')
  .then(response => response.json())
  .then(data => {
    const temperature = data.main.temp.toLocaleString(undefined, {maximumFractionDigits: 0})
    document.querySelector('.temperature').innerHTML = `${temperature}°C`
  }
)

const generateTime = () => {
  const rawTime = new Date();
  const rawHours = rawTime.getHours();
  const rawMinutes = rawTime.getMinutes();

  const finalHours = rawHours.toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});
  const finalMinutes = rawMinutes.toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});

  document.querySelector('.time').innerHTML = `${finalHours}:${finalMinutes} `;
}
generateTime();
setInterval(generateTime, 1000);

const darkModeBtnHeader = document.querySelector('.darkModeButtonHeader');
const darkModeBtnFooter = document.querySelector('.darkModeButtonFooter');
const logo = document.querySelector('.logo');

const darkModeSwitcher = (element) => {
  if (element.getAttribute('fill') === "#000000") {
    element.setAttribute('fill', '#26D07C')
    } else {
        element.setAttribute('fill', '#000000')
      }  
  if (logo.getAttribute('fill') === "#000000") {
    logo.setAttribute('fill', '#26D07C')
  } else {
    logo.setAttribute('fill', '#000000')
  }
  document.body.classList.toggle('darkMode');
  document.querySelector('.main__instagram').classList.toggle('darkMode');
  document.querySelector('.main__contact').classList.toggle('darkMode');
  document.querySelector('footer').classList.toggle('darkMode');
}

darkModeBtnHeader.addEventListener('click', () => {
  darkModeSwitcher(darkModeBtnHeader);
});
darkModeBtnFooter.addEventListener('click', () => {
  darkModeSwitcher(darkModeBtnFooter);
})

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

const code = 'AQDvkUD54yNuc7mBpmmQf0cXYugC8OtB9BeJI5j_cGrA7TjZCzn-XSaiqvLq_mKlRA96hM7MmbK1QjK8_hazFkGa8OqRRfyOok0AxWhuHMaQY77wLU4CyAIfaE_pHormpNbBRjRbq4uNyzA1SJaP0-QM-vBtlkC8xvohFRCHKnSAlnQlvV_gb0Ca8fIWdiFzoBNMs1GmgmFWhNda0TBOrFV04SYohouKiZH03C_G68t2SZIypEu7cEEoy6AdcyZSYn01yaghDuyWT6QVbmQ1Yk8Y7Qk3Sgo08FTKks8ZcXdKgTueZbU4Qe__5fz_5L6LO7grmBqEutCo3hVDev3PcA_8XtI1GT9eTSdj75vrUqZNEAYlsR4WJff0jqRVK4S36hD7TRtGk4d1aCICrJKrJHdgRvDTLdYI2ciWL5fRPX5FiFqM8KofOhaCCQ';

function fetchAccessToken(code){
  console.log('fetchAccessToken fired');
  let body = "grant_type=authorization_code";
  body += "&code=" + code;
  body += "&redirect_uri=" + encodeURI(redirect_uri);
  // body += "&client_id=" + client_id;
  // body += "&client_secret" + client_secret;
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