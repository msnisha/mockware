import { IBodyPatternMatching, IMapping } from "./interface";

export const wireMockAdminEndPoint = "/json/";
export const pegaEndPoint = "/json/";

export const mappingEndPoint = wireMockAdminEndPoint + "mappings.json";
const persistMappingEndPoint = wireMockAdminEndPoint + "mappings/save.json"

const nearMissEndPoint = wireMockAdminEndPoint + "near-misses/request-pattern";

export const requestsEndPoint = wireMockAdminEndPoint + "requests.json";
export const unmatchedReqEndPoint = wireMockAdminEndPoint + "unmatched.json";

const getAppDataEndPoint = pegaEndPoint + "D_MockwareSettings.json";

const getAvailableConnectorsEndPoint = pegaEndPoint + "D_AvailableConnectors.json";
export const getSimulatedConnectorsEndPoint = pegaEndPoint + "D_SimulatedConnectors.json";
const getConnectorDetailsEndPoint = pegaEndPoint + "D_GetConnectorDetails.";
const updateMockSettingEndPoint = pegaEndPoint + "D_UpdateMockSetting.json";


export const pegaCredentials = {
  username: "",
  password: ""
};

export const pegaAuthHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa(pegaCredentials.username + ":" + pegaCredentials.password),
  };
};

export const fetchMappings = (after: Function, error: Function) => {
  fetch(mappingEndPoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((result) => after(result.mappings))
    .catch((err) => error(err));
};

export const saveMappings = (
  after: Function,
  error: Function,
  mapping: IMapping
) => {
  let endPoint = mappingEndPoint;
  let method = "GET";
  if (mapping.uuid !== "") {
    endPoint = endPoint + "/" + mapping.uuid;
    method = "GET";
  }
  fetch(endPoint, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(getMappingBody(mapping)),
  })
    .then((result) => result.json())
    .then((result) => after(result))
    .catch((err) => error(err));
};

export const persistMappings = () => {
  let endPoint = persistMappingEndPoint;
  fetch(endPoint, {
    method: 'GET',
  })
    .then(() => console.log("Saved"))
    .catch((err) => console.log('Failed to persist saved records'));
};

//__admin/mappings/save

