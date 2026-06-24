"use client";
import { useEffect, useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import CardHighlight from "@/components/card/highlight";
import { HighlightI } from "@/interfaces/highlights";
import AliceCarousel from "react-alice-carousel";
import { BoxHighlight } from "./styles";
import { closeWS, createWebSocket, onError, onMessage, onOpen } from "@/service/socket";

export default function Highlights() {
  const [loading, setLoading] = useState(true);
  const [highlights, setHighlights] = useState<HighlightI>();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await signInAnonymously(auth);
  //       const dbRef = ref(database, "highlights");
  //       onValue(
  //         dbRef,
  //         (snapshot) => {
  //           if (snapshot.exists()) {
  //             console.log(snapshot.val());
  //             setHighlights(snapshot.val());
  //           } else {
  //             console.log("No data available");
  //           }
  //           setLoading(false);
  //         },
  //         (errorObject) => {
  //           console.log(errorObject.message);
  //           setLoading(false);
  //         },
  //       );
  //     } catch (err: any) {
  //       console.log(err.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    try {
      const ws = createWebSocket("highlights");
      onOpen(ws);
      onMessage(ws, (event) => {
        const games = JSON.parse(event);
        if(games) {
          setHighlights(games[0]);
        }
        
        setLoading(false);
      });

      onError(ws, () => {
        console.error("Erro ao conectar com o servidor");
        setLoading(false);
        
      });

      return () => {
        if (ws.readyState === WebSocket.OPEN) {
          closeWS(ws);
        }
      };
    } catch {
      console.error("Erro ao conectar com o servidor");
    }
  }, []);

  const items = highlights
    ? highlights.data?.map((highlight, item) => (
        <CardHighlight
          key={highlight._id}
          highlight={highlight}
          settings={highlights.settings}
          position={item}
        />
      ))
    : [];

  return (
    <BoxHighlight>
      {!loading && !!highlights && (
        <AliceCarousel
          autoHeight
          autoPlay
          autoPlayInterval={3000}
          infinite={false}
          mouseTracking
          items={items}
          autoWidth
          disableDotsControls
          disableButtonsControls
        />
      )}
    </BoxHighlight>
  );
}
