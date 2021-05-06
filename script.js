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
