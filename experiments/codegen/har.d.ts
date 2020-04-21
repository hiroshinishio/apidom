/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface NameValue {
  name?: string;
  value?: string;
  comment?: string;
  [k: string]: any;
};

export type Headers = NameValue[]

export interface Entry {
  pageref?: string;
  startedDateTime?: string;
  time?: number;
  /**
   * Monitored request
   */
  request?: Request;
  /**
   * Monitored Response.
   */
  response?: Response;
  /**
   * Info about a response coming from the cache.
   */
  cache?: {
    /**
     * Info about cache entry.
     */
    beforeRequest?: {
      expires?: string;
      lastAccess?: string;
      eTag?: string;
      hitCount?: number;
      comment?: string;
      [k: string]: any;
    };
    /**
     * Info about cache entry.
     */
    afterRequest?: {
      expires?: string;
      lastAccess?: string;
      eTag?: string;
      hitCount?: number;
      comment?: string;
      [k: string]: any;
    };
    comment?: string;
    [k: string]: any;
  };
  /**
   * Info about request-response timing.
   */
  timings?: {
    dns?: number;
    connect?: number;
    blocked?: number;
    send?: number;
    wait?: number;
    receive?: number;
    ssl?: number;
    comment?: string;
    [k: string]: any;
  };
  serverIPAddress?: string;
  connection?: string;
  comment?: string;
  [k: string]: any;
}
export interface Response {
  status?: number;
  statusText?: string;
  httpVersion?: string;
  cookies?: {
    name?: string;
    value?: string;
    path?: string;
    domain?: string;
    expires?: string;
    httpOnly?: boolean;
    secure?: boolean;
    comment?: string;
    [k: string]: any;
  }[];
  headers?: Headers;
  /**
   * Response content
   */
  content?: {
    size?: number;
    compression?: number;
    mimeType?: string;
    text?: string;
    encoding?: string;
    comment?: string;
    [k: string]: any;
  };
  redirectURL?: string;
  headersSize?: number;
  bodySize?: number;
  comment?: string;
  [k: string]: any;
}

export interface Request {
  method?: string;
  url?: string;
  httpVersion?: string;
  cookies?: {
    name?: string;
    value?: string;
    path?: string;
    domain?: string;
    expires?: string;
    httpOnly?: boolean;
    secure?: boolean;
    comment?: string;
    [k: string]: any;
  }[];
  headers?: Headers;
  queryString?: {
    name?: string;
    value?: string;
    comment?: string;
    [k: string]: any;
  }[];
  /**
   * Posted data info.
   */
  postData?: {
    mimeType?: string;
    text?: string;
    params?: NameValue[];
    comment?: string;
    [k: string]: any;
  };
  headersSize?: number;
  bodySize?: number;
  comment?: string;
  [k: string]: any;
}

export interface HAR {
  /**
   * HTTP Archive structure.
   */
  log?: {
    /**
     * HAR format version
     */
    version?: string;
    /**
     * Name and version info of the log creator app.
     */
    creator?: {
      name?: string;
      version?: string;
      comment?: string;
      [k: string]: any;
    };
    /**
     * Name and version info of used browser.
     */
    browser?: {
      name?: string;
      version?: string;
      comment?: string;
      [k: string]: any;
    };
    /**
     * Exported web page
     */
    pages?: {
      startedDateTime?: string;
      id?: string;
      title?: string;
      /**
       * Timing info about page load
       */
      pageTimings?: {
        onContentLoad?: number;
        onLoad?: number;
        comment?: string;
        [k: string]: any;
      };
      comment?: string;
      [k: string]: any;
    };
    /**
     * Request and Response related info
     */
    entries?: Entry[];
    [k: string]: any;
  };
  [k: string]: any;
}
