import {
  PlusCircleIcon,
  ViewGridIcon,
  HeartIcon,
  ShoppingBagIcon,
  ChatIcon,
} from "@heroicons/react/outline";



export const navigationItems = [
  {
    label: "Add an Advertisement",
    icon: <PlusCircleIcon />,
    path: "/user-page/add-product",
  },
  {
    label: "My Products",
    icon: <ViewGridIcon />,
    path: "/user-page/my-ads",
  },
  {
    label: "Favorites",
    icon: <HeartIcon />,
    path: "/user-page/favorites",
  },
  {
    label: "Cart",
    icon: <ShoppingBagIcon />,
    path: "/user-page/cart",
  },
  {
    label: "Messages",
    icon: <ChatIcon />,
    path: "/user-page/messages",
  },
];

export const departments = [
  {
    id: 1,
    name: "electronics",
    subDepartments: [
      {
        id: 2,
        name: "smartphones",
      },
      {
        id: 3,
        name: "laptops",
      },
      {
        id: 4,
        name: "headphones",
      },
      {
        id: 5,
        name: "smartwatches",
      },
      {
        id: 6,
        name: "cameras",
      },
    ],
  },
  {
    id: 7,
    name: "clothing",
    subDepartments: [
      {
        id: 8,
        name: "mens-clothing",
      },
      {
        id: 9,
        name: "womens-clothing",
      },
      {
        id: 10,
        name: "shoes",
      },
      {
        id: 11,
        name: "accessories",
      },
    ],
  },
  {
    id: 12,
    name: "home and kitchen",
    subDepartments: [
      {
        id: 13,
        name: "appliances",
      },
      {
        id: 14,
        name: "decor",
      },
      {
        id: 15,
        name: "kitchenware",
      },
      {
        id: 16,
        name: "furniture",
      },
    ],
  },
  {
    id: 17,
    name: "sports and fitness",
    subDepartments: [
      {
        id: 18,
        name: "exercise equipment",
      },
      {
        id: 19,
        name: "athletic wear",
      },
      {
        id: 20,
        name: "running gear",
      },
      {
        id: 21,
        name: "yoga and pilates",
      },
    ],
  },
  {
    id: 22,
    name: "watches and jewelry",
    subDepartments: [
      {
        id: 23,
        name: "wristwatches",
      },
      {
        id: 24,
        name: "necklaces",
      },
      {
        id: 25,
        name: "bracelets",
      },
      {
        id: 26,
        name: "earrings",
      },
    ],
  },
  {
    id: 27,
    name: "toys and games",
    subDepartments: [
      {
        id: 28,
        name: "educational toys",
      },
      {
        id: 29,
        name: "board games",
      },
      {
        id: 30,
        name: "building blocks",
      },
      {
        id: 31,
        name: "action figures",
      },
    ],
  },
  {
    id: 32,
    name: "books and stationery",
    subDepartments: [
      {
        id: 33,
        name: "fiction",
      },
      {
        id: 34,
        name: "non-fiction",
      },
      {
        id: 35,
        name: "notebooks",
      },
      {
        id: 36,
        name: "pens and pencils",
      },
    ],
  },
  {
    id: 37,
    name: "health and beauty",
    subDepartments: [
      {
        id: 38,
        name: "skincare",
      },
      {
        id: 39,
        name: "haircare",
      },
      {
        id: 40,
        name: "makeup",
      },
      {
        id: 41,
        name: "vitamins and supplements",
      },
    ],
  },
  {
    id: 42,
    name: "outdoor and camping",
    subDepartments: [
      {
        id: 43,
        name: "tents",
      },
      {
        id: 44,
        name: "sleeping bags",
      },
      {
        id: 45,
        name: "camping cookware",
      },
      {
        id: 46,
        name: "hiking gear",
      },
    ],
  },
];


export const  defaultMessage = (userName) => `🎉 Welcome ${userName} to shopCraft! We're thrilled to have you on board! Explore a world of unique products, personalized just for you. Whether you're here to discover, buy, or sell, we've got you covered. ✨ What's new? Check out our latest arrivals and exclusive deals – there's always something exciting happening here! 🛒 Your Cart Awaits Found something you love? Add it to your cart and proceed to checkout whenever you're ready. We'll make sure your shopping experience is seamless. 💖 Favorites Create a wishlist of your favorite items! It's the perfect way to keep track of what catches your eye. 🌟 Rate & Review Share your thoughts! Your feedback helps our community make informed decisions. Rate and review products to let others know about your experience. 💬 Chat with Sellers Have questions about a product? Strike up a conversation with the seller. Our messaging feature makes it easy to connect and get the information you need 🔧 Customize Your Profile.  Add a profile picture, update your preferences, and let others know a bit about you. Happy shopping! If you have any questions or need assistance, feel free to reach out. We're here to make your experience unforgettable.`;
