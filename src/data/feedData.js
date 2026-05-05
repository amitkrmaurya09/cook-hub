export const dummyRecipes = [
  {
    _id: "1",
    title: "Paneer Butter Masala",
    image: "https://img.freepik.com/premium-photo/bowl-food-that-has-piece-chicken-it_1013545-2047.jpg?semt=ais_hybrid&w=740&q=80",
    cuisine: "Indian",
    time: "30 min",
    likes: 120,
    likedByMe: false,
    followedByMe: false,
    authorId: "u1",
    author: "chef_priya",
    comments: [
      { _id: "c1", text: "Nice!", author: "foodie99" },
      { _id: "c2", text: "Love this 🔥", author: "spicequeen" }
    ],
    steps: ["Cook onion-tomato gravy with spices", "Add paneer cubes and cream"]
  },
  {
    _id: "2",
    title: "Veg Biryani",
    image: "https://source.unsplash.com/800x1200/?biryani",
    cuisine: "Indian",
    time: "45 min",
    likes: 210,
    likedByMe: true,
    followedByMe: false,
    authorId: "u2",
    author: "biryani_king",
    comments: [
      { _id: "c3", text: "Amazing!", author: "ricelovers" },
      { _id: "c4", text: "So tasty 😋", author: "veghead" }
    ],
    steps: ["Cook basmati rice until 80% done", "Layer vegetables and rice, steam for 20 min"]
  },
  {
    _id: "3",
    title: "Pizza Margherita",
    image: "https://source.unsplash.com/800x1200/?pizza",
    cuisine: "Italian",
    time: "25 min",
    likes: 95,
    likedByMe: false,
    followedByMe: true,
    authorId: "u3",
    author: "napoli_chef",
    comments: [],
    steps: ["Spread tomato sauce on dough, add mozzarella and basil", "Bake at 250°C for 10-12 min"]
  },
  {
    _id: "4",
    title: "Hakka Noodles",
    image: "https://source.unsplash.com/800x1200/?noodles",
    cuisine: "Chinese",
    time: "20 min",
    likes: 75,
    likedByMe: false,
    followedByMe: false,
    authorId: "u4",
    author: "wok_master",
    comments: [
      { _id: "c5", text: "Yum!", author: "noodlefan" },
      { _id: "c6", text: "Quick recipe 👌", author: "quickcooks" }
    ],
    steps: ["Boil noodles, drain and toss with oil", "Stir fry with veggies and soy sauce on high heat"]
  },
  {
    _id: "5",
    title: "Smash Burger",
    image: "https://source.unsplash.com/800x1200/?burger",
    cuisine: "American",
    time: "15 min",
    likes: 180,
    likedByMe: false,
    followedByMe: false,
    authorId: "u5",
    author: "grill_street",
    comments: [
      { _id: "c7", text: "So juicy 🤤", author: "meatmaster" }
    ],
    steps: ["Smash beef ball onto hot cast iron, season", "Assemble with caramelized onions and special sauce"]
  },
  {
    _id: "6",
    title: "Chocolate Lava Cake",
    image: "https://source.unsplash.com/800x1200/?cake",
    cuisine: "Dessert",
    time: "20 min",
    likes: 300,
    likedByMe: true,
    followedByMe: false,
    authorId: "u6",
    author: "pastry_lab",
    comments: [
      { _id: "c8", text: "Sweet perfection!", author: "dessertqueen" },
      { _id: "c9", text: "Love it ❤️", author: "chocoaddct" }
    ],
    steps: ["Mix dark chocolate with butter, add eggs and flour", "Bake at 200°C for exactly 12 min — molten center is key"]
  },
  {
    _id: "7",
    title: "Pasta Alfredo",
    image: "https://source.unsplash.com/800x1200/?pasta",
    cuisine: "Italian",
    time: "25 min",
    likes: 130,
    likedByMe: false,
    followedByMe: false,
    authorId: "u3",
    author: "napoli_chef",
    comments: [],
    steps: ["Cook fettuccine al dente", "Toss with butter, parmesan and pasta water until creamy"]
  },
  {
    _id: "8",
    title: "Chicken Curry",
    image: "https://source.unsplash.com/800x1200/?chicken-curry",
    cuisine: "Indian",
    time: "40 min",
    likes: 250,
    likedByMe: false,
    followedByMe: false,
    authorId: "u1",
    author: "chef_priya",
    comments: [
      { _id: "c10", text: "Spicy 🔥🔥", author: "heatseeker" }
    ],
    steps: ["Marinate chicken in yogurt and spices for 30 min", "Cook in onion-tomato masala until oil separates"]
  },
  {
    _id: "9",
    title: "Crispy French Fries",
    image: "https://source.unsplash.com/800x1200/?fries",
    cuisine: "Fast Food",
    time: "30 min",
    likes: 80,
    likedByMe: false,
    followedByMe: false,
    authorId: "u5",
    author: "grill_street",
    comments: [],
    steps: ["Double fry at 150°C then 190°C for ultimate crispiness", "Season immediately with sea salt"]
  },
  {
    _id: "10",
    title: "Ice Cream Sundae",
    image: "https://source.unsplash.com/800x1200/?icecream",
    cuisine: "Dessert",
    time: "5 min",
    likes: 60,
    likedByMe: false,
    followedByMe: false,
    authorId: "u6",
    author: "pastry_lab",
    comments: [
      { _id: "c11", text: "So refreshing 😍", author: "summervibes" }
    ],
    steps: ["Layer 3 scoops of vanilla ice cream in a tall glass", "Top with hot fudge, whipped cream, nuts and cherry"]
  },
  {
    _id: "11",
    title: "Cooking Reel",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    cuisine: "Test",
    time: "10 sec",
    likes: 999,
    likedByMe: false,
    followedByMe: false,
    authorId: "u7",
    author: "reelchef",
    comments: [
      { _id: "c12", text: "Video works 🎥", author: "techfoodie" }
    ],
    steps: ["Press play and enjoy the magic 🎬"]
  }
];