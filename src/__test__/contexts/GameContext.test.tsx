import { GameContext, GameProvider } from "@/contexts/GameContext";
import { createWebSocket } from "@/service/socket";
import { render, screen } from "@testing-library/react";
import React, { act, useContext } from "react";
import { GameProps } from "@/interfaces/game";

jest.mock("@/service/socket", () => ({
  createWebSocket: jest.fn(),
  handleAction: jest.fn(),
  onMessage: jest.fn(),
  onError: jest.fn(),
  onOpen: jest.fn(),
  closeWS: jest.fn(),
}));

const mockWebSocket = {
  close: jest.fn(),
  send: jest.fn(),
  readyState: WebSocket.OPEN,
};
(createWebSocket as jest.Mock).mockReturnValue(mockWebSocket);

describe("GameContext - onReceivedMessage", () => {
  const TestComponent = () => {
    const { categorySports, testOnReceivedMessage } = useContext(GameContext);
    return (
      <div>
        <div data-testid="live-games">{JSON.stringify(categorySports?.live)}</div>
        <div data-testid="prematch-games">{JSON.stringify(categorySports?.prematch)}</div>
        <button
          onClick={() =>
            testOnReceivedMessage &&
            testOnReceivedMessage([
              { enet_code: "1", is_live: true, home_team: "Live Game 1" },
              { enet_code: "2", is_live: false, home_team: "Prematch Game 1" },
            ] as GameProps[])
          }
        >
          Test onReceivedMessage
        </button>
        <button onClick={() => testOnReceivedMessage && testOnReceivedMessage([])}>
          Test onReceivedMessage with empty list
        </button>
      </div>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize categorySports with empty arrays", () => {
    render(
      <GameProvider>
        <TestComponent />
      </GameProvider>,
    );

    expect(screen.getByTestId("live-games").textContent).toBe("");
    expect(screen.getByTestId("prematch-games").textContent).toBe("");
  });

  it("should update categorySports with live and prematch games", () => {
    render(
      <GameProvider>
        <TestComponent />
      </GameProvider>,
    );

    act(() => {
      screen.getByText("Test onReceivedMessage").click();
    });

    expect(screen.getByTestId("live-games").textContent).toBe(
      JSON.stringify([{ enet_code: "1", is_live: true, home_team: "Live Game 1" }]),
    );
    expect(screen.getByTestId("prematch-games").textContent).toBe(
      JSON.stringify([{ enet_code: "2", is_live: false, home_team: "Prematch Game 1" }]),
    );
  });

  it("should handle receiving an empty list of games", () => {
    render(
      <GameProvider>
        <TestComponent />
      </GameProvider>,
    );

    act(() => {
      screen.getByText("Test onReceivedMessage with empty list").click();
    });

    expect(screen.getByTestId("live-games").textContent).toBe("[]");
    expect(screen.getByTestId("prematch-games").textContent).toBe("[]");
  });
});
