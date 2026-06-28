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
  const data = market && Array.isArray(market);
  if (!data) return 'Odd market not mapped';

  const found = (market as { id: string; name: string; }[]).find((i: any) => i.id === oddId);
  if (!found) return oddId || 'Odd not found';

  const mkt = found.name
      .replaceAll("{$competitor1}", game.sport.home_team)
      .replaceAll("{$competitor2}", game.sport.out_team);

  return replacePlaceholders(mkt, oddHash);
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
  // Backend sends hash as "{market_id}::{option_id}", e.g. "1::1", "1::X", "5::total=2.5:over"
  const sepIndex = hash.indexOf('::');
  const marketId = sepIndex >= 0 ? hash.slice(0, sepIndex) : hash;
  const optionPart = sepIndex >= 0 ? hash.slice(sepIndex + 2) : null;

  // For specifier format "total=2.5:over", the option_id is after the last ":"
  const optionId = optionPart
    ? (optionPart.includes(':') ? optionPart.split(':').pop()! : optionPart)
    : null;

  const foundMarket = marketData.market_descriptions.market.find((market) => market.id === marketId);
  const market = foundMarket?.outcomes?.outcome;

  let oddName = optionId || 'Indefinido';
  if (market && Array.isArray(market) && optionId) {
    const found = (market as { id: string; name: string; }[]).find((i: any) => i.id === optionId);
    if (found) {
      oddName = found.name
        .replaceAll("{$competitor1}", home_team)
        .replaceAll("{$competitor2}", out_team);
      oddName = replacePlaceholders(oddName, hash);
    }
  }

  return {
    market: foundMarket?.name || 'Market not found',
    odd: oddName,
  }
};