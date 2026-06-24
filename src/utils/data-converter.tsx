import notifyPopup from "./toast";

export function dateConverter(dateString: string, locale: string = "pt-BR"): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  const today = new Date();
  const yersterday = new Date(today);
  const tomorrow = new Date(today);
  yersterday.setDate(today.getDate() - 1);
  tomorrow.setDate(today.getDate() + 1);

  const formattedDate = date.toLocaleDateString(locale);

  const formattedToday = today.toLocaleDateString(locale);
  const formattedYersterday = yersterday.toLocaleDateString(locale);
  const formattedTomorrow = tomorrow.toLocaleDateString(locale);

  if (formattedDate === formattedToday) return `Hoje às ${hourConverter(dateString)}`;
  if (formattedDate === formattedYersterday) return `Ontem às ${hourConverter(dateString)}`;
  if (formattedDate === formattedTomorrow) return `Amanhã às ${hourConverter(dateString)}`;
  return `${formattedDate} às ${hourConverter(dateString)}`;
}

export function dateAndHourConverter(dateString: string, locale: string = "pt-BR"): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const formattedDate = date.toLocaleDateString(locale);
  const formattedToday = today.toLocaleDateString(locale);
  const formattedTomorrow = tomorrow.toLocaleDateString(locale);

  if (formattedDate === formattedToday) return `Hoje às ${hourConverter(dateString)}`;
  if (formattedDate === formattedTomorrow) return `Amanhã às ${hourConverter(dateString)}`;
  return `${formattedDate} às ${hourConverter(dateString)}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function hourConverter(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}h${minutes}`;
}

export function currencyConverter(value: number): string {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format(value).replace("R$", "").trim();
}

export async function copyURL(copy: string) {
  try {
    await navigator.clipboard.writeText(copy);
    notifyPopup("Link copiado para a área de transferência", "success");
  } catch (error) {
    console.error("Error copying text: ", error);
    notifyPopup("Erro ao copiar o link para a área de transferência", "error");
  }
}
