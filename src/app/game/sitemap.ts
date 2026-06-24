// app/games/sitemap.ts

import { MetadataRoute } from 'next';

interface Game {
  enet_code: string;
  date: string; // ou 'Date', dependendo do formato retornado por 'sportsEstatic'
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sport/open`)
    const games: Game[] = await response.json()
    
    const urls: MetadataRoute.Sitemap = games.map(game => ({
      url: `${process.env.NEXT_WEBSITE_URL}game/${game.enet_code.split(':')[2]}`,
      lastModified: new Date(game.date),
      changeFrequency: 'hourly',
      priority: 0.7,
    }));
    //console.log("sitemap", urls)
    return urls;
  }
  catch (error) {
    console.error("Erro ao buscar os jogos para o sitemap", error)
  }


  return [
    {
      url: `${process.env.NEXT_WEBSITE_URL}game`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },

  ];

}
