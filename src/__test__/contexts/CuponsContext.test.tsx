import React from "react";
import { act, renderHook } from "@testing-library/react";
import { CuponsProvider, useCupons } from "@/contexts/CuponsContext";
import { SportsCupons } from "@/interfaces/cupons";
import { GameProps, OddProps } from "@/interfaces/game";
import { StorageContext } from "@/contexts/StorageContext";

jest.mock("@/service/bet", () => ({
  betCoupon: jest.fn(),
}));

const mockBetCoupon = require("@/service/bet").betCoupon;

jest.mock("@/service/socket", () => ({
  createWebSocket: jest.fn().mockReturnValue({
    addEventListener: jest.fn(),
    readyState: WebSocket.OPEN,
    close: jest.fn(),
  }),
  handleAction: jest.fn(),
  onOpen: jest.fn(),
  onMessage: jest.fn(),
  onError: jest.fn(),
  closeWS: jest.fn(),
}));

const { createWebSocket } = require("@/service/socket");

// Mock functions for StorageContext
const mockSetStorage = jest.fn();
const mockGetStorage = jest.fn();
const mockRemoveStorage = jest.fn();
const mockClearStorage = jest.fn();

const mockStorageContextValue = {
  setStorage: mockSetStorage,
  getStorage: mockGetStorage,
  removeStorage: mockRemoveStorage,
  clearStorage: mockClearStorage,
};

