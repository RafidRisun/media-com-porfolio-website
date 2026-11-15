import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Navigation } from "@/components/navigation";

const route = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));

let visibilityCallback: IntersectionObserverCallback | undefined;

function setHeroVisible(visible: boolean) {
  const title = document.getElementById("hero-title")!;
  const rect = title.getBoundingClientRect();
  act(() => visibilityCallback?.([{
    target: title,
    isIntersecting: visible,
    intersectionRatio: visible ? 1 : 0,
    boundingClientRect: rect,
    intersectionRect: visible ? rect : new DOMRect(),
    rootBounds: null,
    time: performance.now(),
  }], {} as IntersectionObserver));
}

function HomeNavigation({ showHero = true }: { showHero?: boolean }) {
  return <><Navigation name="Zannatul Urmi" />{showHero && <h1 id="hero-title">Hero title</h1>}</>;
}

beforeEach(() => {
  route.pathname = "/";
  visibilityCallback = undefined;
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { visibilityCallback = callback; }
    observe() {}
    disconnect() {}
  });
});

afterEach(() => vi.unstubAllGlobals());

describe("adaptive navigation", () => {
  it("keeps the brand out of the tab order while the Home hero is visible", async () => {
    const user = userEvent.setup();
    render(<HomeNavigation />);
    setHeroVisible(true);
    expect(screen.queryByRole("link", { name: "Zannatul Urmi" })).not.toBeInTheDocument();
    await user.tab();
    expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();
  });

  it("reveals the home link after the hero leaves and hides it when the hero returns", () => {
    render(<HomeNavigation />);
    setHeroVisible(false);
    expect(screen.getByRole("link", { name: "Zannatul Urmi" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Zannatul Urmi" })).toHaveAttribute("tabindex", "0");
    setHeroVisible(true);
    expect(screen.queryByRole("link", { name: "Zannatul Urmi" })).not.toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  });

  it("moves focus to the visible Home link when the focused brand collapses", async () => {
    const user = userEvent.setup();
    render(<HomeNavigation />);
    setHeroVisible(false);
    await user.tab();
    expect(screen.getByRole("link", { name: "Zannatul Urmi" })).toHaveFocus();
    setHeroVisible(true);
    expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();
    expect(screen.queryByRole("link", { name: "Zannatul Urmi" })).not.toBeInTheDocument();
  });

  it.each(["/works", "/works/photography-2", "/contact"])("shows the brand on %s without a hero", (pathname) => {
    route.pathname = pathname;
    render(<Navigation name="Zannatul Urmi" />);
    expect(screen.getByRole("link", { name: "Zannatul Urmi" })).toHaveAttribute("href", "/");
    const activeLink = pathname.startsWith("/works") ? "Works" : "Contact";
    expect(screen.getByRole("link", { name: activeLink })).toHaveAttribute("aria-current", "page");
  });

  it("returns to the centered state when navigating back to the Home hero", () => {
    route.pathname = "/works";
    const { rerender } = render(<HomeNavigation showHero={false} />);
    expect(screen.getByRole("link", { name: "Zannatul Urmi" })).toBeInTheDocument();
    route.pathname = "/";
    rerender(<HomeNavigation />);
    setHeroVisible(true);
    expect(screen.queryByRole("link", { name: "Zannatul Urmi" })).not.toBeInTheDocument();
    setHeroVisible(false);
    expect(screen.getByRole("link", { name: "Zannatul Urmi" })).toBeInTheDocument();
  });
});
