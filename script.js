fetch('https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=metric&appid=998827d16513d893f0e9b7e95eaaea4a')
.then(response => response.json())
.then(data => console.log(data.main.temp));

const darkModeBtn = document.querySelector('.darkModeButton');
darkModeBtn.addEventListener('click', () => {
  const darkModeBtn = document.querySelector('.darkModeButton');
  if (darkModeBtn.getAttribute('fill') === "#000000") {
    darkModeBtn.setAttribute('fill', '#26D07C')
  } else {
    darkModeBtn.setAttribute('fill', '#000000')
  }

  const logo = document.querySelector('.logo');
  if (logo.getAttribute('fill') === "#000000") {
    logo.setAttribute('fill', '#26D07C')
  } else {
    logo.setAttribute('fill', '#000000')
  }
  document.body.classList.toggle('darkMode');

  const footer = document.querySelector('footer');
  footer.classList.toggle('darkMode');
})

const generateTime = () => {
  const rawTime = new Date();
  const hours = rawTime.getHours();
  const minutes = rawTime.getMinutes();
  if (minutes < 10)  {
    const minutesWithZero = `0${minutes}`
    document.querySelector('.time').innerHTML = `${hours}:${minutesWithZero} `;
  } else {
    document.querySelector('.time').innerHTML = `${hours}:${minutes} `;
  }
}

setInterval(generateTime, 100);