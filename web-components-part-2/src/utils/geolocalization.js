export let coordinates = null;

export const setCoordinates = (newCoordinates) => {
  coordinates = newCoordinates;
};

export const CoordinatesInitEvent = 'CoordinatesInitEvent';

export const createCoordinatesSetEvent = new CustomEvent(CoordinatesInitEvent, {});



export const initCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      coordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      document.dispatchEvent(createCoordinatesSetEvent);
    }
  );
}

export const getLocationNameFromCoordinates = (latitude, longitude) => {
  const URL = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=c7a35398be0f470d9d5c26925d9f3b12`;
  return fetch(URL)
    .then(response => response.json())
    .then(data => data.features[0].properties.city);
}
