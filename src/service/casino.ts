import { fetcher } from "@/hooks/useMiddleware";

const gameUrl = async (symbol: string) => {
  const response = await fetcher({
    url: "/pragmatic/game-url",
    method: "POST",
    cache: "default",
    data: {
      symbol: symbol,
    },
  });

  return response;
};

export { gameUrl };
