const fetchData = async (endpoint, params, customHeaders) => {
  const headers = { ...customHeaders };
  const searchParams = Object.entries(params || {})
    .map((pair) => pair.map(encodeURIComponent).join("="))
    .join("&");

  const url = `${endpoint}?${searchParams}`;

  return fetch(url, { method: "GET", headers })
    .then((res) => res.json())
    .then((res) => {
      if (res.hasOwnProperty("statusCode")) {
        return { networkSuccess: false, ...res };
      } else {
        return { networkSuccess: true, res };
      }
    })
    .catch((e) => ({ networkSuccess: false }));
};

const postData = async (endpoint, body, customHeaders) => {
  let headers = { accept: "application/json", ...customHeaders };
  const url = `${endpoint}`;
  if (body) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.hasOwnProperty("statusCode")) {
        return { networkSuccess: false, ...res };
      } else {
        return { networkSuccess: true, data: res };
      }
    })
    .catch((e) => ({ networkSuccess: false }));
};

const rakURL = "https://chamber-test.com/ords/admin/";
// const rakURL = "https://151.253.107.165:8443/ords/admin/";

const postRAKData = async (method, endpoint, body, customHeaders) => {
  var base64 = require("base-64");
  let url = `${rakURL}${endpoint}`;

  let headers = { accept: "application/json" };
  if (body) {
    headers["Content-Type"] = "application/json";
  }
  // if (customHeaders) {
  headers["Authorization"] =
    "Basic " + base64.encode("eservice" + ":" + "Eservice@chamber!23");
  // }
  return fetch(url, {
    method: method,
    headers,
    body: body && JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => ({ networkSuccess: true, ...res }))
    .catch((e) => ({ networkSuccess: false }));
};

const getRAKData = async (endpoint, params, customHeaders) => {
  var base64 = require("base-64");
  const headers = {};
  if (!customHeaders) {
    headers["Authorization"] =
      "Basic " + base64.encode("eservice" + ":" + "Eservice@chamber!23");
  }
  const searchParams = Object.entries(params || {})
    .map((pair) => pair.map(encodeURIComponent).join("="))
    .join("&");

  const url = `${rakURL}${endpoint}?${searchParams}`;

  return fetch(url, { method: "GET", headers })
    .then((res) => res.json())
    .then((res) => ({ networkSuccess: true, ...res }))
    .catch((e) => ({ networkSuccess: false }));
};

// const rakServicesURL = "https://rakservices.ppro.ae/api/";
const rakServicesURL = "https://raksip.rak.ae/api/";

const postRakServicesData = async (endpoint, params, customHeaders) => {
  const searchParams = Object.entries(params || {})
    .map((pair) => pair.map(encodeURIComponent).join("="))
    .join("&");

  let url = `${rakServicesURL}${endpoint}?${searchParams}`;

  let headers = { accept: "application/json", ...customHeaders };
  headers["Content-Type"] = "application/x-www-form-urlencoded";

  var details = {
    APIKey:
      "4142436265376438373863323135373161326262333738396330656666396664646434434445",
    UserName: "wafaa@rakchamber.ae",
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return fetch(url, {
    method: "POST",
    headers,
    body: formBody,
  })
    .then((res) => res.json())
    .then((res) => ({ networkSuccess: true, ...res }))
    .catch((e) => ({ networkSuccess: false }));
};
const fetchBinaryData = async (endpoint, params, customHeaders) => {
  const headers = { ...customHeaders };
  const searchParams = Object.entries(params || {})
    .map((pair) => pair.map(encodeURIComponent).join("="))
    .join("&");

  const url = `${endpoint}?${searchParams}`;

  return fetch(url, { method: "GET", headers })
    .then((res) => {
      return res.blob();
    })
    .then((res) => {
      res = URL.createObjectURL(res);

      if (res.hasOwnProperty("statusCode")) {
        return { networkSuccess: false };
      } else {
        return res;
      }
    })
    .catch((e) => {
      return { networkSuccess: false };
    });
};

export {
  fetchData,
  postData,
  postRAKData,
  postRakServicesData,
  getRAKData,
  fetchBinaryData,
};
