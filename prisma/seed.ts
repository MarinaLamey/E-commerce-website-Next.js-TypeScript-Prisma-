import prisma from "../lib/db";







async function main() {

  
  const user = await prisma.user.upsert({
   where: { id: 1 }, // أو استخدم الـ email لو هو اللي unique عندك
  update: {}, // مش هنغير حاجة لو موجود
  create: {
    id: 1,
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName:"User",
    password:"negma@1999",
    confirmPassword:"negma@1999",
    isAdmin:true
  },
  });


   const categories = [
  {  name: "Electronics", imgSrc: "https://images.unsplash.com/photo-1498049794561-7780e7231661&w=400&q=80&fm=webp" },
  {  name: "Fashion", imgSrc: "https://images.unsplash.com/photo-1445205170230-053b83016050&w=400&q=80&fm=webp" } ,
  {name: "f", imgSrc: "https://images.unsplash.com/photo-1510082460461-62a0f312e2e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=400&q=80&fm=webp" },
  {  name: "Beauty", imgSrc: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=400&q=80&fm=webp" },
  { name: "Sports", imgSrc: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  const products = [
  // --- Electronics (CategoryId: 1) ---
  {
    name: "MacBook Pro M3",
    description: "High performance laptop for developers and creators.",
    price: 1999.99,
    stock: 10,
    imgSrc: "https://images.unsplash.com/photo-1517336714460-4c50d9170f1a?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 1,
    isBestseller:true,
    isOffer:false
  },
  {
    name: "iPhone 15 Pro",
    description: "Titanium design with the most advanced camera system.",
    price: 1099.99,
    stock: 15,
    imgSrc: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 1,
    isBestseller:true,
     isOffer:true
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancelling wireless headphones.",
    price: 349.50,
    stock: 20,
    imgSrc: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 1,
    isBestseller:false,
     isOffer:false

  },
  {
    name: "Apple Watch Series 9",
    description: "Smarter, brighter, and more powerful smartwatch.",
    price: 399.00,
    stock: 8,
    imgSrc: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 1,
    isBestseller:true,
     isOffer:false
  },
  {
    name: "Gaming Mouse RGB",
    description: "High precision mouse for professional gamers.",
    price: 79.99,
    stock: 25,
    imgSrc: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 1,
     isBestseller:false,
      isOffer:true
  },

  // --- Fashion (CategoryId: 2) ---
  {
    name: "Premium Cotton T-Shirt",
    description: "100% organic cotton, breathable and comfortable.",
    price: 25.00,
    stock: 50,
    imgSrc: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 2,
     isBestseller:false,
      isOffer:false
  },
  {
    name: "Classic Denim Jeans",
    description: "Timeless blue jeans with a perfect slim fit.",
    price: 55.00,
    stock: 30,
    imgSrc: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 2,
    isBestseller:true,
     isOffer:false
  },
  {
    name: "Leather Street Jacket",
    description: "Stylish black leather jacket for all seasons.",
    price: 150.00,
    stock: 12,
    imgSrc: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 2,
     isBestseller:false,
      isOffer:false
  },
  {
    name: "Active Running Shoes",
    description: "Lightweight shoes for maximum performance.",
    price: 89.99,
    stock: 20,
    imgSrc: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 2,
    isBestseller:true,
     isOffer:true
  },
  {
    name: "Luxury Sunglasses",
    description: "UV protection with a designer frame.",
    price: 120.00,
    stock: 15,
    imgSrc: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 2,
     isBestseller:false,
      isOffer:false
  },

  // --- Home (CategoryId: 3) ---
  {
    name: "Minimalist Table Lamp",
    description: "Warm LED light with a modern wooden base.",
    price: 65.00,
    stock: 15,
    imgSrc: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 3,
    isBestseller:true,
     isOffer:true
  },
  {
    name: "Handmade Ceramic Vase",
    description: "Elegant decorative vase for modern interiors.",
    price: 40.00,
    stock: 10,
    imgSrc: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 3,
     isBestseller:false,
      isOffer:false
  },
  {
    name: "Velvet Accent Chair",
    description: "Luxury sitting chair for living rooms.",
    price: 210.00,
    stock: 5,
    imgSrc: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 3,
    isBestseller:true,
     isOffer:true
  },
  {
    name: "Wooden Wall Clock",
    description: "Silent movement with a natural wood finish.",
    price: 45.00,
    stock: 14,
    imgSrc: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 3,
     isBestseller:false,
      isOffer:false
  },
  {
    name: "Indoor Palm Plant",
    description: "Easy-to-care plant to refresh your home air.",
    price: 35.00,
    stock: 20,
    imgSrc: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 3,
    isBestseller:false,
     isOffer:false
  },

  // --- Beauty (CategoryId: 4) ---
  {
    name: "Vitamin C Serum",
    description: "Brightening face serum for healthy skin.",
    price: 38.50,
    stock: 40,
    imgSrc: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 4,
     isBestseller:false,
      isOffer:true
  },
  {
    name: "Matte Red Lipstick",
    description: "Long-lasting color with a smooth finish.",
    price: 24.00,
    stock: 50,
    imgSrc: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 4,
    isBestseller:true,
     isOffer:false
  },
  {
    name: "Luxury Floral Perfume",
    description: "Elegant scent that lasts all day.",
    price: 95.00,
    stock: 12,
    imgSrc: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 4,
    isBestseller:true,
     isOffer:false
  },
  {
    name: "Organic Face Oil",
    description: "Deep hydration with natural ingredients.",
    price: 30.00,
    stock: 25,
    imgSrc: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 4,
    isBestseller:true,
     isOffer:false
  },
  {
    name: "Makeup Brush Set",
    description: "12 professional brushes for perfect makeup.",
    price: 45.00,
    stock: 15,
    imgSrc: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 4,
     isBestseller:false,
      isOffer:false
  },

  // --- Sports (CategoryId: 5) ---
  {
    name: "Yoga Mat Pro",
    description: "Extra thick, non-slip mat for all exercises.",
    price: 35.00,
    stock: 35,
    imgSrc: "https://images.unsplash.com/photo-1592432678896-3394c8e7751c?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 5,
    isBestseller:true,
     isOffer:true
  },
  {
    name: "Adjustable Dumbbells",
    description: "Steel weight set for home strength training.",
    price: 110.00,
    stock: 10,
    imgSrc: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 5,
    isBestseller:true,
     isOffer:false
  },
  {
    name: "Steel Water Bottle",
    description: "Insulated 1L bottle for gym and outdoors.",
    price: 18.00,
    stock: 100,
    imgSrc: "https://images.unsplash.com/photo-1602143393494-143890382216?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 5,
     isBestseller:false,
      isOffer:true
  },
  {
    name: "Training Backpack",
    description: "Water-resistant bag with a shoe compartment.",
    price: 60.00,
    stock: 20,
    imgSrc: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 5,
    isBestseller:true,
     isOffer:false
  },
  {
    name: "Digital Jump Rope",
    description: "Speed rope with an automatic calorie counter.",
    price: 20.00,
    stock: 60,
    imgSrc: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=600&h=600&fit=crop",
    userId: 1,
    categoryId: 5,
     isBestseller:false,
      isOffer:true
  }
];
  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });

  console.log("Seed completed successfully! ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });