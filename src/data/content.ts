export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface GroundsPlace {
  id: string;
  title: string;
  summary: string;
  details: string[];
  image: string;
  imageFallback: string;
  imageAlt: string;
}

export interface Ministry {
  id: string;
  title: string;
  summary: string;
  details: string[];
  image: string;
  imageFallback: string;
  imageAlt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EventItem {
  title: string;
  date: string;
  summary: string;
  category: "Parish" | "Devotion" | "Formation" | "Archdiocese";
  href?: string;
}

export interface GivingOption {
  name: string;
  description: string;
  icon: "flame" | "church" | "sprout" | "heart" | "book" | "hand-heart" | "landmark" | "globe";
}

export interface Priest {
  name: string;
  role: string;
  phone?: string;
}

export interface PpcMember {
  role: string;
  name: string;
}

export const images = {
  hero: "https://upload.wikimedia.org/wikipedia/commons/4/48/St_Joseph%27s_Church_%28Bukit_Timah%29_from_the_front_%282025%29.jpg",
  heroFallback: "/images/hero-church.jpg",
  chapel: "/images/chapel-interior.jpg",
  sanctuary: "/images/sanctuary.jpg",
  garden: "/images/rosary-garden.jpg",
  glass: "/images/stained-glass.jpg",
  hall: "/images/parish-hall.jpg",
  cemetery: "/images/cemetery.jpg",
  feast: "/images/feast.jpg",
  naveCdn: "https://images.pexels.com/photos/34825460/pexels-photo-34825460.jpeg",
  courtyardCdn: "https://images.pexels.com/photos/32808802/pexels-photo-32808802.jpeg",
} as const;

export const priests: Priest[] = [
  { name: "Rev Fr Jovita Cyprian Ho", role: "Parish Priest", phone: "+65 6760 0052" },
  {
    name: "Rev Fr Leo Justin Chinnappan, HGN",
    role: "Assistant Priest",
    phone: "+65 6760 4636",
  },
  { name: "Bro Dominic Yeo-Koh", role: "Religious (ex-officio)" },
];

export const ppcMembers: PpcMember[] = [
  { role: "Parish Priest (ex-officio)", name: "Rev Fr Jovita Cyprian Ho" },
  { role: "Assistant Priest (ex-officio)", name: "Rev Fr Leo Justin Chinnappan, HGN" },
  { role: "Religious (ex-officio)", name: "Bro Dominic Yeo-Koh" },
  { role: "Chairman (appointed)", name: "Gabriel Lok" },
  { role: "Advisor", name: "Dominic Soh" },
  { role: "Vice-Chairman (elected)", name: "Diana Ho" },
  { role: "Secretary", name: "Irene Liu" },
  { role: "Estate Maintenance", name: "Thomas Tan" },
  { role: "Faith Formation", name: "Diana Ho" },
  { role: "Mandarin & Dialect-Speaking", name: "Joseph Chen" },
  { role: "N’hood Christian Community", name: "Vincent Lee" },
  { role: "Safety & Security", name: "Peter Chong" },
  { role: "Youth Ministry", name: "Leonard Ong" },
  { role: "Appointed Member", name: "Eileen Chong" },
  { role: "Appointed Member", name: "Richard Lee" },
  { role: "Appointed Member", name: "Jeffrey Chan" },
];

export const lifeTimeline: TimelineEntry[] = [
  {
    year: "1845",
    title: "A missionary walks inland",
    description:
      "Fr Anatole Mauduit, M.E.P., arrives from Normandy seeking Chinese Christians labouring in the pepper and gambier plantations beyond the town. He founds a mission station near the Kranji River.",
  },
  {
    year: "1846",
    title: "The Kranji Chapel",
    description:
      "A small attap chapel — later remembered as the beginning of St Joseph's — gathers plantation workers into Singapore's first Chinese Catholic parish. The feast will come to honour St Joseph the Worker.",
  },
  {
    year: "1853",
    title: "A church on this hill",
    description:
      "The congregation outgrows the riverside chapel. Mauduit raises a new church at the present Upper Bukit Timah site, described in its day as a Palladian portico carried on six Doric columns.",
  },
  {
    year: "1861",
    title: "The statue of St Joseph",
    description:
      "A statue of the patron arrives, and feast-day pilgrimage takes root. Families from across the island — and later from Malaya — begin the annual walk to the hill.",
  },
  {
    year: "1910s",
    title: "Rubber and return",
    description:
      "Secret societies, tigers, and failing plantations had thinned the flock. Parish priests plant rubber around the church; Christians come back to the district, and by the 1930s the hill is again a pilgrimage place.",
  },
  {
    year: "1964",
    title: "Fr Teng rebuilds",
    description:
      "Fr Joachim Teng, with almost no resources, rebuilds for a baby-boom parish — selling milk from cattle kept on the grounds, and starting the feast-day food fair that is still tradition. Archbishop Michel Olçomendy blesses the new church on 30 August 1964.",
  },
  {
    year: "1991–97",
    title: "Stations, columbarium, hall",
    description:
      "Life-sized Stations of the Cross are set around the boundary in 1991 and become a Lenten pilgrimage. The parish columbarium is blessed in 1995; a new parish hall follows in 1997.",
  },
  {
    year: "2012–17",
    title: "Consecration and the Rosary Garden",
    description:
      "Archbishop Nicholas Chia consecrates the church on 1 May 2012. On 25 March 2017 Archbishop William Goh blesses the Rosary Garden, where Fr Mauduit's headstone still rests among the trees.",
  },
];

export const grounds: GroundsPlace[] = [
  {
    id: "main-church",
    title: "Main Church",
    summary:
      "The heart of Sunday worship — Mandarin at dawn, English through the day — and the open foyer where confessions are heard before weekend Masses.",
    details: [
      "Saturday sunset Mass at 5.30 p.m.",
      "Sunday English Masses at 9.30 a.m., 11.30 a.m. and 5.30 p.m.",
      "Sunday Mandarin Mass at 7.30 a.m.",
      "Children's Mass on 2nd Saturdays in school term",
    ],
    image: images.naveCdn,
    imageFallback: images.sanctuary,
    imageAlt: "Nave of a Catholic church looking toward the sanctuary",
  },
  {
    id: "chapel",
    title: "Chapel of St Joseph",
    summary:
      "The quieter house of weekday prayer. Dawn and evening Masses are offered here, with First Friday Holy Hour and Friday Divine Mercy.",
    details: [
      "Weekday morning Mass, Mon–Sat 6.30 a.m.",
      "Weekday evening Mass, Mon–Fri 6.30 p.m.",
      "First Friday Mass and Holy Hour",
      "Divine Mercy, Fridays at 8.00 p.m. (except First Friday)",
    ],
    image: images.chapel,
    imageFallback: images.chapel,
    imageAlt: "Candlelit chapel interior with a statue of Saint Joseph",
  },
  {
    id: "rosary-garden",
    title: "Rosary Garden & Stations",
    summary:
      "A life-sized pilgrimage in the open air: the Rosary Garden blessed in 2017, the Stations that ring the grounds, and the last Catholic church cemetery in Singapore.",
    details: [
      "Rosary Garden trail, blessed 25 March 2017",
      "Life-sized Stations of the Cross (1991)",
      "Fr Mauduit's headstone among the trees",
      "Historic cemetery — the last remaining at a Catholic church here",
    ],
    image: images.courtyardCdn,
    imageFallback: images.garden,
    imageAlt: "Tropical garden path beside a church courtyard",
  },
];

export const ministries: Ministry[] = [
  {
    id: "liturgical",
    title: "Liturgical",
    summary:
      "Servers, singers, ushers, and readers who help the assembly pray the Mass with dignity — from the Sunset Choir to the Little Praisers.",
    details: [
      "Altar servers assisting the priest and modelling the liturgy for the assembly",
      "Sunset Choir at the Saturday 5.30 p.m. Mass",
      "The Little Praisers (ages 7–12) at the 3rd Saturday Children's Mass",
      "Hospitality: bells, ushering, collections, and the flow of Holy Communion",
    ],
    image: images.sanctuary,
    imageFallback: images.sanctuary,
    imageAlt: "Church sanctuary prepared for the celebration of Mass",
  },
  {
    id: "faith-formation",
    title: "Faith Formation",
    summary:
      "Catechesis that begins in childhood and does not stop at confirmation — including the Catechesis of the Good Shepherd for the youngest.",
    details: [
      "Catechesis of the Good Shepherd for children aged 3–12",
      "Saturday 12.00–1.45 p.m. and Sunday 9.00–10.45 a.m. (N2–K2)",
      "Adult faith sharing, Bible reflection, and RCIA enquiries via the Parish Office",
      "Catechists, assistants, and facilitators always welcome",
    ],
    image: images.glass,
    imageFallback: images.glass,
    imageAlt: "Stained glass of Saint Joseph the carpenter with the child Jesus",
  },
  {
    id: "pastoral-care",
    title: "Pastoral Care",
    summary:
      "The works of mercy, close to home: SSVP's St Joachim Conference, the Legion of Mary, wake prayer, and PIETA for bereaved parents.",
    details: [
      "St Joachim Conference (SSVP) — visiting Friends in Need, first-Sunday distribution, Saturday tuition",
      "Mary of the Way Praesidium — Mondays 7.30–9.00 p.m.",
      "Mother of Perpetual Succour — Wednesdays 4.00–5.30 p.m.",
      "PIETA bereaved-parents group, fourth Tuesday of the month",
    ],
    image: images.chapel,
    imageFallback: images.chapel,
    imageAlt: "Quiet chapel interior suggesting prayer and pastoral care",
  },
  {
    id: "family-life",
    title: "Family Life",
    summary:
      "A seniors community grounded in faith and Christian love — prayer, talks, companionship, and the habit of healthy living together.",
    details: [
      "Spiritual journeying through prayer sessions and talks",
      "A climate of caring and sharing among older parishioners",
      "Healthy living and life-long learning",
      "Neighbourhood Small Catholic Communities across the parish",
    ],
    image: images.hall,
    imageFallback: images.hall,
    imageAlt: "Parish community hall ready for gathering",
  },
  {
    id: "youth",
    title: "Youth",
    summary:
      "Young people meeting Jesus in Word, worship, and friendship — from Sunday Bible sharing to Alpha Youth for the unbaptised.",
    details: [
      "Youth Faith and Bible Reflections — Sundays 12.45–3.30 p.m., St Mary's AVA room",
      "Alpha Youth for unbaptised teens aged 13–18",
      "SAHOP praise and worship nights",
      "Youth Ministry coordinator: Leonard Ong (PPC)",
    ],
    image: images.feast,
    imageFallback: images.feast,
    imageAlt: "Evening lights at a parish feast-day gathering",
  },
  {
    id: "mandarin",
    title: "Mandarin & Dialect",
    summary:
      "圣若瑟堂 remains a Chinese Catholic home: Mandarin Sunday Mass, dialect groups, the Mandarin Legion of Mary, and adult catechumenate.",
    details: [
      "Sunday Mandarin Mass at 7.30 a.m.",
      "Altar servers, lectors, choir, hospitality, and projection in Mandarin",
      "Adult Mandarin RCIA and Bible study (Little Rock)",
      "Teochew Bible group, Teochew holy souls association, and Legion of Mary (Saturdays 1.30–2.45 p.m.)",
    ],
    image: images.heroFallback,
    imageFallback: images.heroFallback,
    imageAlt: "Exterior of St Joseph's Church Bukit Timah",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What are the Mass times?",
    answer:
      "Weekdays: 6.30 a.m. Monday–Saturday and 6.30 p.m. Monday–Friday in the Chapel of St Joseph. Saturday sunset Mass is 5.30 p.m. in the Main Church. Sunday: 7.30 a.m. Mandarin, then English at 9.30 a.m., 11.30 a.m., and 5.30 p.m. First Wednesday St Joseph Mass and First Friday Holy Hour replace the 6.30 p.m. chapel Mass on those evenings.",
  },
  {
    question: "When can I go to confession?",
    answer:
      "Confessions are heard 15 minutes before all weekend Masses in the open foyer of the Main Church. No booking is required. If you need a longer conversation, telephone the Parish Priest's office.",
  },
  {
    question: "How do I get there?",
    answer:
      "The church is at 620 Upper Bukit Timah Road, Singapore 678116. Nearest MRT is Cashew (Downtown Line). Buses 67, 75, 170, 176, 178, 184, 961, 963 and 970 stop nearby. Gates are open 8.00 a.m. to 9.00 p.m.",
  },
  {
    question: "Is there a feast day celebration?",
    answer:
      "The parish feast honours St Joseph the Worker on 1 May. A food-and-fun fair, begun by Fr Joachim Teng in the 1950s, remains part of the celebration. Watch News & Events and the parish Facebook page as May approaches.",
  },
  {
    question: "Can I request baptism, marriage, or a Mass intention?",
    answer:
      "Yes — contact the Parish Office. Marriage preparation in the Archdiocese is arranged through the Catholic Marriage Preparation Course; leave ample time. Weekend offertory-gift processions can be requested at least one week ahead via the parish form.",
  },
  {
    question: "Is the cemetery or columbarium open to visitors?",
    answer:
      "St Joseph's holds the last remaining Catholic church cemetery in Singapore, and a columbarium blessed in 1995. Visiting is possible during gate hours; for niches or genealogical questions, please telephone the Parish Office rather than assuming walk-in arrangements.",
  },
];

export const upcomingEvents: EventItem[] = [
  {
    title: "Ministry MPSC Fair",
    date: "22–23 August",
    summary:
      "Explore service opportunities and communities at the Parish Community Hall, before and after weekend Masses. Come and see how you can help build God's Kingdom.",
    category: "Parish",
  },
  {
    title: "Catholic Education Sunday",
    date: "22–23 August",
    summary:
      "Welcome teachers, students and parents from CHIJ Our Lady Queen of Peace (Sat 5.30 p.m.), De La Salle and Assumption English School (Sun 11.30 a.m.).",
    category: "Archdiocese",
  },
  {
    title: "An Encounter with Jesus",
    date: "Sundays from 23 August, 12.45–3.30 p.m.",
    summary:
      "Youth Faith and Bible Reflections — fellowship lunch, Bible sharing, and prayer in St Mary's AVA room (Level 3, Parish Community Hall).",
    category: "Formation",
    href: "https://tinyurl.com/54rbyjyr",
  },
  {
    title: "Boys' Town Church Collection",
    date: "29–30 August",
    summary:
      "The annual collection in memory of the late Brother Emmanuel, supporting Boys' Town programmes and operations.",
    category: "Parish",
  },
  {
    title: "Mass in Honour of St Joseph",
    date: "First Wednesday of each month",
    summary:
      "7.30 p.m. St Joseph Rosary, 8.00 p.m. Mass in the Main Church. No 6.30 p.m. Mass in the Chapel of St Joseph that evening.",
    category: "Devotion",
  },
  {
    title: "First Friday Mass & Holy Hour",
    date: "First Friday of each month",
    summary:
      "7.30 p.m. Mass followed by Holy Hour. No 6.30 p.m. chapel Mass that evening.",
    category: "Devotion",
  },
];

export const givingOptions: GivingOption[] = [
  {
    name: "PayNow",
    description:
      "Give via PayNow to the parish UEN T08CC4043C — St. Joseph's Church (Bukit Timah).",
    icon: "globe",
  },
  {
    name: "Weekend collections",
    description:
      "The ordinary offertory at Mass, and a second collection on the 4th Sunday for the Church Maintenance and Operation Fund.",
    icon: "church",
  },
  {
    name: "Cash boxes",
    description:
      "Drop an offering in the donation boxes at the foyer (Cry Room) and St Mary's wing.",
    icon: "landmark",
  },
  {
    name: "Cheque",
    description:
      "Payable to St. Joseph's Church (Bukit Timah). Mail to 620 Upper Bukit Timah Road, Singapore 678116, or place in a donation box with your name, number, and address for a receipt.",
    icon: "book",
  },
  {
    name: "SSVP — Friends in Need",
    description:
      "Offerings for the poor may be placed in the Cry Room donation box, supporting St Joachim Conference's monthly distribution and tuition.",
    icon: "hand-heart",
  },
  {
    name: "GIFT (Archdiocese)",
    description:
      "The Giving in Faith & Thankfulness campaign resources the wider Church in Singapore. Give through the Catholic Foundation.",
    icon: "flame",
  },
  {
    name: "Boys' Town",
    description:
      "The annual Brother Emmanuel collection (late August) supports programmes at Boys' Town, born of this parish's own hill.",
    icon: "sprout",
  },
  {
    name: "Mass offerings",
    description:
      "Request a Mass intention through the Parish Office — for the living or the dead, in thanksgiving or petition.",
    icon: "heart",
  },
];

export const serveRoles = [
  {
    title: "Liturgical ministers",
    description:
      "Altar servers, lectors, extraordinary ministers, choir members, and ushers who keep Sunday beautiful and hospitable.",
  },
  {
    title: "Catechists & facilitators",
    description:
      "Walk with children in the Catechesis of the Good Shepherd, or sit with adults preparing for baptism and the sacraments.",
  },
  {
    title: "Pastoral care",
    description:
      "Visit Friends in Need with SSVP, pray with the Legion of Mary, or keep vigil with bereaved families.",
  },
  {
    title: "Hospitality & grounds",
    description:
      "Welcome at the doors, tend the Rosary Garden, support feast-day hospitality, or help Information & Publicity tell the parish story.",
  },
];

export const devotions = [
  {
    title: "Mass in Honour of St Joseph",
    when: "First Wednesday, 7.30 p.m. rosary · 8.00 p.m. Mass",
    where: "Main Church",
  },
  {
    title: "First Friday Mass & Holy Hour",
    when: "First Friday, 7.30 p.m. Mass · 8.00 p.m. Holy Hour",
    where: "Main Church",
  },
  {
    title: "Holy Hour for Vocations",
    when: "3rd Thursday, 8.00 p.m.",
    where: "Chapel of St Joseph — with seminarians of SFXMS",
  },
  {
    title: "Children's Mass",
    when: "2nd Saturdays in school term, 5.30 p.m.",
    where: "Main Church",
  },
  {
    title: "Divine Mercy",
    when: "Every Friday except First Friday, 8.00 p.m.",
    where: "Chapel of St Joseph",
  },
  {
    title: "Adoration",
    when: "Every Tuesday, 8.00 p.m.",
    where: "Adoration Room",
  },
];
