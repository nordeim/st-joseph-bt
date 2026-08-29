import { describe, expect, it } from "vitest";
import { site } from "@/data/site";

describe("site", () => {
  it("has canonical address street/city/zip with full and encoded query", () => {
    expect(site.address.street).toBe("620 Upper Bukit Timah Road");
    expect(site.address.city).toBe("Singapore");
    expect(site.address.zip).toBe("678116");
    expect(site.address.full).toContain(site.address.street);
    expect(site.address.full).toContain(site.address.zip);
    expect(site.address.query).toBe(encodeURIComponent(site.address.full));
  });

  it("has mapsUrl and mapsEmbedSrc matching google.com/maps", () => {
    expect(site.mapsUrl).toMatch(/google\.com\/maps/);
    expect(site.mapsEmbedSrc).toMatch(/google\.com\/maps/);
    expect(site.mapsUrl).toMatch(/^https:\/\/www\.google\.com\/maps/);
  });

  it("has contact phones (+65), UEN, chequePayee, facebook, archdiocese", () => {
    expect(site.contact.parishPriestPhone).toMatch(/\+65/);
    expect(site.contact.assistantPriestPhone).toMatch(/\+65/);
    expect(site.contact.officePhone).toMatch(/\+65/);
    expect(site.uen).toBe("T08CC4043C");
    expect(site.chequePayee.length).toBeGreaterThan(0);
    expect(site.facebook).toMatch(/^https:\/\//);
    expect(site.archdiocese).toMatch(/^https:\/\//);
  });

  it("has hours for gates, mainChurch, chapel, bookshop, adorationRoom", () => {
    expect(site.hours.gates.length).toBeGreaterThan(0);
    expect(site.hours.mainChurch.length).toBeGreaterThan(0);
    expect(site.hours.chapel.length).toBeGreaterThan(0);
    expect(site.hours.bookshop.length).toBeGreaterThan(0);
    expect(site.hours.adorationRoom.length).toBeGreaterThan(0);
  });

  it("has mass schedule with weekdayMorning/weekdayEvening/saturday/sunday[4]/confession/adoration/secondCollection", () => {
    expect(site.mass.weekdayMorning.length).toBeGreaterThan(0);
    expect(site.mass.weekdayEvening.length).toBeGreaterThan(0);
    expect(site.mass.saturday.length).toBeGreaterThan(0);
    expect(site.mass.sunday).toHaveLength(4);
    for (const slot of site.mass.sunday) {
      expect(slot.length).toBeGreaterThan(0);
    }
    expect(site.mass.confession.length).toBeGreaterThan(0);
    expect(site.mass.adoration.length).toBeGreaterThan(0);
    expect(site.mass.secondCollection.length).toBeGreaterThan(0);
  });

  it("has feast name and date", () => {
    expect(site.feast.name).toBe("Feast of St Joseph the Worker");
    expect(site.feast.date).toBe("1 May");
  });

  it("has canonical origin with derived url and ogImage", () => {
    expect(site.origin).toMatch(/^https:\/\//);
    expect(site.origin.endsWith("/")).toBe(false);
    expect(site.url).toBe(`${site.origin}/`);
    expect(site.ogImage).toBe(`${site.origin}/images/hero-church.jpg`);
    // ogImage is absolute and uses the same origin
    expect(site.ogImage.startsWith(site.origin)).toBe(true);
  });
});
