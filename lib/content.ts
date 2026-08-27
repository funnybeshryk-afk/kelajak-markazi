export type Direction = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  symbol: string;
};

export const directions: Direction[] = [
  {
    slug: "it-dasturlash",
    title: "IT va dasturlash",
    shortDescription: "Zamonaviy dasturlash va raqamli ko‘nikmalar",
    description:
      "Bu yo‘nalish dasturlash asoslari, raqamli tafakkur va zamonaviy texnologiyalar bilan tanishishni istagan yoshlar uchun mo‘ljallangan. Mashg‘ulotlar davomida amaliy loyihalar orqali mustaqil fikrlash va muammolarni hal qilish ko‘nikmalari rivojlantiriladi.",
    symbol: "⌘",
  },
  {
    slug: "robototexnika",
    title: "Robototexnika",
    shortDescription: "Amaliy loyihalar va muhandislik fikrlashi",
    description:
      "Robototexnika yo‘nalishi texnika va muhandislikka qiziqqan yoshlarni jamlaydi. O‘quvchilar amaliy loyihalar ustida ishlab, jamoada ishlash va ijodiy yechimlar topish tajribasini orttiradilar.",
    symbol: "⚙",
  },
  {
    slug: "ingliz-tili",
    title: "Ingliz tili",
    shortDescription: "Muloqot va xalqaro imkoniyatlar uchun til",
    description:
      "Ingliz tili yo‘nalishi yoshlarning xalqaro muloqot ko‘nikmalarini rivojlantirishga qaratilgan. Mashg‘ulotlarda tilni amaliyotda qo‘llash, so‘zlashuv va o‘zaro muloqotga alohida e’tibor qaratiladi.",
    symbol: "A",
  },
  {
    slug: "ijodiy",
    title: "Ijodiy yo‘nalishlar",
    shortDescription: "Ijodkorlik, yangi g‘oyalar va jamoaviy ish",
    description:
      "Ijodiy yo‘nalishlar o‘z iste’dodini namoyon qilishni istagan yoshlar uchun imkoniyat yaratadi. Bu yerda ijodiy fikrlash, yangi g‘oyalarni ilgari surish va jamoaviy loyihalar ustida ishlash qo‘llab-quvvatlanadi.",
    symbol: "✦",
  },
];

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  text: string;
  kind: string;
};

export const newsItems: NewsItem[] = [
  {
    id: "1",
    date: "24 MAY, 2026",
    title: "Kelajak Markazida navbatdagi seminar bo‘lib o‘tdi",
    text: "O‘quvchilar zamonaviy texnologiyalar va yangi imkoniyatlar haqida bilim oldilar.",
    kind: "SEMINAR",
  },
  {
    id: "2",
    date: "20 MAY, 2026",
    title: "Robototexnika to‘garagida yangi loyiha",
    text: "Yoshlar amaliy mashg‘ulotlarda yangi robot loyihalarini yaratishdi.",
    kind: "ROBOTOTEXNIKA",
  },
  {
    id: "3",
    date: "18 MAY, 2026",
    title: "O‘quvchilarimiz yangi yutuqlarni qo‘lga kiritishdi",
    text: "Markazimiz tarbiyalanuvchilari tanlov va olimpiadalarda faol ishtirok etdilar.",
    kind: "YUTUQ",
  },
  {
    id: "4",
    date: "12 MAY, 2026",
    title: "Ingliz tili yo‘nalishida ochiq muloqot darsi",
    text: "O‘quvchilar amaliy mashg‘ulotda muloqot ko‘nikmalarini mustahkamladilar.",
    kind: "INGLIZ TILI",
  },
  {
    id: "5",
    date: "05 MAY, 2026",
    title: "IT yo‘nalishi o‘quvchilari loyihalarini taqdim etishdi",
    text: "Yoshlar o‘z dasturlash loyihalari ustida olib borgan ishlarini namoyish qilishdi.",
    kind: "IT",
  },
  {
    id: "6",
    date: "28 APREL, 2026",
    title: "Ijodiy yo‘nalish o‘quvchilari ko‘rgazma tayyorladi",
    text: "O‘quvchilarning ijodiy ishlaridan iborat kichik ko‘rgazma tashkil etildi.",
    kind: "IJODIY",
  },
];

export type EventItem = {
  id: string;
  day: string;
  month: string;
  title: string;
  text: string;
};

export const eventItems: EventItem[] = [
  { id: "1", day: "31", month: "MAY", title: "“Zakovat” intellektual o‘yini", text: "09:00 – 12:00 · Kelajak Markazi" },
  { id: "2", day: "05", month: "IYUN", title: "Ingliz tili bo‘yicha ochiq dars", text: "10:00 – 11:30 · Kelajak Markazi" },
  { id: "3", day: "10", month: "IYUN", title: "Yozgi IT oromgohi boshlanadi", text: "09:00 · Kelajak Markazi" },
  { id: "4", day: "15", month: "IYUN", title: "Robototexnika ochiq mashg‘ulot kuni", text: "11:00 · Kelajak Markazi" },
  { id: "5", day: "20", month: "IYUN", title: "Ijodiy yo‘nalish ko‘rgazmasi", text: "14:00 · Kelajak Markazi" },
];
