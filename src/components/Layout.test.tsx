import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";

/**
 * Round-2 contract: route changes animate in via a `.page-in` wrapper keyed
 * to the pathname (hash-only updates must NOT remount — anchor scroll relies
 * on the existing effect).
 */
function StubPage({ to }: { to: string }) {
  return <Link to={to}>navigate-{to}</Link>;
}

function renderLayout(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<StubPage to="/elsewhere" />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("Layout route transition wrapper", () => {
  it("wraps page content in a page-in container tagged with the pathname", () => {
    renderLayout("/about");
    const container = screen.getByTestId("page-container");
    expect(container).toHaveClass("page-in");
    expect(container).toHaveAttribute("data-route", "/about");
  });

  it("re-keys the container on navigation so the entrance animation replays", async () => {
    const user = userEvent.setup();
    renderLayout("/one");
    expect(screen.getByTestId("page-container")).toHaveAttribute("data-route", "/one");
    await user.click(screen.getByRole("link", { name: "navigate-/elsewhere" }));
    expect(screen.getByTestId("page-container")).toHaveAttribute("data-route", "/elsewhere");
    expect(screen.getByTestId("page-container")).toHaveClass("page-in");
  });
});
