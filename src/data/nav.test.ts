import { describe, expect, it } from "vitest";
import { footerNav, primaryNav } from "@/data/nav";

describe("nav", () => {
  it("primaryNav has 6 top-level items", () => {
    expect(primaryNav).toHaveLength(6);
  });

  it("exactly 3 primaryNav items have children with descriptions (About, Worship, Ministries)", () => {
    const withChildren = primaryNav.filter((item) => item.children && item.children.length > 0);
    expect(withChildren).toHaveLength(3);
    expect(withChildren.map((i) => i.label).sort()).toEqual(
      ["About", "Ministries", "Worship"].sort(),
    );
    for (const item of withChildren) {
      for (const child of item.children!) {
        expect(child.description).toBeDefined();
        expect(child.description!.length).toBeGreaterThan(0);
      }
    }
  });

  it("all nav links have label and to (including children)", () => {
    for (const item of primaryNav) {
      expect(item.label.length).toBeGreaterThan(0);
      expect(item.to.length).toBeGreaterThan(0);
      if (item.children) {
        for (const child of item.children) {
          expect(child.label.length).toBeGreaterThan(0);
          expect(child.to.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("Worship children tos are hash-anchored correctly", () => {
    const worship = primaryNav.find((n) => n.label === "Worship");
    expect(worship).toBeDefined();
    expect(worship!.children!.map((c) => c.to)).toEqual([
      "/worship#mass",
      "/worship#confession",
      "/worship#visit",
    ]);
  });

  it("Ministries children tos are hash-anchored correctly", () => {
    const ministries = primaryNav.find((n) => n.label === "Ministries");
    expect(ministries).toBeDefined();
    expect(ministries!.children!.map((c) => c.to)).toEqual([
      "/ministries#liturgical",
      "/ministries#faith-formation",
      "/ministries#pastoral-care",
    ]);
  });

  it("footerNav has 10 links", () => {
    expect(footerNav).toHaveLength(10);
  });

  it("footerNav covers all major site areas", () => {
    const labels = footerNav.map((l) => l.label);
    expect(labels).toContain("Give");
    expect(labels).toContain("FAQ");
    expect(labels).toContain("Liturgical");
  });
});
