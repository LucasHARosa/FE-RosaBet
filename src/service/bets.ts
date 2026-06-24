import { fetcher } from "@/hooks/useMiddleware";
import { MyBetsAll } from "@/interfaces/bet";

const urlRoute = "/bet";

const getBetsAll = async (queryParams: UseMyBetsProps) => {
  let url = `${urlRoute}`;
  // const yesterday = new Date();
  // yesterday.setDate(yesterday.getDate() - 3);
  if (queryParams) {
    url += `?initialDate=${queryParams.startDate}&finalDate=${queryParams.endDate}&user=&status=${queryParams.status}`;
  }

  const response = await fetcher({
    url,
    method: "GET",
    cache: "default",
  });
  return response as MyBetsAll[];
};

const getBetsDetails = async (id: string) => {
  const response = await fetcher({
    url: `${urlRoute}/${id}`,
    method: "GET",
    cache: "default",
  });

  return response;
};

const cashout = async (id: string, cashout_value: number) => {
  const response = await fetcher({
    url: `${urlRoute}/${id}/cashout`,
    method: "PUT",
    cache: "default",
    data: { cashout_value },
  });

  return response;
};

export { cashout, getBetsAll, getBetsDetails };

interface UseMyBetsProps {
  startDate: string;
  endDate: string;
  status: string;
}
