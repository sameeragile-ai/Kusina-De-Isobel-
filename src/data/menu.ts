import { IMAGES, ImageSlot } from './images';

export type MenuCategory = 'all' | 'breakfast' | 'comfort' | 'grill' | 'sharing' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: MenuCategory;
  image: ImageSlot;
  isSignature?: boolean;
  specialNote?: string;
  options?: {
    name: string;
    extraPrice: number;
  }[];
}

export const CATEGORIES: { id: MenuCategory; label: string; badge?: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'breakfast', label: 'Breakfast & Brunch' },
  { id: 'comfort', label: 'Comfort Food' },
  { id: 'grill', label: 'The Grill', badge: 'Thu, Fri & Sat' },
  { id: 'sharing', label: 'Sharing Platters', badge: 'Thu, Fri & Sat' },
  { id: 'drinks', label: 'Coffee & Drinks' },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- BREAKFAST ---
  {
    id: 'avocado-poached-eggs',
    name: 'Avocado & Poached Eggs on Toast',
    price: 10.50,
    description: 'Freshly smashed avocado seasoned with sea salt flakes, extra virgin olive oil, and two perfectly poached free-range eggs on toasted sourdough.',
    category: 'breakfast',
    image: IMAGES.avocadoPoachedEggs,
    isSignature: true,
  },
  {
    id: 'full-english',
    name: 'The Full English with Sourdough',
    price: 13.50,
    description: 'Thick-cut grilled bacon, premium British sausages, two eggs to your liking, grilled vine tomatoes, sautéed field mushrooms, baked beans, crispy hash brown and toasted sourdough with Anchor butter.',
    category: 'breakfast',
    image: IMAGES.fullEnglish,
    isSignature: true,
  },
  {
    id: 'smoked-salmon-plate',
    name: 'Smoked Salmon Breakfast Plate',
    price: 13.95,
    description: 'Oak-smoked Scottish salmon ribbons, sliced ripe avocado, poached eggs, fresh lemon wedge, capers and artisanal grilled sourdough bread.',
    category: 'breakfast',
    image: IMAGES.smokedSalmonPlate,
  },
  {
    id: 'sourdough-butter-jam',
    name: 'Toasted Sourdough with Butter & Jam',
    price: 4.95,
    description: 'Two thick slices of warm artisan sourdough, served with chilled creamy butter and a choice of strawberry preserve or marmalade.',
    category: 'breakfast',
    image: IMAGES.sourdoughToastJam,
  },

  // --- COMFORT FOOD ---
  {
    id: 'lamb-curry',
    name: 'Lamb Curry with Rice & Naan',
    price: 14.50,
    description: 'Tender slow-braised lamb chunks in a deeply aromatic blend of ground spices and tomato gravy. Served with fluffy basmati rice, warm naan bread and fresh salad.',
    category: 'comfort',
    image: IMAGES.lambCurry,
  },
  {
    id: 'chicken-curry',
    name: 'Chicken Curry with Rice & Naan',
    price: 12.50,
    description: 'Marinated succulent chicken breast simmered in our signature rich spiced sauce. Served with steamed basmati rice, warm butter naan and garden salad.',
    category: 'comfort',
    image: IMAGES.chickenCurry,
  },
  {
    id: 'veg-curry',
    name: 'Vegetarian Curry with Rice & Naan',
    price: 10.50,
    description: 'Seasonal market vegetables and chickpeas gently stewed in a fragrant coconut and tomato curry broth. Accompanied by rice, warm naan and salad.',
    category: 'comfort',
    image: IMAGES.vegCurry,
  },
  {
    id: 'chilli-con-carne',
    name: 'Chilli Con Carne with Rice & Tortilla Chips',
    price: 11.50,
    description: 'Hearty slow-simmered prime minced beef with red kidney beans, sweet peppers and smoked cumin. Served over white rice with crunchy salted tortilla chips.',
    category: 'comfort',
    image: IMAGES.chilliConCarne,
  },
  {
    id: 'soup-of-the-day',
    name: 'Hot Soup of the Day with Bread',
    price: 7.50,
    description: 'Freshly prepared daily in our kitchen using wholesome seasonal ingredients. Served piping hot with thick crusty bread and butter.',
    category: 'comfort',
    image: IMAGES.soupOfTheDay,
  },

  // --- GRILL ---
  {
    id: 'sirloin-steak',
    name: 'Sirloin Steak with Onion Rings & Chips',
    price: 23.50,
    description: 'Dry-aged British 8oz sirloin seared to your liking, accompanied by chargrilled tomatoes, sautéed field mushrooms, beer-battered onion rings and golden chips.',
    category: 'grill',
    image: IMAGES.sirloinSteak,
    isSignature: true,
    specialNote: 'Available Thursday, Friday & Saturday',
  },
  {
    id: 'rump-steak',
    name: 'Rump Steak with Onion Rings & Chips',
    price: 22.50,
    description: 'Tender and full of robust flavour, grilled prime rump steak served with grilled tomatoes, button mushrooms, crispy onion rings and skin-on chips.',
    category: 'grill',
    image: IMAGES.rumpSteak,
    specialNote: 'Available Thursday, Friday & Saturday',
  },
  {
    id: 'gammon-steak',
    name: 'Gammon Steak with 2 Fried Eggs',
    price: 16.50,
    description: 'Generous cured British gammon steak chargrilled and crowned with two sunny fried eggs, sweet garden peas and thick cut chips.',
    category: 'grill',
    image: IMAGES.gammonSteak,
    specialNote: 'Available Thursday, Friday & Saturday',
  },
  {
    id: 'cajun-chicken-breast',
    name: 'Cajun Chicken Breast',
    price: 14.50,
    description: 'Plump chicken breast coated in zesty Louisiana Cajun spices, seared on the grill and served with charred tomato, chips and tossed garden salad.',
    category: 'grill',
    image: IMAGES.cajunChicken,
    specialNote: 'Available Thursday, Friday & Saturday',
  },
  {
    id: 'beef-burger',
    name: 'Classic Gourmet Beef Burger',
    price: 13.90,
    description: '100% prime British beef patty grilled and served in a toasted brioche bun with crisp iceberg lettuce, sliced beef tomato, house mayonnaise and chips.',
    category: 'grill',
    image: IMAGES.beefBurger,
    options: [
      { name: 'Add Melted Cheddar Cheese', extraPrice: 1.00 },
    ],
  },
  {
    id: 'scampi-chips-peas',
    name: 'Scampi, Chips and Peas',
    price: 11.50,
    description: 'Crisp golden breaded whole-tail Scottish scampi served with steaming hot chips, garden peas and homemade tartare sauce.',
    category: 'grill',
    image: IMAGES.scampiChips,
  },

  // --- SHARING ---
  {
    id: 'sharing-platter-2',
    name: 'Sharing Platter for 2',
    price: 35.00,
    description: 'A feast featuring tender sirloin steak slices, gammon, grilled Cajun chicken breast, Turkish kofte, spiced sausages, seasoned rice, golden chips, onion rings and crunchy fresh house salad.',
    category: 'sharing',
    image: IMAGES.sharingPlatter,
    isSignature: true,
    specialNote: 'Available Thursday, Friday & Saturday',
  },
  {
    id: 'sharing-platter-4',
    name: 'Sharing Platter for 4',
    price: 65.00,
    description: 'The ultimate table gathering! Double portions of grilled sirloin, gammon, chicken breast, kofte meatballs, artisanal sausages, bowls of rice, piled high chips, crispy onion rings and tossed salad.',
    category: 'sharing',
    image: IMAGES.sharingPlatterFeast,
    specialNote: 'Available Thursday, Friday & Saturday',
  },

  // --- DRINKS ---
  {
    id: 'flat-white',
    name: 'Flat White',
    price: 3.60,
    description: 'Double ristretto espresso shots topped with smooth, velvety steamed whole milk and delicate latte art.',
    category: 'drinks',
    image: IMAGES.flatWhite,
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    price: 3.60,
    description: 'Rich espresso with dense creamy microfoam, generously dusted with dark Belgian cocoa powder.',
    category: 'drinks',
    image: IMAGES.cappuccino,
  },
  {
    id: 'latte',
    name: 'Cafe Latte',
    price: 3.70,
    description: 'Silky espresso with gentle steamed milk and a thin layer of foam in a classic cafe glass.',
    category: 'drinks',
    image: IMAGES.latte,
  },
  {
    id: 'iced-latte',
    name: 'Iced Latte in Mason Jar',
    price: 4.50,
    description: 'Fresh espresso pulled over cold milk and crystal ice cubes, served in our signature rustic glass mason jar with a straw.',
    category: 'drinks',
    image: IMAGES.icedLatte,
  },
  {
    id: 'hot-chocolate',
    name: 'Artisan Hot Chocolate',
    price: 3.80,
    description: 'Rich melted Belgian chocolate blended with hot steamed milk and finished with dusted chocolate flakes.',
    category: 'drinks',
    image: IMAGES.hotChocolate,
  },
  {
    id: 'pot-of-tea',
    name: 'Traditional Pot of Tea',
    price: 3.20,
    description: 'A steaming freshly brewed pot of classic English Breakfast, Earl Grey, or Peppermint tea, served with fresh milk.',
    category: 'drinks',
    image: IMAGES.potOfTea,
  },
];

export const SIGNATURE_DISHES = [
  MENU_ITEMS.find(i => i.id === 'avocado-poached-eggs')!,
  MENU_ITEMS.find(i => i.id === 'full-english')!,
  MENU_ITEMS.find(i => i.id === 'sirloin-steak')!,
  MENU_ITEMS.find(i => i.id === 'sharing-platter-2')!,
];
