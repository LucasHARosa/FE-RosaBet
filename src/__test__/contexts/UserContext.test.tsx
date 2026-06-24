import React from "react";
import { renderHook, act } from "@testing-library/react";
import { UserI } from "@/interfaces/user";
import { UserContext, UserProvider } from "@/contexts/UserContext";
import { StorageContext } from "@/contexts/StorageContext";

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

// Mock external dependencies
jest.mock("@/components/modal/login");
jest.mock("@/hooks/encodeJWT");
jest.mock("@/service/auth", () => ({
  me: jest.fn(),
  checkStatusEmail: jest.fn().mockResolvedValue({ is_confirmed: false }),
  resendCode: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));
jest.mock("@/service/notification", () => ({
  notifications: jest.fn(),
}));

const mockMe = require("@/service/auth").me;
const mockNotifications = require("@/service/notification").notifications;

describe("UserContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapperWithStorageContext = ({ children }: { children: React.ReactNode }) => (
    <StorageContext.Provider value={mockStorageContextValue}>
      <UserProvider>{children}</UserProvider>
    </StorageContext.Provider>
  );

  test("should initialize with no user and isAuthenticaded false", async () => {
    mockGetStorage.mockReturnValue(null);

    const { result } = await act(async () =>
      renderHook(() => React.useContext(UserContext), {
        wrapper: wrapperWithStorageContext,
      }),
    );

    expect(result.current.getUser).toEqual({} as UserI);
    expect(result.current.isAuthenticaded).toBe(false);
  });

  test("should initialize with user from storage", async () => {
    const userMock = {
      name: "User Test",
      token: "123",
      cpf: "12345678900",
      messagesUnread: 0,
      email_confirmation: { is_confirmed: true },
    };
    mockGetStorage.mockReturnValue(JSON.stringify(userMock));
    mockMe.mockResolvedValue(userMock);
    mockNotifications.mockResolvedValue([]);

    const { result } = await act(async () =>
      renderHook(() => React.useContext(UserContext), {
        wrapper: wrapperWithStorageContext,
      }),
    );

    await act(async () => {
      await result.current.refreshUser();
    });

    expect(result.current.getUser).toEqual(userMock);
    expect(result.current.isAuthenticaded).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  test("should handle user data correctly", async () => {
    const userMock = {
      name: "User Test",
      token: "123",
      cpf: "12345678900",
      email_confirmation: { is_confirmed: true },
    };

    const { result } = await act(async () =>
      renderHook(() => React.useContext(UserContext), {
        wrapper: wrapperWithStorageContext,
      }),
    );

    await act(async () => {
      result.current.handleUser(userMock as UserI);
    });

    expect(result.current.getUser).toEqual(userMock);
    expect(result.current.isAuthenticaded).toBe(true);
    expect(mockSetStorage).toHaveBeenCalledWith("user", JSON.stringify(userMock));
  });

  test("should handle token correctly", async () => {
    const token = "123";

    const { result } = await act(async () =>
      renderHook(() => React.useContext(UserContext), {
        wrapper: wrapperWithStorageContext,
      }),
    );

    await act(async () => {
      result.current.handleToken(token);
    });

    expect(mockSetStorage).toHaveBeenCalledWith("token", JSON.stringify(token));
  });

  test("should refresh user and set unread messages correctly", async () => {
    const userMock = {
      name: "User Test",
      token: "123",
      cpf: "12345678900",
      email_confirmation: { is_confirmed: true },
    };
    const notificationsMock = [{ status: "UNREAD" }, { status: "READ" }, { status: "UNREAD" }];

    mockMe.mockResolvedValue(userMock);
    mockNotifications.mockResolvedValue(notificationsMock);

    const { result } = await act(async () =>
      renderHook(() => React.useContext(UserContext), {
        wrapper: wrapperWithStorageContext,
      }),
    );

    await act(async () => {
      await result.current.refreshUser();
    });

    expect(result.current.getUser).toEqual({
      ...userMock,
      messagesUnread: 2,
    });
    expect(result.current.isAuthenticaded).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  test("should handle error in refreshUser and stop loading", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    mockMe.mockRejectedValue(new Error("Failed to fetch user"));
    mockNotifications.mockRejectedValue(new Error("Failed to fetch notifications"));

    const { result } = await act(async () =>
      renderHook(() => React.useContext(UserContext), {
        wrapper: wrapperWithStorageContext,
      }),
    );

    await act(async () => {
      await result.current.refreshUser();
    });

    expect(result.current.getUser).toEqual({} as UserI);
    expect(result.current.isAuthenticaded).toBe(false);
    expect(result.current.loading).toBe(false);

    consoleSpy.mockRestore();
  });

  test("should logout user and clear storage", async () => {
    const userMock = {
      name: "User Test",
      token: "123",
      cpf: "12345678900",
      email_confirmation: { is_confirmed: true },
    };
    const mockPush = jest.fn();
    require("next/navigation").useRouter.mockReturnValue({ push: mockPush });

    const { result } = await act(async () =>
      renderHook(() => React.useContext(UserContext), {
        wrapper: wrapperWithStorageContext,
      }),
    );

    await act(async () => {
      result.current.handleUser(userMock as UserI);
      result.current.logout();
    });

    expect(result.current.getUser).toEqual({} as UserI);
    expect(result.current.isAuthenticaded).toBe(false);
    expect(mockRemoveStorage).toHaveBeenCalledWith("user");
    expect(mockRemoveStorage).toHaveBeenCalledWith("token");
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
