import React from "react";
import { createRoot } from "react-dom/client";

export const createContainer = () => {
  const container = document.createElement("div");

  return {
    container,
    render: (component) => {
      const root = createRoot(container);
      React.act(() => root.render(component));
    },
  };
};
