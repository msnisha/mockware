export interface IConnector {
  insKey: string;
  pyRuleName: string;
  pyRuleAvailable: string;
  pxInsName: string;
  pyClassName: string;
  isEnabled: true;
  pxPages: {
    Simulation: {
      pyRuleAvailable?: string;
    };
  };
}

export interface IConnectorDetails {
  insKey: string;
  pyRuleName: string;
  pyRuleAvailable: string;
  pxInsName: string;
  pyClassName: string;
  isEnabled: true;
  pyEmbeddedURL: {
    pyBaseURL: string;
    pyResourcePathParameters: Array<IRequestParamType>;
  };
  pyGETRequestParameters: Array<IRequestParamType>;
  pyPOSTRequestParameters: Array<IRequestParamType>;
  pyPUTRequestParameters: Array<IRequestParamType>;
  pyDELETERequestParameters: Array<IRequestParamType>;
  pyPATCHRequestParameters: Array<IRequestParamType>;

  pyGETRequestHeaders: Array<IRequestParamType>;
  pyPOSTRequestHeaders: Array<IRequestParamType>;
  pyPUTRequestHeaders: Array<IRequestParamType>;
  pyDELETERequestHeaders: Array<IRequestParamType>;
  pyPATCHRequestHeaders: Array<IRequestParamType>;

  pyGETResponseHeaders: Array<IRequestParamType>;
  pyPOSTResponseHeaders: Array<IRequestParamType>;
  pyPUTResponseHeaders: Array<IRequestParamType>;
  pyDELETEResponseHeaders: Array<IRequestParamType>;
  pyPATCHResponseHeaders: Array<IRequestParamType>;
}

export interface IRequestParamType {
  pyParameterName: string;
  pyMapFrom: string; //Clipboard
  pyMapFromKey: string;
  matchType?: string;
  matchValue?: string;
}

export interface IBodyMatchingType {
  matchType?: string;
  matchField?: string;
  matchValue?: string;
}

export interface IMapping {
  id: string;
  uuid: string;
  resourcePath?: string;
//   headers?: Array<IHeaderValue>;
  request: {
    method: string;
    bodyPatterns?: Array<IBodyPatternMatching>;
    urlPath?: string;
    urlPathPattern?: string;
  };
  response: {
    status: number;
    body: string;
    fixedDelayMilliseconds: number;
  };
  priority: number;
  metadata: {
    uniqueCode: string;
    name: string;
    url: string;
    pyClassName: string;
    pyRuleName: string;
    pathParams: Array<IRequestParamType>;
    queryParams: Array<IRequestParamType>;
    headerParams: Array<IRequestParamType>;
    respHeaderParams: Array<IRequestParamType>;
    bodyParams: Array<IBodyMatchingType>;
  };
}

export interface IBodyPatternMatching {
  matchesJsonPath: {
    expression?: string;
    contains?: string;
  };
}

export interface IRequest {
  id: string;
//   headers?: Array<IHeaderValue>;
wasMatched: boolean;
  request: {
    url: string;
    method: string;
    loggedDateString:string
  };
  responseDefinition: {
    status: number;
    body: string;
  };
  stubMapping: IMapping;
}

export interface IRequestForStub {
  id: string;
  headers?: Array<{
    [key: string]: string;
  }>;
  url: string;
  method: string;
}

export interface IAppConfig{
  Settings: {
    User: {
      Value: string;
    };
    Application: {
      Value: string;
    };
  };
}