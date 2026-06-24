import { MarketsSports } from "@/interfaces/cupons";
import pako from "pako";

export const decompressString = (compressed: string): MarketsSports[] => {
  try {
    const uint8Array = Uint8Array.from(atob(compressed), (c) => c.charCodeAt(0));
    const decompressed = pako.inflate(uint8Array, { to: "string" });
    return JSON.parse(decompressed);
  } catch (error) {
    console.error("Erro ao descomprimir a string:", error);
    return [];
  }
};
