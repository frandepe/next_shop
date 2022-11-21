import useSWR, { SWRConfiguration } from "swr";
import { IProduct } from "../interfaces";

// const fetcher = (...args: [key: string]) =>
//   fetch(...args).then((res) => res.json());

//* <T> le indicamos que es de tipo generico como si le pasaramos el typescript por parametro
//* en el componente padre lo escribiriamos <IProduct>
export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IProduct[]>(`/api${url}`, config);

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
