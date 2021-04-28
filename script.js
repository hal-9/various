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


fetch("https://api.spotify.com/v1/me/player/currently-playing?market=DE", {
  headers: {
    Accept: "application/json",
    Authorization: "Bearer BQDVU82QXf9_ZUej6Rw6kqA5KEUeVF1DbfWTraE84M0zdFtIe6C_jnwFzYii9FkIpUWFM448vUOTfdKtpWxUJhILWFwhE1BqjGHLQyUiw2VlAooyZEhC4vnMUE7HFpfX-DRA-z7l9QObcgVjn8jjKaM",
    "Content-Type": "application/json"
  }
})
.then(response => response.json())
.then(data => {
  console.log(data);
})

// fetch("https://api.spotify.com/v1/me/player/recently-played", {
//   headers: {
//     Accept: "application/json",
//     Authorization: "Bearer BQD7a6HZCnVHG6xLAEK7NW1oMytVrFOCM-hn1QmI0MVoek9s8PlTOjhFPggYypemNERSiuU5kuyFu-8CaLhYnLnU5SuquqacgvbACFqBuxXRcmybsdXQVnciiR6a8QJOBtjjLLp-jFDXurfFhu3OpOSmOw",
//     "Content-Type": "application/json"
//   }
// })
// .then(response => response.json())
// .then(data => {
//   console.log(data);
// })