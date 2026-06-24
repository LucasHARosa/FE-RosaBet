export const getMappers = async (type: string) => {
  switch (type.toUpperCase()) {
    case "SOCCER": {
      const soccerModule = await import("./soccer");
      return {
        mappersNames: soccerModule.mappersNames,
        mappersMarkets: soccerModule.mappersMarkets,
      };
    }
    case "MMA": {
      const mmaModule = await import("./mma");
      return {
        mappersNames: mmaModule.mappersNames,
        mappersMarkets: mmaModule.mappersMarkets,
      };
    }
    default: {
      const defaultModule = await import("./default");
      return {
        mappersNames: defaultModule.mappersNames,
        mappersMarkets: defaultModule.mappersMarkets,
      };
    }
  }
};

export const mappersNames = (values: string, translateMarket: string) => {
  const valuesMap: Record<string, string> = {};

  // Remove as chaves externas e divide o conteúdo por vírgulas
  const valuesContent = values.slice(1, -1);
  const valuesArray = valuesContent.split(',');

  valuesArray.forEach((item: string) => {
    const [key, value] = item.split('=');
    if (key && value) {
      valuesMap[key.trim()] = value.trim();
    }
  });

  // Substitua as variáveis na string de template
  return translateMarket.replace(/{([^}]+)}/g, (_, variable) => {
    // Remove o prefixo de negação, se houver
    const cleanVariable = variable.replace(/^!/, '').trim();
    return valuesMap[cleanVariable] || '';
  });
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

export const getTitle = (odd: any, market: any, game: any) => {
  const data = market && Array.isArray(market);
  if (data) {
    const mkt = (market as { id: string; name: string; }[])
      .filter((i: any) => i.id === (odd.optionId.split(":").pop() || odd.optionId))[0]?.name
      .replaceAll("{$competitor1}", game.home_team)
      .replaceAll("{$competitor2}", game.out_team);
    
    if(!mkt) return odd.name;

    return replacePlaceholders(mkt, odd.hash);
  }
  return odd.name;
};