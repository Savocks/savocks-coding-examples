const italianCitiesCoordinates = {
  Roma: { latitude: 41.9028, longitude: 12.4964 },
  Milano: { latitude: 45.4642, longitude: 9.1900 },
  Napoli: { latitude: 40.8518, longitude: 14.2681 },
  Torino: { latitude: 45.0703, longitude: 7.6869 },
  Palermo: { latitude: 38.1157, longitude: 13.3615 },
  Genova: { latitude: 44.4056, longitude: 8.9463 },
  Bologna: { latitude: 44.4949, longitude: 11.3426 },
  Firenze: { latitude: 43.7696, longitude: 11.2558 },
  Bari: { latitude: 41.1171, longitude: 16.8719 },
  Catania: { latitude: 37.5079, longitude: 15.0830 },
  Venezia: { latitude: 45.4408, longitude: 12.3155 },
  Verona: { latitude: 45.4384, longitude: 10.9916 },
  Messina: { latitude: 38.1938, longitude: 15.5540 },
  Padova: { latitude: 45.4064, longitude: 11.8768 },
  Trieste: { latitude: 45.6495, longitude: 13.7768 },
  Brescia: { latitude: 45.5416, longitude: 10.2118 },
  Parma: { latitude: 44.8015, longitude: 10.3279 },
  Modena: { latitude: 44.6471, longitude: 10.9252 },
  ReggioCalabria: { latitude: 38.1144, longitude: 15.6506 },
  Perugia: { latitude: 43.1107, longitude: 12.3908 }
};

export let italyTopCitiesWeather = [];

export const getCityWeather = (latitude, longitude) => {
  const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&forecast_days=1&models=arpae_cosmo_5m`;
  return fetch(URL)
    .then(response => response.json())
    .then(data => data)
    .then(data => ({
      temperature: `${data.current.temperature_2m} ${data.current_units.temperature_2m}`,
      humidity: `${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`,
      weatherCode: data.current.weather_code
    }))
    .catch(error => console.error('Error:', error));
}

export const getItalyTopCitiesWeather = () => {
  let promises = [];

  for (let city in italianCitiesCoordinates) {
    promises.push(getCityWeather(italianCitiesCoordinates[city].latitude, italianCitiesCoordinates[city].longitude));
  }

  Promise.all(promises)
    .then(data => {
      return data.map((cityWeather, index) => ({
        name: Object.keys(italianCitiesCoordinates)[index],
        ...cityWeather
      }))
    })
    .then(data => italyTopCitiesWeather = data)
    .then((_) => document.dispatchEvent(TopCitiesEvent))
    .catch(err => console.log('Error:', err));
};


export const TopCitiesEventKey = 'TopCitiesEvent';

export const TopCitiesEvent = new CustomEvent(TopCitiesEventKey, {});

export const initWeatherApi = () => {
  getItalyTopCitiesWeather();
};
