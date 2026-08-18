export type ArchiveItem = {
  id: string;
  name: string;
  size: string;
  modified: string;
  category: "Botánicos" | "Geometría" | "Texturas" | "Abstractos";
};

const items: Omit<ArchiveItem, "category">[] = [
  { id: "1XWcQWEyFVLD7KXlAhhxeOkO8x6E0YCuF", name: "10-floating-embers-background-overlays-2023-11-27-04-55-41-utc.zip", size: "62.2 MB", modified: "30 sept 2024" },
  { id: "17OcGgnOX0DFkIk8tgDsy-F4fo7oFPFZ7", name: "10-halftone-textures-2023-11-27-05-35-09-utc.zip", size: "43.3 MB", modified: "30 sept 2024" },
  { id: "1-cWLwxkSK7KNp0H4JLgzXm2yKMNVISZq", name: "150-geometric-seamless-patterns-collection-2024-02-14-21-50-46-utc.zip", size: "268 MB", modified: "30 sept 2024" },
  { id: "1Jmq9G7M4jDhlzItYqoMBqc5PEnE8eCIA", name: "20-space-grid-backgrounds-vol-1-2023-11-27-05-06-25-utc.zip", size: "74.9 MB", modified: "30 sept 2024" },
  { id: "1S-GNok_DXvxTbvOgNB03Ymsej_mUmKuB", name: "20-white-marble-gold-textures-2024-05-06-20-19-35-utc.zip", size: "243.8 MB", modified: "30 sept 2024" },
  { id: "1Tgo0HbTST5in4fNj7hyDfW535M5v00HM", name: "21-watercolor-seamless-pattern-2024-08-21-04-29-45-utc.zip", size: "353.9 MB", modified: "1 oct 2024" },
  { id: "1VrArijnx-keydwQm17YevbOETYwZsn4p", name: "25-old-paper-book-pages-sheets-texture-background-2024-06-19-18-54-14-utc.zip", size: "366.3 MB", modified: "30 sept 2024" },
  { id: "1u9eBIQTTbklZbuBNKci7qV-I3rVhw7I5", name: "abstract-geometric-seamless-pattern-2024-04-08-21-16-25-utc.zip", size: "3 MB", modified: "1 oct 2024" },
  { id: "1YYEh-TUcOX9vkeH2-BIBw-vjqmUR1fsf", name: "art-deco-pattern-2023-12-15-16-14-45-utc.zip", size: "12.2 MB", modified: "30 sept 2024" },
  { id: "1ovG89AYlHB4A3CbB4ynBbrX1I-zp-v6m", name: "art-deco-seamless-pattern-design-2024-08-30-19-50-20-utc.zip", size: "3.9 MB", modified: "1 oct 2024" },
  { id: "1SwuJmUxud4M-6l-BM9wCxRp2NUeas6Xe", name: "autumn-in-the-forest-2024-04-11-15-32-15-utc.zip", size: "77.8 MB", modified: "1 oct 2024" },
  { id: "1k5YEsExELb14fX_ax691HaL8od6S-NZV", name: "beautiful-big-flowers-2024-09-27-00-33-06-utc.zip", size: "187.8 MB", modified: "30 sept 2024" },
  { id: "1gF_sdzskYLH-3Da3quYMxiWtm39zVPKo", name: "berry-bliss-seamless-patterns-digital-papers-2024-04-16-01-28-09-utc.zip", size: "99.2 MB", modified: "1 oct 2024" },
  { id: "1ArbylDltq_AGt8w3yJrgQXfVT3Z4kqo2", name: "bird-s-garden-vintage-pattern-graphics-2024-06-13-17-12-57-utc.zip", size: "1.39 GB", modified: "1 oct 2024" },
  { id: "1jEYKawzIqqx0O0NEIwGtHLGbp_5pJa5R", name: "black-and-gold-wavy-abstract-backgrounds-2024-07-30-04-15-09-utc.zip", size: "144 MB", modified: "1 oct 2024" },
  { id: "1ppEIBva0PljUVQ8-7hgHLJCf52ca95SS", name: "black-concrete-2024-06-24-17-28-28-utc.zip", size: "162.1 MB", modified: "30 sept 2024" },
  { id: "1Cm8jJs5Z-exLtxxuVo1LaCBfNEcqRrHx", name: "black-marble-2024-05-06-20-18-35-utc.zip", size: "59.6 MB", modified: "1 oct 2024" },
  { id: "14mRRW0Q3BfqSJAerdfZvasSNkmkebeHT", name: "blooming-flowers-2024-05-17-17-41-27-utc.zip", size: "54.9 MB", modified: "1 oct 2024" },
  { id: "1ivCI8zCiFU2eF__5jvtY9vgNtud3CjKV", name: "blue-floral-jungle-2024-05-29-22-42-19-utc.zip", size: "106 MB", modified: "1 oct 2024" },
  { id: "1mAm8HTwFCnMmB4_RpiUAP37Wa4IVePUD", name: "blue-stone-texture-2024-09-09-23-39-53-utc.zip", size: "199.3 MB", modified: "30 sept 2024" },
  { id: "1ED8gO5V_9967JPk2dxtzlZvIr5XwTqbb", name: "bright-and-bold-floral-wallpaper-2024-06-03-17-56-59-utc.zip", size: "14.7 MB", modified: "1 oct 2024" },
  { id: "1NvyeoefihEIVFB9ApZPcK0OEJEIwMF6U", name: "bright-summer-garden-2024-05-08-00-45-29-utc.zip", size: "198.6 MB", modified: "1 oct 2024" },
  { id: "1evxudixkpzESr4EGWYrwMWBocSZoTwUO", name: "broken-glass-textures-2023-12-14-17-32-38-utc.zip", size: "359.3 MB", modified: "30 sept 2024" },
  { id: "1vEZx-DiCZj1aD6k-7lI-Y_mVkWmZ4Ag3", name: "camouflage-patterns-set-2023-11-27-05-01-05-utc.zip", size: "64.9 MB", modified: "30 sept 2024" },
  { id: "1s3gRGYU-HLuRKYCim74SiNMmTjvjXKBh", name: "chinese-floral-ornament-seamless-pattern-print-2024-07-08-20-13-30-utc.zip", size: "35.9 MB", modified: "1 oct 2024" },
  { id: "1TFu_wnr6WcGqzcc-J9nq6nDKAKCAag59", name: "colorful-garden-pattern-2024-05-24-17-26-36-utc.zip", size: "59.2 MB", modified: "1 oct 2024" },
  { id: "1ebqT38sZ1gkrdt2bKqQayJijSG2aHJoe", name: "colors-floral-wallpaper-2024-05-17-19-01-41-utc.zip", size: "17 MB", modified: "1 oct 2024" },
  { id: "1pu5sWaUpWn3aIcKQRaWR7U_6SVUAlniE", name: "daisy-patterns-2024-09-19-21-05-23-utc.zip", size: "9.7 MB", modified: "1 oct 2024" },
  { id: "1C8DukMfFEyjc2snUJTWGx2_cMLYpooiJ", name: "doodle-patterns-2023-11-27-05-24-06-utc.zip", size: "5.7 MB", modified: "30 sept 2024" },
  { id: "1NI0qHpJFUN3L6NGE66W_voURoCTAkEDH", name: "e-waste-seamless-pattern-2024-05-06-19-32-23-utc.zip", size: "7.4 MB", modified: "1 oct 2024" },
  { id: "1z3F0GWxhv1xupmE9mMycwRqLZiBduvrt", name: "exotic-birds-vintage-pattern-2024-08-30-19-41-57-utc.zip", size: "1.06 GB", modified: "1 oct 2024" },
  { id: "10hvK0SfLnFkQ73EXv1zYIoCX9WDwFhZi", name: "exotic-wallpaper-2024-05-14-20-03-16-utc.zip", size: "80.7 MB", modified: "1 oct 2024" },
  { id: "1v1H1ubmqpW1CUbHR70tHijfSirNfw5m4", name: "fire-flames-backgrounds-and-overlays-2023-12-23-10-59-21-utc.zip", size: "944.9 MB", modified: "30 sept 2024" },
  { id: "195Q58F39-hRD3XnsnH0-p1-7KXvkLgRw", name: "flat-geometric-patterns-2023-11-27-05-19-45-utc.zip", size: "9 MB", modified: "30 sept 2024" },
  { id: "1oc1F44dT1hGO6yCZj8miakLm72dtyssc", name: "flower-patterns-2024-09-28-01-26-08-utc.zip", size: "3.6 MB", modified: "30 sept 2024" },
  { id: "1hnqSSgBfMzG3V3Vmw6IogMZi1IPuvx-f", name: "flower-patterns-2024-09-28-01-27-09-utc.zip", size: "6.4 MB", modified: "30 sept 2024" },
  { id: "1diyJH1VRGyuj0qC2Lw8dlOa4kK0MIdS_", name: "flowers-cartoon-seamless-pattern-2024-06-13-16-55-35-utc.zip", size: "30.6 MB", modified: "1 oct 2024" },
  { id: "1IOZ_lI4TaGp2eZhng6mNO2kRrjllnr6P", name: "folk-gouache-wallpaper-2024-04-11-15-46-19-utc.zip", size: "154 MB", modified: "30 sept 2024" },
  { id: "1DHPmfLc66zyQxnK0ULNdYrEtSlKRmYTl", name: "freshly-flower-seamless-pattern-2024-08-26-22-10-10-utc.zip", size: "16.1 MB", modified: "1 oct 2024" },
  { id: "1LGSIH4UQRmVfufL6fNS3Qu9rnVqTwvsz", name: "galaxy-background-2024-01-29-17-44-38-utc.zip", size: "7.2 MB", modified: "30 sept 2024" },
  { id: "1Sa1dQBvqbJeusvCLroUNSuJtmk3-mOfU", name: "geometric-pattern-collection-2023-11-27-05-17-01-utc.zip", size: "19.9 MB", modified: "30 sept 2024" },
  { id: "1HtnqX6cmvPixWvW20IpA-NDFa8FadUkC", name: "geometric-print-seamless-pattern-2024-04-08-21-10-24-utc.zip", size: "45.9 MB", modified: "1 oct 2024" },
  { id: "1v0rzHDLlY1qd2-wr2tQCYI9-N6hDCqLM", name: "geometric-seamless-pattern-2024-04-08-21-09-24-utc.zip", size: "4.9 MB", modified: "1 oct 2024" },
  { id: "1U2Iwu2oBqYC2o8Oazpnsn6TxlFPgWM0R", name: "geometric-seamless-vector-patterns-2023-11-27-05-27-52-utc.zip", size: "9.6 MB", modified: "1 oct 2024" },
  { id: "10uoIoCr1XiosdJdyfHwHEV8m3dVbkEDH", name: "glass-waste-seamless-pattern-2024-09-20-19-46-01-utc.zip", size: "6.1 MB", modified: "1 oct 2024" },
  { id: "1ZxRhxVQnEokDT7b_xmSoxJw9ToSNHitb", name: "goldfinch-bird-pattern-design-2024-06-20-21-16-21-utc.zip", size: "1.8 MB", modified: "1 oct 2024" },
  { id: "1qdL5Najmj5feDR_4YgJ0CPQ9l7GET8yt", name: "green-blooming-garden-2024-05-29-22-39-18-utc.zip", size: "178.8 MB", modified: "1 oct 2024" },
  { id: "1TXmsbVKuxtjam_hjrUZBgjqZ5epecuyl", name: "green-tropical-pattern-2024-05-21-18-10-14-utc.zip", size: "90.2 MB", modified: "1 oct 2024" },
  { id: "1vmjD32P02OkNfIZZqCcYLfSZXlqeyfGg", name: "greenery-eucalyptus-digital-paper-pack-2024-04-15-22-30-58-utc.zip", size: "17.4 MB", modified: "1 oct 2024" },
  { id: "1mfiKx5PZsYBN21rfYgtXNwpEUOtz_90h", name: "halloween-scary-seamless-pattern-2024-09-25-20-53-38-utc.zip", size: "19.7 MB", modified: "30 sept 2024" },
];

function categoryFor(name: string): ArchiveItem["category"] {
  const normalized = name.toLowerCase();
  if (/(flower|floral|garden|bloom|berry|bird|tropical|eucalyptus|autumn)/.test(normalized)) return "Botánicos";
  if (/(geometric|space|halftone|doodle|camouflage|e-waste)/.test(normalized)) return "Geometría";
  if (/(marble|concrete|paper|gold|stone|fire|galaxy|glass|black)/.test(normalized)) return "Texturas";
  return "Abstractos";
}

export const inventory: ArchiveItem[] = items.map((item) => ({ ...item, category: categoryFor(item.name) }));
