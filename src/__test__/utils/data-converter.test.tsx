import { dateConverter, hourConverter } from "@/utils/data-converter";

describe("dateConverter", () => {
  test('should return "HH:mm" for the current date', () => {
    const today = new Date().toISOString();
    const hours = new Date().getHours().toString().padStart(2, "0");
    const minutes = new Date().getMinutes().toString().padStart(2, "0");
    expect(dateConverter(today)).toBe(`Hoje às ${hours}h${minutes}`);
  });

  test('should return "Amanhã às HH:mm" for tomorrow\'s date', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const hours = tomorrow.getHours().toString().padStart(2, "0");
    const minutes = tomorrow.getMinutes().toString().padStart(2, "0");
    const tomorrowString = tomorrow.toISOString();
    expect(dateConverter(tomorrowString)).toBe(`Amanhã às ${hours}h${minutes}`);
  });

  test("should return formatted date for a past date", () => {
    const date = "2023-07-12T22:00";
    expect(dateConverter(date)).toBe("12/07/2023 às 22h00");
  });

  test('should return "Data inválida" for an invalid date', () => {
    expect(dateConverter("invalid-date")).toBe("Data inválida");
  });
});

describe("hourConverter", () => {
  test("should return formatted time for a valid date string", () => {
    const date = "2023-01-01T15:30:00";
    expect(hourConverter(date)).toBe("15h30");
  });

  test('should return "Data inválida" for an invalid date', () => {
    expect(hourConverter("invalid-date")).toBe("Data inválida");
  });
});
