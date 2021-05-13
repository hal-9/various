const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=metric&appid=998827d16513d893f0e9b7e95eaaea4a"
  );
  const data = await response.json();
  const temperature = data.main.temp.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ temperature }),
  };
};
