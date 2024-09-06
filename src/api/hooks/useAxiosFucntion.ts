
import { useEffect, useState } from "react";
import { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router";

interface ConfigObject {
  axiosInstance: AxiosInstance;
  url: string;
  method: string;
  requestConfig?: AxiosRequestConfig;
}

// configObj: ConfigObject
const useAxiosFucntion = (): [AxiosResponse<any> | null, AxiosError<any> | string, boolean, (configObj: ConfigObject) => Promise<void>] => {

  const [response, setResponse] = useState<AxiosResponse<any> | null>(null);
  const [errorMsg, setErrorMsg] = useState<AxiosError<any> | string>('');
  const [requestLoading, setRequestLoading] = useState<boolean>(false);
  const [controller, setController] = useState<any>()
  const navigate = useNavigate()

// const axiosRequestFucntion = async(configObj: ConfigObject) => {
//   const {
//     axiosInstance,
//     url,
//     method,
//     requestConfig = {}
//   } = configObj;

//   console.log('requestConfig', requestConfig);
  

//   try {
//     setRequestLoading(true);
//     const ctrl = new AbortController()
//     setController(ctrl);
//     const res = await (method.toLowerCase() === 'get' ? axiosInstance.get(url, {
//       ...requestConfig,
//       signal: ctrl.signal
//     }) :
//     method.toLowerCase() === 'post' ? axiosInstance.post(url, {}, {
//       ...requestConfig,
//       signal: ctrl.signal
//     }) :
//     method.toLowerCase() === 'put' ? axiosInstance.put(url, {}, {
//       ...requestConfig,
//       signal: ctrl.signal
//     }) :
//     method.toLowerCase() === 'delete' ? axiosInstance.delete(url, {
//       ...requestConfig,
//       signal: ctrl.signal
//     }) : null);
   

//     if(res?.data){
//       setResponse(res);
//     }
//   } catch (error: any) {
//     console.log('error from axios hook', error);

//     setRequestLoading(false);
//     setErrorMsg(error instanceof Error ? error.message : 'An error occurred');
//     if(error){
//         if(error?.name === "AxiosError"){
//             if(error?.response?.status === 401){
//                 localStorage.removeItem('authToken');
//                 navigate('/login')
//             }
//         }
//     }
//   } finally {
//     setRequestLoading(false);
//   }
// }
const axiosRequestFucntion = async (configObj: ConfigObject) => {
  const {
    axiosInstance,
    url,
    method,
    requestConfig = {}
  } = configObj;

  try {
    setRequestLoading(true);
    const ctrl = new AbortController();
    setController(ctrl);

    // Construct the request config object with data if available
    const requestData = method.toLowerCase() === 'get' ? null : requestConfig.data;
    const config = {
      ...requestConfig,
      signal: ctrl.signal,
      data: requestData
    };

    // Call the appropriate Axios method based on the request method
    const res = await (method.toLowerCase() === 'get' ? axiosInstance.get(url, config) :
      method.toLowerCase() === 'post' ? axiosInstance.post(url, requestData, config) :
      method.toLowerCase() === 'put' ? axiosInstance.put(url, requestData, config) :
      method.toLowerCase() === 'delete' ? axiosInstance.delete(url, config) : null);

    if (res?.data) {
      setResponse(res);
    }
  } catch (error: any) {
    console.log('error from axios hook', error);
    setRequestLoading(false);
    setErrorMsg(error instanceof Error ? error.message : 'An error occurred');

    // Handle unauthorized error (401) by redirecting to the login page
    if (error?.name === "AxiosError" && error?.response?.status === 401) {
      localStorage.removeItem('authToken');
      navigate('/login');
    }
  } finally {
    setRequestLoading(false);
  }
};

  useEffect(() => {
   console.log('controller', controller);
    // useEffect cleanup function.
    return () => controller && controller.abort();
  }, [controller]);

  return [response, errorMsg, requestLoading, axiosRequestFucntion];
};

export default useAxiosFucntion;
