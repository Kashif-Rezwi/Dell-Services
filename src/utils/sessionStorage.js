function setSessionData(key, data) {
  // Convert the data to a JSON string before storing
  const dataString = JSON.stringify(data);

  // Store the data in session storage
  sessionStorage.setItem(key, dataString);
}

function getSessionData(key) {
  // Retrieve the data from session storage
  const dataString = sessionStorage.getItem(key);

  // Parse the JSON string back to an object
  return JSON.parse(dataString);
}

function removeSessionData(key) {
  // Remove the data from session storage
  sessionStorage.removeItem(key);
}

export default { setSessionData, getSessionData, removeSessionData };
