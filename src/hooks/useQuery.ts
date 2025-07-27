import {useQuery} from "@tanstack/react-query";
import type {AxiosResponse} from "axios";
import api from "../api/api";

// Shape of the raw data from the backend
interface ApiResponseData {
  [date: string]: number; // { "2025-08-01": 90 }
}

// Shape of the data after it is transformed by the select function of useQuery
interface TransformedGraphData {
  clickDate: string;
  count: number;
}

export const useFetchTotalClicks = (token: string | null) => {
  return useQuery<ApiResponseData, Error, TransformedGraphData[], string[]>({
    queryKey: ["totalClicks"],
    queryFn: async () => {
      if (!token) throw new Error("Token not found.");

      // api call
      const response: AxiosResponse<ApiResponseData> = await api.get(
        "/api/urls/totalClicks?startDate=2025-01-01&endDate=2025-12-31",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data;
    },
    select: (data: ApiResponseData) => {
      const convertToArray: TransformedGraphData[] = Object.keys(data).map((key) => ({
        // before:
        // data =>
        //  {
        //     "2025-01-01": 80,
        //     "2025-01-02": 105,
        //     "2025-01-03": 140,
        //  };
        clickDate: key,
        count: data[key],
        // result:
        //   [
        //     { clickDate: "2025-01-01", count: 80 },
        //     { clickDate: "2025-01-02", count: 105 },
        //     { clickDate: "2025-01-03", count: 140 },
        //   ]
      }));

      return convertToArray;
    }, // data transformation
    staleTime: 5000, // cache data for 5 seconds
  });
};
