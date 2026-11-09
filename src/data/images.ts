/**
 * Image Registry for Kusina De Isobel
 * All image URLs are defined in one place with primary URLs,
 * dish keyword fallbacks for Loremflickr, and descriptive alt text.
 */

export interface ImageSlot {
  id: string;
  primary: string;
  fallback: string;
  mobile?: string;
  alt: string;
  dishName: string;
}

export const IMAGES: Record<string, ImageSlot> = {
  // Hero Slider Slides (Root-relative paths)
  heroSlide1: {
    id: 'heroSlide1',
    primary: '/images/hero/room.jpg',
    mobile: '/images/hero/room-mobile.jpg',
    fallback: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kusina De Isobel green room with mint walls, pendant lights, checkerboard floor and glowing neon sign',
    dishName: 'The Green Room',
  },
  heroSlide2: {
    id: 'heroSlide2',
    primary: '/images/hero/eggs.jpg',
    mobile: '/images/hero/eggs-mobile.jpg',
    fallback: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=75',
    alt: 'Avocado and poached eggs on toasted sourdough with seasoning',
    dishName: 'Avocado & Poached Eggs on Toast',
  },
  heroSlide3: {
    id: 'heroSlide3',
    primary: '/images/hero/breakfast.jpg',
    fallback: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=75',
    alt: 'The Full English breakfast plate with grilled sourdough, eggs, bacon, sausage, beans and mushrooms',
    dishName: 'The Full English with Sourdough',
  },
  heroSlide4: {
    id: 'heroSlide4',
    primary: '/images/hero/sharing.jpg',
    fallback: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=75',
    alt: 'Kusina De Isobel feast table with signature sharing platter of grilled meats, fries and salads',
    dishName: 'Sharing Platter for 2',
  },
  heroSlide5: {
    id: 'heroSlide5',
    primary: '/images/hero/coffee.jpg',
    fallback: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=75',
    alt: 'Artisan caffe lattes with cocoa dusted stripes on dark cafe tables',
    dishName: 'Classic Cafe Latte',
  },

  // Hero & Ambience
  heroInterior: {
    id: 'heroInterior',
    primary: '/images/hero/room.jpg',
    fallback: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    alt: 'Warm mint green cafe interior at Kusina De Isobel with glowing neon sign, brass lighting, and checkerboard floor',
    dishName: 'Kusina De Isobel Cafe Interior',
  },
  heroBadgeDish: {
    id: 'heroBadgeDish',
    primary: '/assets/aistudio/unnamed__32__76ffe423.jpg',
    fallback: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=75',
    alt: 'Poached eggs with seasoned runny yolk over crushed avocado on toasted sourdough',
    dishName: 'Avocado & Poached Eggs',
  },
  interiorPendant: {
    id: 'interiorPendant',
    primary: '/assets/aistudio/unnamed__23__35e9f6fd.jpg',
    fallback: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=900&q=75',
    alt: 'Cozy green cafe dining room with checkerboard flooring and tan leather seating',
    dishName: 'Cafe Ambience',
  },
  chalkboardSign: {
    id: 'chalkboardSign',
    primary: '/assets/aistudio/unnamed__21__33d9cb72.jpg',
    fallback: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=75',
    alt: 'Hand-lettered chalkboard menu at Kusina De Isobel',
    dishName: 'Chalkboard Menu',
  },
  sidewalkSign: {
    id: 'sidewalkSign',
    primary: '/assets/aistudio/unnamed__20__4b162076.jpg',
    fallback: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=75',
    alt: 'Baker Street sidewalk board displaying comfort food specials',
    dishName: 'Comfort Foods Special Board',
  },
  storefront: {
    id: 'storefront',
    primary: '/assets/aistudio/unnamed__19__2590a732.jpg',
    fallback: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=75',
    alt: 'Kusina De Isobel cafe facade on Baker Street, Weybridge',
    dishName: '34 Baker Street Facade',
  },

  // Breakfast Signatures & Items
  avocadoPoachedEggs: {
    id: 'avocadoPoachedEggs',
    primary: '/assets/aistudio/unnamed__32__76ffe423.jpg',
    fallback: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=75',
    alt: 'Avocado and poached eggs on rustic sourdough with chilli flakes and olive oil',
    dishName: 'Avocado & Poached Eggs on Toast',
  },
  fullEnglish: {
    id: 'fullEnglish',
    primary: '/assets/aistudio/unnamed__30__2712779d.jpg',
    fallback: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=75',
    alt: 'The Full English breakfast with sourdough toast, butter, baked beans, hash browns and eggs',
    dishName: 'The Full English with Sourdough',
  },
  smokedSalmonPlate: {
    id: 'smokedSalmonPlate',
    primary: '/assets/aistudio/unnamed__26__babcda0d.jpg',
    fallback: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=75',
    alt: 'Smoked salmon breakfast plate with sliced avocado, poached eggs and warm toasted sourdough',
    dishName: 'Smoked Salmon Breakfast Plate',
  },
  sourdoughToastJam: {
    id: 'sourdoughToastJam',
    primary: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=75',
    fallback: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=75',
    alt: 'Artisan toasted sourdough bread served with creamy butter and fruit preserves',
    dishName: 'Toasted Sourdough with Butter & Jam',
  },
  eggsBenedict: {
    id: 'eggsBenedict',
    primary: '/assets/aistudio/unnamed__1__8298a28f.jpg',
    fallback: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=75',
    alt: 'Eggs Royale with smoked salmon, poached eggs, and silky hollandaise',
    dishName: 'Eggs Royale / Benedict',
  },
  pancakesSyrup: {
    id: 'pancakesSyrup',
    primary: '/assets/aistudio/unnamed__13__f0bdc58f.jpg',
    fallback: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=75',
    alt: 'Fluffy golden pancakes with sliced fresh banana and warm maple syrup',
    dishName: 'Buttermilk Pancakes',
  },

  // Grill Items
  sirloinSteak: {
    id: 'sirloinSteak',
    primary: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=75',
    fallback: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=75',
    alt: 'Seared Sirloin steak served with grilled tomatoes, sautéed mushrooms, golden onion rings and chips',
    dishName: 'Sirloin Steak with Onion Rings & Chips',
  },
  rumpSteak: {
    id: 'rumpSteak',
    primary: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=75',
    fallback: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=75',
    alt: 'Juicy Rump Steak with grilled tomatoes, portobello mushrooms, onion rings and rustic chips',
    dishName: 'Rump Steak with Grilled Tomatoes & Chips',
  },
  gammonSteak: {
    id: 'gammonSteak',
    primary: '/assets/aistudio/unnamed__7__bc438829.jpg',
    fallback: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=75',
    alt: 'Traditional Gammon Steak with two golden fried eggs, garden peas, and chips',
    dishName: 'Gammon Steak with 2 Fried Eggs',
  },
  cajunChicken: {
    id: 'cajunChicken',
    primary: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=75',
    fallback: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=75',
    alt: 'Chargrilled spiced Cajun chicken breast with grilled tomato, chips and salad',
    dishName: 'Cajun Chicken Breast',
  },
  beefBurger: {
    id: 'beefBurger',
    primary: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=75',
    fallback: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=900&q=75',
    alt: 'House beef burger on brioche bun with chips, crisp lettuce, tomato and mayo',
    dishName: 'Gourmet Beef Burger & Chips',
  },
  scampiChips: {
    id: 'scampiChips',
    primary: '/assets/aistudio/unnamed__8__43fa61b5.jpg',
    fallback: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=75',
    alt: 'Crispy whole-tail breaded scampi with thick cut chips, garden peas and tartar dip',
    dishName: 'Scampi, Chips & Peas',
  },

  // Sharing Platters
  sharingPlatter: {
    id: 'sharingPlatter',
    primary: '/assets/aistudio/unnamed__22__b59439ec.jpg',
    fallback: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=75',
    alt: 'Kusina De Isobel Signature Sharing Platter with steak, gammon, chicken skewers, kofte, sausage, rice, chips, onion rings and fresh salad',
    dishName: 'Signature Sharing Platter',
  },
  sharingPlatterFeast: {
    id: 'sharingPlatterFeast',
    primary: '/assets/aistudio/unnamed__5__1ff1207f.jpg',
    fallback: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=75',
    alt: 'Grand feast table with sharing platters and bowls for 4 people',
    dishName: 'Sharing Platter for 4',
  },

  // Comfort Food
  lambCurry: {
    id: 'lambCurry',
    primary: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=900&q=75',
    fallback: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=75',
    alt: 'Slow-simmered aromatic Lamb Curry served with steamed basmati rice, warm naan bread and fresh salad',
    dishName: 'Lamb Curry with Rice & Naan',
  },
  chickenCurry: {
    id: 'chickenCurry',
    primary: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=75',
    fallback: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=900&q=75',
    alt: 'Fragrant Chicken Curry in rich spiced gravy with fluffy rice and tandoori naan',
    dishName: 'Chicken Curry with Rice & Naan',
  },
  vegCurry: {
    id: 'vegCurry',
    primary: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=75',
    fallback: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=75',
    alt: 'Hearty garden vegetable curry with chickpeas, basmati rice, naan and salad',
    dishName: 'Vegetarian Curry with Rice & Naan',
  },
  chilliConCarne: {
    id: 'chilliConCarne',
    primary: 'https://images.unsplash.com/photo-1584947920406-0373e43ee3a6?auto=format&fit=crop&w=900&q=75',
    fallback: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=75',
    alt: 'Slow cooked Chilli Con Carne with savoury minced beef, kidney beans, rice and crispy tortilla chips',
    dishName: 'Chilli Con Carne with Rice & Tortilla Chips',
  },
  soupOfTheDay: {
    id: 'soupOfTheDay',
    primary: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=75',
    fallback: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=900&q=75',
    alt: 'Warm homemade soup of the day served in a rustic bowl with crusty sliced bread',
    dishName: 'Hot Soup of the Day with Bread',
  },

  // Drinks & Coffee
  flatWhite: {
    id: 'flatWhite',
    primary: '/assets/aistudio/unnamed__24__8207b2c8.jpg',
    fallback: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=75',
    alt: 'Freshly pulled artisan flat white with delicate latte art in a ceramic cup',
    dishName: 'Artisan Flat White',
  },
  cappuccino: {
    id: 'cappuccino',
    primary: '/assets/aistudio/unnamed_1f05cd0f.jpg',
    fallback: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=75',
    alt: 'Frothy cappuccino dusted with rich Belgian cocoa powder',
    dishName: 'Cappuccino with Cocoa Dust',
  },
  latte: {
    id: 'latte',
    primary: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=900&q=75',
    fallback: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=75',
    alt: 'Steamed smooth caffe latte in a tall glass',
    dishName: 'Classic Cafe Latte',
  },
  icedLatte: {
    id: 'icedLatte',
    primary: '/assets/aistudio/unnamed__25__738e42d6.jpg',
    fallback: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=75',
    alt: 'Chilled iced latte with espresso layers in a glass mason jar with drinking straw',
    dishName: 'Iced Latte in Mason Jar',
  },
  hotChocolate: {
    id: 'hotChocolate',
    primary: '/assets/aistudio/unnamed__14__ae67faac.jpg',
    fallback: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=900&q=75',
    alt: 'Creamy hot chocolate with whipped froth in an artisanal ceramic mug',
    dishName: 'Warm Hot Chocolate',
  },
  potOfTea: {
    id: 'potOfTea',
    primary: '/assets/aistudio/unnamed__14__ae67faac.jpg',
    fallback: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=75',
    alt: 'Traditional English pot of tea with milk pitcher and saucer',
    dishName: 'Pot of Tea',
  },
};
