fetch('https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=metric&appid=998827d16513d893f0e9b7e95eaaea4a')
  .then(response => response.json())
  .then(data => {
    const temperature = data.main.temp.toLocaleString(undefined, {maximumFractionDigits: 0})
    document.querySelector('.temperature').innerHTML = `${temperature}°C`
  }
)

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

  
  const header = document.querySelector('header');
  header.classList.remove('run-blur-animation');
  void header.offsetWidth;
  header.classList.add('run-blur-animation');

  const footer = document.querySelector('footer');
  footer.classList.remove('run-blur-animation');
  void footer.offsetWidth;
  footer.classList.add('run-blur-animation');
  footer.classList.toggle('darkMode');

  const main = document.querySelector('main');
  main.classList.remove('run-blur-animation');
  void main.offsetWidth;
  main.classList.add('run-blur-animation');
})

const generateTime = () => {
  const rawTime = new Date();
  const rawHours = rawTime.getHours();
  const rawMinutes = rawTime.getMinutes();

  const finalHours = rawHours.toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});
  const finalMinutes = rawMinutes.toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});

  document.querySelector('.time').innerHTML = `${finalHours}:${finalMinutes} `;
}
setInterval(generateTime, 100);