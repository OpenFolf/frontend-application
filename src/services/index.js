// Service / Business logic

// Interact with the Vuex store
import Store from "../store";

// Map of Icelandic characters
const Icelandic = {};
Icelandic.latin_map = {
  Á: "a",
  á: "a",
  Đ: "d",
  ð: "d",
  É: "e",
  é: "e",
  Í: "i",
  í: "i",
  Ó: "o",
  ó: "o",
  Ú: "u",
  ú: "u",
  Ý: "y",
  ý: "y",
  Þ: "th",
  þ: "th",
  Æ: "ae",
  æ: "ae",
  Ö: "o",
  ö: "o",
};

// Adding an Icelandic function to the String prototype
String.prototype.icelandic = function() {
  return this.replace(/[^A-Za-z0-9[\] ]/g, function(x) {
    return Icelandic.latin_map[x] || x;
  });
};

// Replace Icelandic characters in path name with compatible characters
export function replaceIcelandicCharacters(originalString) {
  return originalString
    .icelandic()
    .toLowerCase()
    .replace(/\s/g, "-");
}

// Generate a random three letter sequence for the lobby code
export function getLobbyCode() {
  const ascii = () => Math.random() * (91 - 65) + 65;
  return String.fromCharCode(ascii(), ascii(), ascii());
}

// Reach out to geoLocation API for user location
export function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(registerLocation, errorHandler);
  }

  function registerLocation(position) {
    Store.dispatch("setUserLocation", {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      error: 0,
    });
  }

  function errorHandler(e) {
    // TODO: .
    // Here we need to react to different reasons for geoLocation API failing.
    // The service might be blocked or the user refused. Maybe more?
    console.log("services/getUserLocation", e.message);

    const lat = 64.128197;
    const lng = -21.885087;
    const error = 1;
    Store.dispatch("setUserLocation", { lat, lng, error });
    // Store.dispatch("setUserLocation", {
    //   lat: null,
    //   lng: null,
    //   error: true,
    // });
  }
}

// The Haversine formula to calculate distances
export function getDistanceKM(lat1, lon1, lat2, lon2) {
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a =
    0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
  return 2 * 6371 * Math.asin(Math.sqrt(a));
}