describe("CuponsContext", () => {
  beforeEach(() => {
    jest.clearAllMocks;
  });

  const wrapperWithStorageContext = ({ children }: { children: React.ReactNode }) => (
    <StorageContext.Provider value={mockStorageContextValue}>
      <CuponsProvider>{children}</CuponsProvider>
    </StorageContext.Provider>
  );

  test("should initialize with no cupons and value display 0.00", () => {
    mockGetStorage.mockReturnValue(null);

    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    expect(result.current.cupons.length).toBe(0);
    expect(result.current.valueDisplay).toBe("0.00");
  });

  test("should add a cupon", () => {
    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    act(() => {
      result.current.addSportCupons({
        enet_code: "1",
        hash: "123",
        market: { odd: 2.0 },
      } as SportsCupons);
    });
    expect(result.current.cupons.length).toBe(1);
    expect(mockSetStorage).toHaveBeenCalledWith("cupons", JSON.stringify(result.current.cupons));
  });

  test("should not add a cupon with the same enet_code", () => {
    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    act(() => {
      result.current.addSportCupons({
        enet_code: "1",
        hash: "123",
        market: { odd: 2.0 },
      } as SportsCupons);
    });
    act(() => {
      result.current.addSportCupons({
        enet_code: "1",
        hash: "121",
        market: { odd: 2.0 },
      } as SportsCupons);
    });
    expect(result.current.cupons.length).toBe(1);
    expect(mockSetStorage).toHaveBeenCalledWith("cupons", JSON.stringify(result.current.cupons));
  });

  test("should remove event with the same hash", () => {
    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    act(() => {
      result.current.addSportCupons({
        enet_code: "1",
        hash: "123",
        market: { odd: 2.0 },
      } as SportsCupons);
    });
    act(() => {
      result.current.addSportCupons({
        enet_code: "1",
        hash: "123",
        market: { odd: 2.0 },
      } as SportsCupons);
    });
    expect(result.current.cupons.length).toBe(0);
    expect(mockSetStorage).toHaveBeenCalledWith("cupons", JSON.stringify(result.current.cupons));
  });

  test("should not add more than 12 events", () => {
    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    for (let i = 0; i < 13; i++) {
      act(() => {
        result.current.addSportCupons({
          enet_code: i.toString(),
          hash: i.toString(),
          market: { odd: 2.0 },
        } as SportsCupons);
      });
    }
    expect(result.current.cupons.length).toBe(12);
    expect(mockSetStorage).toHaveBeenCalledWith("cupons", JSON.stringify(result.current.cupons));
  });

  test("should remove a cupon", () => {
    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    act(() => {
      result.current.addSportCupons({
        enet_code: "1",
        hash: "123",
        market: { odd: 2.0 },
      } as SportsCupons);
    });
    expect(result.current.cupons.length).toBe(1);
    act(() => {
      result.current.removeSportCupons({ enet_code: "1" } as SportsCupons);
    });
    expect(result.current.cupons.length).toBe(0);
    expect(mockSetStorage).toHaveBeenCalledWith("cupons", JSON.stringify(result.current.cupons));
  });

  test("should clear all cupons", () => {
    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    act(() => {
      result.current.addSportCupons({
        enet_code: "1",
        hash: "123",
        market: { odd: 2.0 },
      } as SportsCupons);
    });
    act(() => {
      result.current.addSportCupons({
        enet_code: "2",
        hash: "122",
        market: { odd: 2.0 },
      } as SportsCupons);
    });
    expect(result.current.cupons.length).toBe(2);
    act(() => {
      result.current.clearCupons();
    });
    expect(result.current.cupons.length).toBe(0);
    expect(result.current.valueDisplay).toBe("0,00");
    expect(mockSetStorage).toHaveBeenCalledWith("cupons", "[]");
  });

  test("should change the value display", () => {
    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    act(() => {
      result.current.changeValueCupom("10,00");
    });
    expect(result.current.valueDisplay).toBe("10,00");
  });

  test("should load cupons from storage on initialization", () => {
    const storedCupons = [
      { enet_code: "1", hash: "123", market: { odd: 2.0 }, last_update: "", flag_local_storage: null },
      { enet_code: "2", hash: "124", market: { odd: 2.5 }, last_update: "", flag_local_storage: null},
    ];
    mockGetStorage.mockReturnValue(storedCupons);

    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    expect(result.current.cupons).toEqual(storedCupons);
  });

  test("should save cupons to storage when added", () => {
    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    act(() => {
      result.current.addSportCupons({
        enet_code: "1",
        hash: "123",
        market: { odd: 2.0 },
      } as SportsCupons);
    });

    expect(mockSetStorage).toHaveBeenCalledWith("cupons", JSON.stringify(result.current.cupons));
  });

  test("should clear cupons from storage when clearCupons is called", () => {
    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    act(() => {
      result.current.addSportCupons({
        enet_code: "1",
        hash: "123",
        market: { odd: 2.0 },
      } as SportsCupons);
    });

    act(() => {
      result.current.clearCupons();
    });

    expect(mockSetStorage).toHaveBeenCalledWith("cupons", "[]");
  });

  // Teste para verificar se a função onSubmit chama a função betCoupon corretamente
  test("should call betCoupon on onSubmit", async () => {
    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    act(() => {
      result.current.addSportCupons({
        enet_code: "1",
        hash: "123",
        market: { odd: 2.0 },
      } as SportsCupons);
    });

    await act(async () => {
      await result.current.onSubmit("better", true);
    });

    expect(mockBetCoupon).toHaveBeenCalled();
  });

  // Teste para verificar se a função onSubmit limpa os cupons após a aposta ser feita
  test("should clear cupons after bet is placed", async () => {
    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    act(() => {
      result.current.addSportCupons({
        enet_code: "1",
        hash: "123",
        market: { odd: 2.0 },
      } as SportsCupons);
    });

    await act(async () => {
      await result.current.onSubmit("better", true);
    });

    expect(result.current.cupons.length).toBe(0);
  });

  // test("should reopen WebSocket connection when cupon is added after removing all", () => {
  //   const mockWebSocket = {
  //     addEventListener: jest.fn(),
  //     close: jest.fn(),
  //     readyState: WebSocket.OPEN,
  //   };
  //   createWebSocket.mockReturnValueOnce(mockWebSocket);

  //   const { result } = renderHook(() => useCupons(), {
  //     wrapper: wrapperWithStorageContext,
  //   });

  //   act(() => {
  //     result.current.addSportCupons({
  //       enet_code: "1",
  //       hash: "123",
  //       market: { odd: 2.0 },
  //     } as SportsCupons);
  //   });

  //   act(() => {
  //     result.current.removeSportCupons({ enet_code: "1" } as SportsCupons);
  //   });

  //   expect(mockWebSocket.close).toHaveBeenCalled();

  //   act(() => {
  //     result.current.addSportCupons({
  //       enet_code: "2",
  //       hash: "456",
  //       market: { odd: 2.5 },
  //     } as SportsCupons);
  //   });

  //   expect(createWebSocket).toHaveBeenCalledWith("events_sports_markets");
  //   jest.restoreAllMocks();
  // });

  test("should create WebSocket connection when cupon is added", () => {
    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    act(() => {
      result.current.addSportCupons({
        enet_code: "1",
        hash: "123",
        market: { odd: 2.0 },
      } as SportsCupons);
    });

    expect(createWebSocket).toHaveBeenCalledWith("events_sports_markets");
    jest.restoreAllMocks();
  });

  // Teste para verificar se a conexão WebSocket é fechada ao remoVer todos os cupons

  test("should verify odd availability correctly returning true", () => {
    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    expect(
      result.current.oddAvailable(
        { active: true, odd: 1.5 } as OddProps,
        { active: true, status: "active" } as GameProps,
      ),
    ).toBe(true);
  });

  test("should verify odd availability correctly returning false", () => {
    const { result } = renderHook(() => useCupons(), {
      wrapper: wrapperWithStorageContext,
    });

    expect(
      result.current.oddAvailable(
        { active: true, odd: 1.5 } as OddProps,
        { active: false, status: "active" } as GameProps,
      ),
    ).toBe(false);
  });
});
