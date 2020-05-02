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
    navigator.geolocation.getCurrentPosition(registerLocation, errorHandler, options);
  }

  const options = {
    enableHighAccuracy: true,
    maximumAge: 3000,
    timeout: 27000,
  };

  function registerLocation(position) {
    Store.dispatch("setUserLocation", {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      error: 0,
    });
  }

  function errorHandler() {
    const lat = 64.123777;
    const lng = -21.926144;
    const error = 1;
    Store.dispatch("setUserLocation", { lat, lng, error });
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

// Check if player is in game
export function isPlayerInGame(userId, playerArray) {
  let playerInGame = false;
  // Loop through and check if user is player in game
  for (let i = 0; i < playerArray.length; i++) {
    if (playerArray[i].user.id == userId) {
      // If user is player in array then set as true
      playerInGame = true;
    }
  }
  return playerInGame;
}

// Reorganize list of games for rendering on stats page
export function reorganizeGameList(userGameList) {
  // Function that goes through list of user games and re-organizes
  const statsList = [];
  // Function that calculates objects by certain value
  var calcPar = function(items, prop) {
    return items.reduce(function(a, b) {
      return parseInt(a) + parseInt(b[prop]);
    }, 0);
  };
  // Sort gamesList by time
  userGameList.sort(function(a, b) {
    return parseInt(b.game.gameDate) - parseInt(a.game.gameDate);
  });
  // Loop through all game objects and re-organize
  for (let i = 0; i < userGameList.length; i++) {
    const gameObject = {};
    // Sort holes by no.

    const holeObjects = userGameList[i].game.course.holes.items.sort((a, b) =>
      parseInt(a.no) > parseInt(b.no) ? 1 : -1,
    );
    const playerObjects = userGameList[i].game.players.items.sort(
      (a, b) => parseInt(a.totalScore) > parseInt(b.totalScore),
    );
    let par = 0;
    if (holeObjects[0].whitePar > 0) {
      par = calcPar(holeObjects, "whitePar");
    } else {
      par = calcPar(holeObjects, "redPar");
    }

    // const date = new Date(parseInt(userGameList[i].game.gameDate)).toDateString().slice(4);
    // const time = new Date(parseInt(userGameList[i].game.gameDate)).toTimeString().split(" ")[0];
    // gameObject.gameDate = `${date} - ${time}`;
    // Put together a new gameObject
    gameObject.userPlayerId = userGameList[i].id; //Player Id of current user in this gameObject
    gameObject.gameId = userGameList[i].game.id;
    gameObject.scoreArray = userGameList[i].scoreArray;
    gameObject.userTotalScore = userGameList[i].totalScore;
    gameObject.gameStatus = userGameList[i].game.gameStatus;
    gameObject.gameDate = new Date(parseInt(userGameList[i].game.gameDate)).toLocaleDateString(
      "da-DK",
    ); //Change to date
    gameObject.gameOwner = {
      ownerId: userGameList[i].game.owner.id,
      ownerUsername: userGameList[i].game.owner.username,
      ownerEmail: userGameList[i].game.owner.email,
    };
    gameObject.course = {
      courseName: userGameList[i].game.course.name,
      par: holeObjects,
      totalPar: par,
    };
    gameObject.players = playerObjects;
    //Push object onto array
    statsList.push(gameObject);
  }
  return statsList;
}
