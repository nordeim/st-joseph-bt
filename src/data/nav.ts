export interface NavLink {
  label: string;
  to: string;
}

export interface NavItem {
  label: string;
  to: string;
  description?: string;
  children?: (NavLink & { description?: string })[];
}

export const primaryNav: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About",
    to: "/about",
    children: [
      {
        label: "The Parish",
        to: "/about",
        description: "Mission, clergy, and the Parish Pastoral Council.",
      },
      {
        label: "Our History",
        to: "/history",
        description: "From an attap chapel in 1846 to a church on the hill.",
      },
      {
        label: "FAQ",
        to: "/faq",
        description: "Mass, confession, feast day, and visiting questions.",
      },
    ],
  },
  {
    label: "Worship",
    to: "/worship",
    children: [
      {
        label: "Mass Times",
        to: "/worship#mass",
        description: "Weekday chapel Masses and weekend liturgies.",
      },
      {
        label: "Confession & Adoration",
        to: "/worship#confession",
        description: "Reconciliation, Holy Hour, and weekday devotion.",
      },
      {
        label: "Find Us",
        to: "/worship#visit",
        description: "Gates, MRT, buses, and a map of the grounds.",
      },
    ],
  },
  {
    label: "Ministries",
    to: "/ministries",
    children: [
      {
        label: "Liturgical",
        to: "/ministries#liturgical",
        description: "Altar servers, choirs, and hospitality at Mass.",
      },
      {
        label: "Faith Formation",
        to: "/ministries#faith-formation",
        description: "Catechesis of the Good Shepherd and adult formation.",
      },
      {
        label: "Pastoral Care",
        to: "/ministries#pastoral-care",
        description: "SSVP, Legion of Mary, and prayer for the bereaved.",
      },
    ],
  },
  { label: "News & Events", to: "/news-events" },
  { label: "Serve", to: "/serve" },
];

export const footerNav: NavLink[] = [
  { label: "The Parish", to: "/about" },
  { label: "Mass Times", to: "/worship#mass" },
  { label: "History", to: "/history" },
  { label: "FAQ", to: "/faq" },
  { label: "Liturgical", to: "/ministries#liturgical" },
  { label: "Faith Formation", to: "/ministries#faith-formation" },
  { label: "Pastoral Care", to: "/ministries#pastoral-care" },
  { label: "News & Events", to: "/news-events" },
  { label: "Serve", to: "/serve" },
  { label: "Give", to: "/give" },
];
