import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

function renderHeader(initialRoute = "/") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Header />
    </MemoryRouter>,
  );
}

describe("Header", () => {
  it("toggle aria-expanded reflects the mobile drawer state", async () => {
    const user = userEvent.setup();
    renderHeader();
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();
  });

  it("closes the mobile drawer when tapping a link to the current route", async () => {
    const user = userEvent.setup();
    renderHeader("/");
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("navigation", { name: "Mobile" });
    // Same-route tap: pathname never changes, so a pathname-only effect cannot close it.
    await user.click(within(drawer).getByRole("link", { name: "Home" }));
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  });

  it("closes the mobile drawer when navigating to a different route", async () => {
    const user = userEvent.setup();
    renderHeader("/");
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("navigation", { name: "Mobile" });
    await user.click(within(drawer).getByRole("link", { name: "News & Events" }));
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  });

  it("Escape closes the mobile drawer", async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  });

  it("marks the active top-level link with aria-current=page", () => {
    renderHeader("/news-events");
    const link = screen.getByRole("link", { name: "News & Events" });
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("marks a dropdown parent as current when a child route is active", () => {
    renderHeader("/history");
    const aboutTrigger = screen.getByRole("button", { name: /About/i });
    expect(aboutTrigger).toHaveAttribute("aria-current", "true");
    expect(aboutTrigger.className).toMatch(/text-shrine-gold-300/);
  });

  it("hamburger toggle meets the 44px minimum touch target", () => {
    renderHeader();
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle.className).toMatch(/h-11/);
    expect(toggle.className).toMatch(/w-11/);
  });

  it("renders the gold scroll-progress rail inside the header", () => {
    renderHeader();
    const rail = screen.getByTestId("scroll-progress");
    expect(rail).toHaveAttribute("aria-hidden", "true");
  });

  it("drawer marks the active leaf link with aria-current and gold highlight", async () => {
    const user = userEvent.setup();
    renderHeader("/serve");
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("navigation", { name: "Mobile" });
    const serveLink = within(drawer).getByRole("link", { name: "Serve" });
    expect(serveLink).toHaveAttribute("aria-current", "page");
    expect(serveLink.className).toMatch(/text-shrine-gold-300/);
  });

  it("drawer marks a parent section current when a child route is active", async () => {
    const user = userEvent.setup();
    renderHeader("/history");
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("navigation", { name: "Mobile" });
    const aboutToggle = within(drawer).getByRole("button", { name: /About/i });
    expect(aboutToggle).toHaveAttribute("aria-current", "true");
    expect(aboutToggle.className).toMatch(/text-shrine-gold-300/);
  });

  it("drawer items enter with a staggered animation", async () => {
    const user = userEvent.setup();
    renderHeader("/");
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("navigation", { name: "Mobile" });
    const items = within(drawer).getAllByRole("listitem");
    expect(items.length).toBeGreaterThan(2);
    expect(items[0]!).toHaveClass("drawer-item-in");
    expect(items[0]!).toHaveStyle({ animationDelay: "0ms" });
    expect(items[1]!).toHaveClass("drawer-item-in");
    expect(items[1]!).toHaveStyle({ animationDelay: "40ms" });
  });
});
