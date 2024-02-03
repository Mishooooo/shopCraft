import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useCustumSearchParam() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

     const params = new URLSearchParams(searchParams);
     
  const createQueryString = useCallback(
    (name, value) => {
 
      params.set(name, value);
      return params.toString();
    },
    []
  );

  const setQueryParam = (paramName, paramValue) => {
    const queryString = createQueryString(paramName, paramValue);
    router.push(pathname + "?" + queryString);
  };
  const deleteParam = (deleteSearchParam) => {
    params.delete(deleteSearchParam);
    const queryString = params.toString();

    router.push(pathname + "?" + queryString);
  };
  return {
    deleteParam,
    setQueryParam,
  };
}

