// data/homeData.js
// ─── Replace API calls here when backend is ready ───────────────────────────

export const DUMMY_RECIPES = [
  {
    _id: "1",
    title: "Butter Chicken",
    cuisine: "Indian",
    time: "45 min",
    veg: false,
    likes: 284,
    author: { name: "Priya Sharma", initials: "PS", color: "#D85A30" },
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=70",
  },
  {
    _id: "2",
    title: "Cacio e Pepe",
    cuisine: "Italian",
    time: "20 min",
    veg: true,
    likes: 196,
    author: { name: "Marco Rossi", initials: "MR", color: "#185FA5" },
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=70",
  },
  {
    _id: "3",
    title: "Pav Bhaji",
    cuisine: "Indian",
    time: "30 min",
    veg: true,
    likes: 312,
    author: { name: "Rohit Kumar", initials: "RK", color: "#3B6D11" },
    imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=70",
  },
  {
    _id: "4",
    title: "Pad Thai",
    cuisine: "Asian",
    time: "25 min",
    veg: false,
    likes: 178,
    author: { name: "Aisha Noor", initials: "AN", color: "#854F0B" },
    imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&q=70",
  },
  {
    _id: "5",
    title: "Chocolate Lava Cake",
    cuisine: "Dessert",
    time: "35 min",
    veg: true,
    likes: 421,
    author: { name: "Sofia Duarte", initials: "SD", color: "#712B13" },
    imageUrl: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&q=70",
  },
  {
    _id: "6",
    title: "Dal Makhani",
    cuisine: "Indian",
    time: "60 min",
    veg: true,
    likes: 255,
    author: { name: "Neha Verma", initials: "NV", color: "#3C3489" },
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=70",
  },
];

export const CATEGORIES = [
  "All", "Indian", "Italian", "Asian", "Vegan", "Desserts", "Quick (< 30 min)", "Street Food",
];

export const STATS = [
  { value: "12k+", label: "Recipes shared" },
  { value: "4.2k", label: "Active cooks" },
  { value: "98%",  label: "Success rate" },
  { value: "35+",  label: "Cuisines" },
];

export const FEATURED = {
  badge: "Chef's Pick",
  title: "Mastering the Perfect Biryani",
  description:
    "A 3-hour journey through layers of slow-cooked basmati, whole spices, and caramelised onions — the way your dadi made it.",
  author: "Arjun Mehta",
  imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
};
