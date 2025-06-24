import type { UseQueryResult } from "@tanstack/react-query";
import { privateRequest } from "../lib/axios";
import { useDataQuery } from "./useDataQuery";
import PlaceIcon from "@mui/icons-material/Place";

export interface LocationOption {
  label: string;
  entityId: string;
  skyId: string;
  actualName?: string;
  subtitle?: string;
  children?: LocationOption[];
  icon?: React.ReactNode;
}

function useSearchAirport(name: string): {
  airports: UseQueryResult<any[], unknown>;
} {
  const airports = useDataQuery<any[]>({
    queryKey: ["searchAirports", name],
    queryFn: async () => {
      try {
        const { data } = await privateRequest.get<{
          status: boolean;
          timestamp: string;
          data: any[];
        }>(`/v1/flights/searchAirport?query=${name}&locale=en-US`);

        if (!data.status) return [];
        const formattedData = data.data?.map(
          (item) =>
            ({
              label: item?.presentation?.suggestionTitle,
              subtitle: `City in ${item?.presentation?.subtitle}`,
              actualName: item?.presentation?.title,
              entityId: item?.navigation?.entityId,
              skyId: item?.navigation?.relevantFlightParams?.skyId,
              icon: <PlaceIcon fontSize="small" />,
            } as LocationOption)
        );

        return formattedData;
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
      return [];
    },
  });

  return {
    airports,
  };
}

export default useSearchAirport;
