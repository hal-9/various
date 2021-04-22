fetch('https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=metric&appid=998827d16513d893f0e9b7e95eaaea4a')
  .then(response => response.json())
  .then(data => {
    const temperature = data.main.temp.toLocaleString(undefined, {maximumFractionDigits: 0})
    document.querySelector('.temperature').innerHTML = `${temperature}°C`
  }
)

const darkModeBtnHeader = document.querySelector('.darkModeButtonHeader');
darkModeBtnHeader.addEventListener('click', () => {
  if (darkModeBtnHeader.getAttribute('fill') === "#000000") {
    darkModeBtnHeader.setAttribute('fill', '#26D07C')
  } else {
    darkModeBtnHeader.setAttribute('fill', '#000000')
  }

  const logo = document.querySelector('.logo');
  if (logo.getAttribute('fill') === "#000000") {
    logo.setAttribute('fill', '#26D07C')
  } else {
    logo.setAttribute('fill', '#000000')
  }
  document.body.classList.toggle('darkMode');
  document.querySelector('.main__instagram').classList.toggle('darkMode');
  document.querySelector('.main__contact').classList.toggle('darkMode');

  
  const header = document.querySelector('header');
  header.classList.remove('run-blur-animation');
  void header.offsetWidth;
  header.classList.add('run-blur-animation');
  header.classList.toggle('darkMode');

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

const darkModeBtnFooter = document.querySelector('.darkModeButtonFooter');
darkModeBtnFooter.addEventListener('click', () => {
  if (darkModeBtnFooter.getAttribute('fill') === "#000000") {
    darkModeBtnFooter.setAttribute('fill', '#26D07C')
  } else {
    darkModeBtnFooter.setAttribute('fill', '#000000')
  }

  const logo = document.querySelector('.logo');
  if (logo.getAttribute('fill') === "#000000") {
    logo.setAttribute('fill', '#26D07C')
  } else {
    logo.setAttribute('fill', '#000000')
  }
  document.body.classList.toggle('darkMode');
  document.querySelector('.main__instagram').classList.toggle('darkMode');
  document.querySelector('.main__contact').classList.toggle('darkMode');

  const footer = document.querySelector('footer');
  footer.classList.toggle('.darkMode');
  
  const header = document.querySelector('header');
  header.classList.remove('run-blur-animation');
  void header.offsetWidth;
  header.classList.add('run-blur-animation');
  header.classList.toggle('darkMode');

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