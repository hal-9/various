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
const onAir = document.querySelector('.footer__onAir');

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
  if (onAir.getAttribute('fill') === "#000000") {
    onAir.setAttribute('fill', '#26D07C')
  } else {
    onAir.setAttribute('fill', '#000000')
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

const oAnimations = [
  document.getElementById('oAnimation_1'), 
  document.getElementById('oAnimation_2'),
  document.getElementById('oAnimation_3'),
  document.getElementById('oAnimation_4'),
  document.getElementById('oAnimation_5'),
  document.getElementById('oAnimation_6')
]

const oAnimationInitial = () => {
  const randomPick = Math.floor((Math.random() * oAnimations.length));
  oAnimations[randomPick].style.display="block";
};
oAnimationInitial();

setInterval(function() {
  oAnimations.forEach(element => {
    element.style.display="none";
  });
  const randomPick = Math.floor((Math.random() * oAnimations.length));
  oAnimations[randomPick].style.display="block";
}, 5000);

const redirect_uri = "https://hal-9.github.io/various/"
const AUTHORIZE = "https://accounts.spotify.com/authorize"
const client_id = "e1418b9264424319a857c3e2b53b0eb6"
const client_secret = "7ebfc44506374ab7a5e6809e54930d4e"
let access_token = ''
let refresh_token = ''

function requestAuthorization(){
  // console.log('requestAuthorization fired');
  let url = AUTHORIZE;
  url += "?client_id=" + client_id;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirect_uri);
  url += "&show_dialog=true";
  url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
  window.location.href = url;
}

code = "AQDy02sJKd2dWq0z4FKp2D_aNEfTC4vFEp0l_Oo42zS142jtAosH5cM4yZLEZXr_PMeWASMAeEhXnoY3aerel5RODb7RQWLnPKYLv5wQX5VJY4i2EozIubCoCTO4sd4ka2g6ZcEwW4eeBsC59xaU3BlaK5iaGM-2t-80cku3vfePxsXQWxZgaiLoBzrV73yUP0y-gdUt4vJIZQOcekky1CoeHcqBqzT_eYblNr4thRbz0n0pP1Tk6i5lTStMeGdTY_kqiLsFq0JLHzUTDqh6_Hja7_Oe_B3xlpBc4qO5Glc-8859fhgIUn8GdyXB0g9GpXDvt15zucj5FXXr-ceONAnXB9BXXQDiCzFdidQ0A7M10fcJkEea81T-xF_a0fbNNZOEi1Nf3XuYxNX2LLiNZhaI5jWr0gBy1PPvJhc7Ed1OIaj1jWKR_Mguhw"

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
      }
      if (bodyData.refresh_token !== undefined) {
        console.log('refresh_token ist defineds')
        refresh_token = bodyData.refresh_token;
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


// fetch('https://api.spotify.com/v1/me/player/currently-playing?market=DE', {
//   headers: {
//     Accept: "application/json",
//     Authorization: "Bearer " + localStorage.getItem("access_token"),
//     "Content-Type": "application/json"
//   }
// })
// .then(response => {
//   if (response.status === 204) {
//     console.log('yo there is nothing playing')
//     fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
//       headers: {
//         Accept: "application/json",
//         Authorization: "Bearer " + localStorage.getItem("access_token"),
//         "Content-Type": "application/json"
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       let albumName = data.items[0].track.album.name;
//       let songName = data.items[0].track.name;
//       let artistName = data.items[0].track.artists[0].name;
//       document.querySelector('.footer__spotify').innerHTML = `${albumName}, ${artistName} - ${songName}`;
//     })
//   }
//   else if (response.status === 200) {
//     return response.json();
//   }
// })
// .then(data => {
//   let albumName = data.item.album.name;
//   let songName = data.item.name;
//   let artistName = data.item.artists[0].name;
//   document.querySelector('.footer__spotify').innerHTML = `${albumName}, ${artistName} - ${songName}`;
//   document.querySelector('.footer__onAir').classList.add('onAir-Animation');
// });