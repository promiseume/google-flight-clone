import type { UseQueryResult } from "@tanstack/react-query";
import { privateRequest } from "../lib/axios";
import { useDataQuery } from "./useDataQuery";
import { useCallback, useEffect, useState } from "react";

export interface LocationOption {
  label: string;
  entityId: string;
  skyId: string;
  actualName?: string;
  subtitle?: string;
  children?: LocationOption[];
  icon?: React.ReactNode;
}

export interface FlightParams {
  originSkyId?: string;
  destinationSkyId?: string;
  originEntityId?: string;
  destinationEntityId?: string;
  date?: string;
  cabinClass?: string;
  adults?: string;
  sortBy?: string;
  currency?: string;
  market?: string;
  countryCode?: string;
}

function useSearchFlights(params: FlightParams) {
  //   const flights = useDataQuery<any[]>({
  //     queryKey: ["searchFlights", JSON.stringify(params)],
  //     queryFn: async () => {
  //       try {
  //         const strParams = Object.entries(params).reduce((acc, cur) => {
  //           if (cur[1]) {
  //             if (acc) acc += `${cur[0]}=${cur[1]}`;
  //             else acc += `?${cur[0]}=${cur[1]}`;
  //           }

  //           return acc;
  //         }, "");

  //         if (!strParams) return [];

  //         const url = `/v1/flights/searchFlights${strParams}`;

  //         console.log(params);

  //         if (
  //           params.originEntityId &&
  //           params.destinationEntityId &&
  //           params.originSkyId &&
  //           params.destinationSkyId &&
  //           params.date
  //         ) {
  //           const { data } = await privateRequest.get<{
  //             status: boolean;
  //             timestamp: string;
  //             data: any[];
  //           }>(url);

  //           console.log(data);
  //         }

  //         return [];
  //       } catch (error) {
  //         console.error("Error fetching flights:", error);
  //       }
  //       return [];
  //     },
  //   });

  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchIt = useCallback(async () => {
    try {
      const strParams = Object.entries(params).reduce((acc, cur) => {
        if (cur[1]) {
          if (acc) acc += `${cur[0]}=${cur[1]}`;
          else acc += `?${cur[0]}=${cur[1]}`;
        }

        return acc;
      }, "");

      if (!strParams) return;

      const url = `/v1/flights/searchFlights${strParams}`;

      console.log(params);
      console.log(url);

      if (
        params.originEntityId &&
        params.destinationEntityId &&
        params.originSkyId &&
        params.destinationSkyId &&
        params.date
      ) {
        const { data } = await privateRequest.get<any>(url);

        console.log(data);
        setData(data);
      }
    } catch (err) {
      setError(err as Error);
    }
  }, [params]);

  useEffect(() => {
    fetchIt();
  }, [fetchIt]);

  return { data, error, refetch: fetchIt };
}

export default useSearchFlights;
