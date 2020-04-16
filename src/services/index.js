// Service / Business logic

import Store from "../store/index";
import { replaceAccentForUrl } from "./remove-accents";

export function getLobbyCode() {
  const ascii = () => Math.random() * (91 - 65) + 65;
  return String.fromCharCode(ascii(), ascii(), ascii());
}

export function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocationInfo);
  }

  function displayLocationInfo(position) {
    // TODO: Here there should be a call to the store.
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

// Used to check a "join lobby" request by going through all games in the state "lobby" and cross referencing its lobby code. Returns path and id.
export async function checkLobbyCode(lobbyCode) {
  console.log("LobbyCode", lobbyCode);
  // Get all games from the database
  await Store.dispatch("fetchGames");
  // Look up the lobby code
  const gameExists = Store.getters.getGamesList.find((x) => x.lobbyCode == lobbyCode);
  if (!gameExists) {
    return `No game found with the lobby code ${lobbyCode}`;
  } else if (gameExists.gameStatus !== "0") {
    return `A game with the lobby code ${lobbyCode} found but has already started`;
  } else if (gameExists || gameExists.gameStatus === "0") {
    try {
      // Create the new player in the database
      Store.dispatch("createPlayer", gameExists.id);
      // Get the new Game object and set that as current game
      Store.dispatch("fetchGame", gameExists.id);
      console.log("gameExists", gameExists);
      // TODO: Maybe redundant, but works, should be able to get straight from the state
      return { path: replaceAccentForUrl(gameExists.course.name), id: gameExists.id };
    } catch {
      throw new TypeError("CheckLobbyCode error, lobby code used: ", lobbyCode);
    }
  }
  throw new TypeError("CheckLobbyCode error, lobby code used: ", lobbyCode);
}

export async function createGame(courseId) {
  return await Store.dispatch("createGame", courseId);
}
