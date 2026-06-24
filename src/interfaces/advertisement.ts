export interface Advertisement {
  _id: string;
  position: number;
  url: string;
  initial_date: string;
  final_date: string;
  img: string;
  device: "DESKTOP" | "MOBILE";
  type: string;
}
