// Service / Business logic

export function getLobbyCode() {
  const ascii = () => Math.random() * (91 - 65) + 65;
  return String.fromCharCode(ascii(), ascii(), ascii());
}

export function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocationInfo);
  }

  function displayLocationInfo(position) {
    // Here there should be a call to the store.
    const location = new Object();
    location.lat = position.coords.latitude;
    location.lon = position.coords.longitude;
    console.log(`latitude: ${location.lat} | longitude: ${location.lon}`);
  }
}

// The Haversine formula
export function getDistanceKM(lat1, lon1, lat2, lon2) {
  // Math.PI / 180
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a =
    0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
  // R = 6371 km
  return 2 * 6371 * Math.asin(Math.sqrt(a));
}
