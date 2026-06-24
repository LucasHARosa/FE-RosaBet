import { SidebarProvider, useMenuBar } from "@/contexts/SidebarContext";
import { render, act } from "@testing-library/react";

import React from "react";

// Componente de Teste
const TestComponent = () => {
  const { openSideBar, setOpenSideBar } = useMenuBar();
  return (
    <div>
      <span data-testid="sidebar-status">{openSideBar.toString()}</span>
      <button data-testid="toggle-sidebar" onClick={() => setOpenSideBar(!openSideBar)}>
        Toggle Sidebar
      </button>
    </div>
  );
};

describe("MenuContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should initialize with sidebar closed", () => {
    const { getByTestId } = render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>,
    );
    expect(getByTestId("sidebar-status").textContent).toBe("false");
  });

  test("should toggle sidebar status", () => {
    const { getByTestId } = render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>,
    );

    act(() => {
      getByTestId("toggle-sidebar").click();
    });
    expect(getByTestId("sidebar-status").textContent).toBe("true");

    act(() => {
      getByTestId("toggle-sidebar").click();
    });
    expect(getByTestId("sidebar-status").textContent).toBe("false");
  });

  test("should save sidebar status to localStorage", () => {
    const { getByTestId } = render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>,
    );

    act(() => {
      getByTestId("toggle-sidebar").click();
    });
    expect(localStorage.getItem("isOpenSideBar")).toBe("true");

    act(() => {
      getByTestId("toggle-sidebar").click();
    });
    expect(localStorage.getItem("isOpenSideBar")).toBe("false");
  });

  test("should initialize sidebar status from localStorage", () => {
    localStorage.setItem("isOpenSideBar", "true");
    const { getByTestId } = render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>,
    );
    expect(getByTestId("sidebar-status").textContent).toBe("true");
  });
});
