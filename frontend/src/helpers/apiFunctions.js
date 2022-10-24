export const saveData = async (apiEndpoint, data) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const dataToSend = {
    data: data,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: headers,
  };

  return fetch(apiEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getData = async (apiEndpoint) => {
  console.log("Fetching data...");

  const options = {
    method: "GET",
  };

  return fetch(apiEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const updateData = async (apiEndpoint, data) => {
  console.log("Updating data...");

  const headers = new Headers();

  headers.append("Content-Type", "application/json");

  const dataToSend = {
    data: data,
  };

  const options = {
    method: "PATCH",
    body: JSON.stringify(dataToSend),
    headers: headers,
  };

  return fetch(apiEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
