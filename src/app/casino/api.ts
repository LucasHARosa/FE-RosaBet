import { CasinoHighglihts, CasinoI } from "@/interfaces/casino";

export const getHighlight = async (): Promise<CasinoHighglihts[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const response = await fetch(`${baseUrl}/casino/games_type`, {
    next: {
      revalidate: 60,
      tags: ["casino_highlight"],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
};

export const filterByType = async (type: string): Promise<CasinoI[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const response = await fetch(`${baseUrl}/casino/games?type=${type.toUpperCase()}`, {
    next: {
      revalidate: 60 * 10,
      tags: [`casino_${type}`],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
};
