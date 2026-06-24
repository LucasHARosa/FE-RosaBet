"use client";
import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function ReactPortal({ containerId = "portal-root", children }: ReactPortal) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let portalContainer = document.getElementById(containerId);

    if (!portalContainer) {
      portalContainer = document.createElement("div");
      portalContainer.setAttribute("id", containerId);
      document.body.appendChild(portalContainer);
    }

    setContainer(portalContainer);
  }, [containerId]);

  if (!container) return null;

  return ReactDOM.createPortal(children, container);
}

interface ReactPortal {
  containerId: string;
  children: ReactNode;
}

// interface ReactPortalProps {
//   children: ReactNode;
//   containerId?: string;
// }
