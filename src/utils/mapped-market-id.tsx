import { Sport } from '@/interfaces/sport';
import marketData from '../components/market/mappers.json';

export const translateMarket = (marketId: string) => {
  const translateMarket = marketData.market_descriptions.market.find((market) => market.id === marketId);
  if(!translateMarket) return 'Market not found';
  return translateMarket.name;
}

export const translateOdd = (marketId: string, oddId: string, oddHash: string, game: Sport) => {
  const translateMarket = marketData.market_descriptions.market.find((market) => market.id === marketId);
  if(!translateMarket) return 'Market not found';
  const market = translateMarket.outcomes?.outcome;
  console.log(market);
  const data = market && Array.isArray(market);
  if (!data) return 'Odd market not mapped';
  
  const mkt = (market as { id: string; name: string; }[])
      .filter((i: any) => i.id === oddId)[0].name
      .replaceAll("{$competitor1}", game.sport.home_team)
      .replaceAll("{$competitor2}", game.sport.out_team);

  if (!mkt) return 'Odd not found';
  
  return replacePlaceholders(mkt, oddHash);;
}

const replacePlaceholders = (b: string, c: string) => {
  const placeholderPattern = /\{(\w+)=([^\}]+)\}/;
  const match = c.match(placeholderPattern);

  if (!match) return b;

  const placeholderName = match[1];
  const placeholderValue = match[2];

  const regex = new RegExp(`\\{${placeholderName}\\}`, 'g');
  return b.replace(regex, placeholderValue);
}

export const translateMarketAndOption = (hash: string, home_team: string, out_team: string) => {
  const matchM = hash.match(/m-(\d+)/);
  const matchO = hash.match(/o-(\d+)/);

  const marketId = matchM ? matchM[1] : 'Not Found';
  const optionId = matchO ? matchO[1] : null;

  const translateMarket = marketData.market_descriptions.market.find((market) => market.id === marketId);

  const market = translateMarket?.outcomes?.outcome;

  const mkt = (market as { id: string; name: string; }[])
      .filter((i: any) => i.id === optionId)[0].name
      .replaceAll("{$competitor1}", home_team)
      .replaceAll("{$competitor2}", out_team);

  return {
    market: translateMarket?.name || 'Market not found',
    odd: replacePlaceholders(mkt, hash) || 'Odd market not mapped'
  }
};