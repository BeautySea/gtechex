import { useEffect, useState } from "react";
import {  AxiosResponse, AxiosError, AxiosRequestConfig, AxiosInstance } from "axios";
import { useNavigate } from "react-router";

interface ConfigObject {
  axiosInstance: AxiosInstance;
  url: string;
  method: string;
  requestConfig?: AxiosRequestConfig;
}

const useAxios = (configObj: ConfigObject): [AxiosResponse<any> | null, AxiosError<any> | string, boolean, () => void] => {
  const {
    axiosInstance,
    url,
    method,
    requestConfig = {}
  } = configObj;

  const [response, setResponse] = useState<AxiosResponse<any> | null>(null);
  const [errorMsg, setErrorMsg] = useState<AxiosError<any> | string>('');
  const [requestLoading, setRequestLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState(0)
  const navigate = useNavigate()

  const refreshFucntion = () => {
    setRefresh((prev) => prev + 1)
    console.log('refreshing...');
  }

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        // Call the axiosInstance method directly instead of using bracket notation
        const res = await (method.toLowerCase() === 'get' ? axiosInstance.get(url, {
          ...requestConfig,
          signal: controller.signal
        }) :
        method.toLowerCase() === 'post' ? axiosInstance.post(url, {}, {
          ...requestConfig,
          signal: controller.signal
        }) :
        method.toLowerCase() === 'put' ? axiosInstance.put(url, {}, {
          ...requestConfig,
          signal: controller.signal
        }) :
        method.toLowerCase() === 'delete' ? axiosInstance.delete(url, {
          ...requestConfig,
          signal: controller.signal
        }) : null);
        if(res?.data){
          setResponse(res?.data);
        }
      } catch (error: any) {

        setErrorMsg(error instanceof Error ? error.message : 'An error occurred');
        if(error){
          if(error?.name === "AxiosError"){
              if(error?.response?.status === 401){
                  localStorage.removeItem('authToken');
                  navigate('/login')
              }
          }
      }
      } finally {
        setRequestLoading(false);
      }
    };
    fetchData();

    // useEffect cleanup function.
    return () => controller.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return [response, errorMsg, requestLoading, refreshFucntion];
};

export default useAxios;
