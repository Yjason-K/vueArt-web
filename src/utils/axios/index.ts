import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface InstanceParam {
  baseURL: string;
  auth?: boolean;
}

export const createAxiosInstance = ({
  baseURL,
  auth = false,
}: InstanceParam) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: { 'Content-type': 'application/json' },
  });

  // @25.4.20 임시 auth unused vars
  console.log('auth', auth);

  // instance.interceptors.request.use(() => {
  //   if (auth) {
  // const token = userStore.getState().data?.token;
  // const userId = userStore.getState().data?.userId;
  // if (!token || !userId) {
  //   throw new Error(
  //     `Require Auth Infomation - token : ${token} / userId : ${userId}`,
  //   );
  // }
  // 사용자 토큰이 필요한 경우 header 등록
  // 토큰을 받아오는 로직은 정의 필요 ( localStorage, store, etc ... )
  // config.headers.Authorization = `Bearer ${token}`;
  // config.headers['accessToken'] = miraeAuth ? miraeAuth.token : token;
  // config.headers['userId'] = miraeAuth ? miraeAuth.userId : userId;
  //   return config;
  // } else {
  //   delete config.headers['accessToken'];
  // }
  // return config;
  // }
  // });

  // status가 200인 경우에만 response 반환
  instance.interceptors.response.use((res) => {
    if (res.status === 200) {
      return res;
    } else {
      // 200이 아닌 경우 오류 처리
      return Promise.reject(new Error('Status is not 200'));
    }
  });

  /**
   *  set axios request URL
   *  -- encodeURIComponent 만 처리하는 경우, 특정 특수문자 사용 시 네트워크 에러 발생
   *  1. % (percent) -> 인코딩 없이 사용 가능
   *  2. / (slash) -> %2f (%2F 대문자 사용 불가)
   *  3. \ (back slash) -> %5c (%5C 대문자 사용 불가)
   *
   *  @param endpoint main axios request URL
   *  @param subUrl sub paths separated by slash (ex. 'id/name' -> ['id', 'name'])
   **/
  function setAxiosUrl(endpoint: string, subUrl?: string[]): string {
    if (subUrl && subUrl.length > 0) {
      const encodeSubUrl = subUrl
        .map((url) => {
          const replacedStr = String(url)
            .replace(/\//g, '%2f')
            .replace(/\\/g, '%5c');
          return encodeURIComponent(replacedStr);
        })
        .join('/');
      return `${endpoint}/${encodeSubUrl}`.replace(/\/{2,}/g, '/');
    } else {
      return endpoint;
    }
  }
  /**
   * HTTP GET Method
   * <pre>
   *   - RequestURL   : ${serverUrl}/${baseUrl}/${pathVariable}?${config.params}
   *   - Content-type : application/json
   * </pre>
   * @param endpoint endpoint
   * @param {string[]} pathVariable paths separated by slash
   * @param config
   * @return {AxiosResponse<T>} AxiosResponse
   */
  const get = async <T>(
    endpoint: string,
    pathVariable?: string[],
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    // <T> 제네릭 타입 명시
    const url = setAxiosUrl(endpoint, pathVariable);
    return instance.get<T>(url, config);
  };
  /**
   * HTTP POST Method
   * <pre>
   *   - RequestURL : ${serverUrl}/${baseUrl}/${pathVariable}
   *   - RequestBody : ${data}
   *   - Content-type : application/json
   * </pre>
   * @param endpoint endpoint
   * @param {string[]} pathVariable paths separated by slash
   * @param data requestBody
   * @param config
   * @return {AxiosResponse<T>} AxiosResponse.data
   */
  const post = async <T>(
    endpoint: string,
    pathVariable?: string[],
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    // <T> 제네릭 타입 명시
    const url = setAxiosUrl(endpoint, pathVariable);
    return instance.post<T>(url, data, config);
  };

  /**
   * HTTP PUT Method
   * <pre>
   *   - RequestURL : ${serverUrl}/${baseUrl}/${pathVariable}
   *   - RequestBody : ${data}
   *   - Content-type : application/json
   * </pre>
   * @param endpoint endpoint
   * @param {string[]} pathVariable paths separated by slash
   * @param data requestBody
   * @param config
   * @return {AxiosResponse<T>} AxiosResponse
   */
  const put = async <T>(
    endpoint: string,
    pathVariable?: string[],
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    const url = setAxiosUrl(endpoint, pathVariable);
    return instance.put<T>(url, data, config);
  };

  /**
   * HTTP PATCH Method
   * <pre>
   *   - RequestURL : ${serverUrl}/${baseUrl}/${pathVariable}
   *   - RequestBody : ${data}
   *   - Content-type : application/json
   * </pre>
   * @param endpoint endpoint
   * @param {string[]} pathVariable paths separated by slash
   * @param data requestBody
   * @param config
   * @return {AxiosResponse<T>} AxiosResponse
   */
  const patch = async <T>(
    endpoint: string,
    pathVariable?: string[],
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    const url = setAxiosUrl(endpoint, pathVariable);
    return instance.patch<T>(url, data, config);
  };

  /**
   * HTTP DELETE Method
   * <pre>
   *   - RequestURL : ${serverUrl}/${baseUrl}/${pathVariable}
   *   - Content-type : application/json
   * </pre>
   * @param endpoint endpoint
   * @param {string[]} pathVariable paths separated by slash
   * @param config
   * @return {AxiosResponse<T>} AxiosResponse
   */
  const remove = async <T>(
    endpoint: string,
    pathVariable?: string[],
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    const url = setAxiosUrl(endpoint, pathVariable);
    return instance.delete<T>(url, config);
  };

  return { instance, get, post, put, patch, remove };
};
