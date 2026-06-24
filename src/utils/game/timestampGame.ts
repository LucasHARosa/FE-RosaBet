import { GameProps } from "@/interfaces/game";

export const getFormattedGameTime = ({ match_status, last_update, played_time }: GameProps) => {
  let formattedTime = "";

  if (played_time === "90:00") {
    return "90:00+";
  } else if(/^\d(st|nd|rd|th) half$/.test(match_status)) {
    const quarterMatch = match_status.match(/^\d/);
    const quarterNumber = quarterMatch ? quarterMatch[0] : "";
    formattedTime += `${quarterNumber}º | `;
  } else if (match_status === "Halftime") {
    return "Intervalo";
  } else if (match_status === "Finished") {
    return "Finalizado";
  } else if(/^\d(st|nd|rd|th) quarter$/.test(match_status)) {
    const quarterMatch = match_status.match(/^\d/);
    const quarterNumber = quarterMatch ? quarterMatch[0] : "";
    formattedTime += `Q${quarterNumber} | `;
  } else if(/^\d(st|nd|rd|th) set$/.test(match_status)) {
    const quarterMatch = match_status.match(/^\d/);
    const quarterNumber = quarterMatch ? quarterMatch[0] : "";
    formattedTime += `${quarterNumber} set `;
  }

  if(!played_time) 
    return formattedTime;

  const lastUpdate = new Date(last_update).getTime();
  const now: number = new Date().getTime();
  const diffInSeconds = Math.floor((now - lastUpdate) / 1000);
  
    
  const [minutes, seconds] = played_time.split(":").map(Number);
  const tInSeconds = (minutes * 60) + seconds;

  const totalTimeInSeconds = tInSeconds + diffInSeconds;

  const newMinutes = Math.floor(totalTimeInSeconds / 60);
  const newSeconds = Math.floor(totalTimeInSeconds % 60);

  formattedTime += `${String(newMinutes).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;

  return formattedTime;
};