/**
 * Canonical site constants — single source for address, contact, and
 * map URLs so Footer + Worship + any future page cannot drift.
 * Verified against stjoseph-bt.org.sg (2026).
 */
export const site = {
  name: "St Joseph's Church (Bukit Timah)",
  shortName: "St Joseph's Bukit Timah",
  chineseName: "圣若瑟堂",
  tagline: "A vibrant, evangelizing and missionary Church, under the patronage of St Joseph.",
  vision: "To nourish faith in a loving, outreaching community.",
  address: {
    street: "620 Upper Bukit Timah Road",
    city: "Singapore",
    zip: "678116",
    get full() {
      return `${this.street}, ${this.city} ${this.zip}`;
    },
    get query() {
      return encodeURIComponent(this.full);
    },
  },
  hours: {
    gates: "Daily, 8.00 a.m.–9.00 p.m.",
    mainChurch: "Open for Mass and private prayer",
    chapel: "Weekday Masses and scheduled devotion",
    bookshop: "Sat 4.30–7.00 p.m.; Sun 8.30 a.m.–1.00 p.m. (2nd Sunday also 5.30–7.00 p.m.)",
    adorationRoom: "Tuesday Holy Hour, 8.00 p.m.",
  },
  mass: {
    weekdayMorning: "Mon–Sat, 6.30 a.m. — Chapel of St Joseph",
    weekdayEvening: "Mon–Fri, 6.30 p.m. — Chapel of St Joseph",
    saturday: "5.30 p.m. English (Sunset Mass)",
    sunday: [
      "7.30 a.m. Mandarin",
      "9.30 a.m. English",
      "11.30 a.m. English",
      "5.30 p.m. English",
    ],
    confession: "15 minutes before all weekend Masses, open foyer of the Main Church",
    adoration: "Every Tuesday, 8.00 p.m. — Adoration Room",
    secondCollection: "4th Sunday of the month — Church Maintenance and Operation Fund",
  },
  contact: {
    parishPriestPhone: "+65 6760 0052",
    assistantPriestPhone: "+65 6760 4636",
    officePhone: "+65 6769 1666",
  },
  transport: {
    mrt: "Cashew MRT (Downtown Line)",
    buses: "67, 75, 170, 176, 178, 184, 961, 963, 970",
  },
  feast: {
    name: "Feast of St Joseph the Worker",
    date: "1 May",
  },
  uen: "T08CC4043C",
  chequePayee: "St. Joseph's Church (Bukit Timah)",
  facebook: "https://www.facebook.com/sjcbt/",
  archdiocese: "https://www.catholic.sg/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=620+Upper+Bukit+Timah+Road+Singapore+678116",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=620+Upper+Bukit+Timah+Road,+Singapore+678116&output=embed",
  /** Canonical origin — single source for og:url / og:image / JSON-LD url (drift-checked by src/head.test.ts). */
  origin: "https://st-joseph.jesspete.shop",
  get url() {
    return `${this.origin}/`;
  },
  get ogImage() {
    return `${this.origin}/images/hero-church.jpg`;
  },
} as const;