export const deleteMappings = (
  after: Function,
  error: Function,
  mapping: IMapping
) => {
  fetch(mappingEndPoint + "/" + mapping.uuid, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(after())
    .catch((err) => error(err));
};



export const fetchMissRequestForStub = (
  after: Function,
  error: Function,
  mapping: IMapping,
) => {
  let requestBody: {
    method: string,
    url?: string,
    urlPath?: string,
    urlPathPattern?: string,
  } = {
    method: mapping.request.method,

  };

  if (mapping.request.urlPath) {
    requestBody.url = mapping.request.urlPath;
  } else if (mapping.request.urlPathPattern) {
    requestBody.url = mapping.request.urlPathPattern;
  }
  fetch(nearMissEndPoint, {
    method: "GET",
    // body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((result) => after(result.nearMisses))
    .catch((err) => error(err));
};

export const fetchRequests = (after: Function, error: Function) => {
  let date = new Date();
  date.setHours(date.getHours() - 24);
  fetch(requestsEndPoint + "?since=" + date.toISOString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((result) => after(result.requests))
    .catch((err) => error(err));
};

export const fetchAvailableConnectors = (
  after: Function,
  error: Function,
  name?: string
) => {
  fetch(getAvailableConnectorsEndPoint + (name ? "?Name=" + name : ""), {
    method: "GET",
    headers: pegaAuthHeaders(),
  })
    .then((result) => result.json())
    .then((result) => after(result.pxResults))
    .catch((err) => error(err));
};


export const fetchAppConfig = (
  after: Function,
  error: Function,
) => {
  fetch(getAppDataEndPoint, {
    method: "GET",
    headers: pegaAuthHeaders(),
  }).then((result) => result.json())
    .then((result) => after(result))
    .catch((err) => error(err));
};



export const fetchConnectorDetails = (
  after: Function,
  error: Function,
  clasName: string,
  serviceName: string
) => {
  fetch(
    getConnectorDetailsEndPoint +
    serviceName +
    ".json",
    {
      method: "GET",
      headers: pegaAuthHeaders(),
    }
  )
    .then((result) => result.json())
    .then((result) => after(result))
    .catch((err) => error(err));
};

export const updateMockSetting = (
  after: Function,
  error: Function,
  clasName: string,
  serviceName: string,
  action: string,
  scope: string,
  uuid?: string
) => {
  fetch(
    updateMockSettingEndPoint +
    "?pyClassName=" +
    clasName +
    "&pyServiceName=" +
    serviceName +
    "&action=" +
    action +
    "&scope=" +
    scope +
    "&uuid=" +
    uuid,
    {
      method: "GET",
      headers: pegaAuthHeaders(),
    }
  )
    .then((result) => result.json())
    .then((result) => after(result.mappings))
    .catch((err) => error(err));
};

export const cryb53 = function (str: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0) + "";
};

export const getMappingBody = (mapping: IMapping) => {
  let mappingBody: any = {
    id: mapping.id,
    uuid: mapping.uuid,
    metadata: mapping.metadata,
    priority: mapping.priority,
    request: {
      method: mapping.request.method,
      queryParameters: {},
      headers: {},
      bodyPatterns: [],
    },
    response: {
      body: mapping.response.body,
      headers: {

      },
      status: mapping.response.status,
      fixedDelayMilliseconds: mapping.response.fixedDelayMilliseconds,
    },
  };

  mapping.metadata.respHeaderParams.forEach((each) => {
    mappingBody.response.headers[each.pyParameterName] = each.matchValue;
  });

  let baseURL = "";
  let URLMatchingType = "urlPath";
  mapping.metadata.pathParams.forEach((each, index) => {
    baseURL += "/" + each.matchValue;
    if (each.matchType === "pattern") {
      URLMatchingType = "urlPathPattern";
    }
  });
  mappingBody.request[URLMatchingType] = baseURL;


  mapping.metadata.queryParams.forEach((element) => {
    if (element.matchType === "pattern") {
      mappingBody.request.queryParameters[element.pyParameterName] = {
        matches: element.matchValue,
      };
    } else if (element.matchType === "equals") {
      mappingBody.request.queryParameters[element.pyParameterName] = {
        equalTo: element.matchValue,
      };
    }
  });

  mapping.metadata.headerParams.forEach((element) => {
    if (element.matchType === "pattern") {
      mappingBody.request.headers[element.pyParameterName] = {
        matches: element.matchValue,
      };
    } else if (element.matchType === "equals") {
      mappingBody.request.headers[element.pyParameterName] = {
        equalTo: element.matchValue,
      };
    } else if (element.matchType === "contains") {
      mappingBody.request.headers[element.pyParameterName] = {
        contains: element.matchValue,
      };
    }
  });

  if (mapping.request.method !== "GET") {
    mapping.metadata.bodyParams.forEach((element) => {
      if (element.matchField !== "") {
        let match: IBodyPatternMatching = {
          matchesJsonPath: {
            expression: element.matchField,
            contains: element.matchValue,
          },
        };
        // match.matchesJsonPath.equalToJson[element.matchField] = element.matchValue;
        mappingBody.request.bodyPatterns.push(match);
      }
    });
  }

  return mappingBody;
};


export const getRelativeTime = (time: string) => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  let elapsed = Date.now() - +(new Date(time));

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  }

  else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  }

  else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  }

  else if (elapsed < msPerMonth) {
    return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
  }

  else if (elapsed < msPerYear) {
    return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
  }

  else {
    return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
  }

}

//save to cookie function
export const saveToCookie = (key: string, value: string) => {
  let date = new Date();
  date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
  let expires = "; expires=" + date.toUTCString();
  document.cookie = key + "=" + (value || "") + expires + "; path=/";
}

//remove from cookie function
export const removeFromCookie = (key: string) => {
  document.cookie = key + '=; Max-Age=-99999999;';
}

//read from cookie function
export const readFromCookie = (key: string) => {
  let nameEQ = key + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}