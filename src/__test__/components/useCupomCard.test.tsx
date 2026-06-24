import { renderHook, act } from "@testing-library/react";

import { CuponsContext, CuponsContextProps } from "@/contexts/CuponsContext";
import { SportsCupons } from "@/interfaces/cupons";
import React from "react";
import useCardCupom from "@/components/card/cupom/useCupomCard";

const mockSportCupon: SportsCupons = {
  __t: "soccer",
  enet_code: "123",
  hash: "abc",
  last_update: "",
  active: true,
  status: "active",
  championship: "Championship",
  country: "Country",
  date: new Date().toISOString(),
  home_team: "Home Team",
  out_team: "Out Team",
  home_coats_of_arms_link: "",
  out_coats_of_arms_link: "",
  is_live: false,
  name_market: "Market Name",
  market_id: "Market ID",
  available: true,
  flag_local_storage: null,
  market: {
    active: true,
    hash: "marketHash",
    name: "Market Name",
    odd: 1.5,
    optionId: "optionId",
    timestamp: Date.now(),
  },
  valid_odds: 0,
  championship_en: "",
  country_en: "",
  home_score: 0,
  last_event: "",
  match_status: "",
  markets: undefined,
  away_score: 0,
  played_time: "",
  reduced_markets: [],
  sendToFrontDate: 0,
  srLastDate: 0,
  srReceiveDate: 0,
  _id: {
    date: 0,
    timestamp: ""
  }
};

const mockRemoveSportCupons = jest.fn();

const mockContextValue: CuponsContextProps = {
  cupons: [],
  addSportCupons: jest.fn(),
  removeSportCupons: mockRemoveSportCupons,
  clearCupons: jest.fn(),
  changeValueCupom: jest.fn(),
  onSubmit: jest.fn(),
  oddAvailable: jest.fn(),
  valueDisplay: "",
  testOnReceivedMessage: jest.fn(),
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CuponsContext.Provider value={mockContextValue}>{children}</CuponsContext.Provider>
);

describe("useCardCupom", () => {
  test("should return loading as true when last_update is null", () => {
    const { result } = renderHook(() => useCardCupom(mockSportCupon), {
      wrapper,
    });
    expect(result.current.loading).toBe(true);
  });

  test("should return loading as false when last_update is defined", () => {
    const updatedMockSportCupon = {
      ...mockSportCupon,
      last_update: new Date().toISOString(),
    };
    const { result } = renderHook(() => useCardCupom(updatedMockSportCupon), {
      wrapper,
    });
    expect(result.current.loading).toBe(false);
  });

  test("should return OddState as live when is_live is true", () => {
    const liveMockSportCupon = { ...mockSportCupon, is_live: true };
    const { result } = renderHook(() => useCardCupom(liveMockSportCupon), {
      wrapper,
    });
    expect(result.current.OddState()).toBe("live");
  });

  test("should return OddState as pre when event date is today", () => {
    const todayMockSportCupon = {
      ...mockSportCupon,
      date: new Date().toISOString(),
    };
    const { result } = renderHook(() => useCardCupom(todayMockSportCupon), {
      wrapper,
    });
    expect(result.current.OddState()).toBe("pre");
  });

  test("should return OddState as none for other dates", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureMockSportCupon = {
      ...mockSportCupon,
      date: futureDate.toISOString(),
    };
    const { result } = renderHook(() => useCardCupom(futureMockSportCupon), {
      wrapper,
    });
    expect(result.current.OddState()).toBe("none");
  });

  test("should return OddAvailable based on sport available", () => {
    const { result } = renderHook(() => useCardCupom(mockSportCupon), {
      wrapper,
    });
    expect(result.current.OddAvailable).toBe(mockSportCupon.available);
  });

  test("should call removeSportCupons on handleRemove", () => {
    const { result } = renderHook(() => useCardCupom(mockSportCupon), {
      wrapper,
    });
    act(() => {
      result.current.handleRemove();
    });
    expect(mockRemoveSportCupons).toHaveBeenCalledWith(mockSportCupon);
  });
});
