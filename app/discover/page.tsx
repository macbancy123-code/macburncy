"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Spirit of Timbuktu",
    subtitle: "Original",
    description:
      "A signature scent from the house of Macbancy, is the perfect everyday fragrance for the man of the day, the party enthusiast, the professional, and the sophisticated woman alike.",
    imageBg: "#1a1a2e",
    imageSrc: "/p1.jpg"
  },
  {
    id: 2,
    name: "Spirit of Timbuktu",
    subtitle: "Citrus de Medici",
    description:
      "A blend of zesty freshness of bergamot, black currant, and lemon with a hint of spicy pink pepper. The heart notes of enchanting patchouli and jasmine will captivate your senses, while the rich base notes of cedarwood and oakmoss create a lasting impression.",
    imageBg: "#2d1b0e",
    imageSrc: "/p2.jpg"
  },
  {
    id: 3,
    name: "Spirit of Timbuktu",
    subtitle: "Village Noire",
    description:
      "Is a Floral Fruity Gourmand fragrance for women and men. Top notes are Red Apple, Lichi, Black Currant and Pink Grapefruit; middle notes are Wild Berries, Raspberry Bicon; base notes are Sugar, Musk, Vanilla Flower, Amber and Moss.",
    imageBg: "#1e3a5f",
    imageSrc: "/p3.jpg"
  },
  {
    id: 4,
    name: "Woods of Oregon",
    subtitle: "Multi-colonial",
    description:
      "Is a Oriental Spicy fragrance for women and men. Top notes are Black and Pink Pepper, Black Pepper, elemi and Pink Pepper; middle notes are Olibanum and Saffron; base notes are Bourbon Vanilla, Suede and Cedar.",
    imageBg: "#1a0a00",
    imageSrc: "/p4.jpg"
  },
  {
    id: 5,
    name: "Woods of Oregon",
    subtitle: "Toffee Infernol",
    description:
      "Is a Oriental Spicy fragrance for women and men. Top notes are Cinnamon, Cherry, Sicilian Lemon and Nutmeg; middle notes are Coca-Cola, Indonesian Patchouli Leaf and Orange Blossom; base notes are Tonka Bean, Vanilla, Benzoin and Labdanum.",
    imageBg: "#3d1a00",
    imageSrc: "/p5.jpg"
  },
  {
    id: 6,
    name: "Woods of Oregon",
    subtitle: "Oud Exemo",
    description:
      "Just as the rhythm of the African drum echoes across the land, so does the scent of our beloved Oud Daema bold, timeless, and unforgettable.",
    imageBg: "#0a0a0a",
    imageSrc: "/p6.jpg"
  },
  {
    id: 7,
    name: "Woods of Oregon",
    subtitle: "Brea",
    description: "Is a Floral Woody Musk fragrance for women and men.",
    imageBg: "#003366",
    imageSrc: "/p7.jpg"
  },
  {
    id: 8,
    name: "Woods of Oregon",
    subtitle: "Side Mount",
    description:
      "Is a Woody Spicy fragrance for men and women. Top note is Whiskey; middle notes are Spicy Notes, Cinnamon an Sheabutter.",
    imageBg: "#8b1a1a",
    imageSrc: "/p8.jpg"
  },
  {
    id: 9,
    name: "The great Harvest",
    subtitle: "",
    description:
      "Is a limited edition two in one collection, musky and oriental for men and women.",
    imageBg: "#2d4a1e",
    imageSrc: "/p9.jpg"
  },
  {
    id: 10,
    name: "Colonial times",
    subtitle: "",
    description:
      "An intriguing 2-in-1 collection designed for both him and her: a bold fragrance perfect for those with complex tastes.",
    imageBg: "#1a1a3e",
    imageSrc: "/p1.jpg"
  },
  {
    id: 11,
    name: "One Sly Guy",
    subtitle: "",
    description:
      "Three distinctive fragrances that embody mystery, confidence, and charm. Which one matches your style?",
    imageBg: "#0a1a2e",
    imageSrc: "/p2.jpg"
  },
  {
    id: 12,
    name: "Spirit of Timbuktu",
    subtitle: "Kante",
    description:
      "Kante is a fragrance inspired by the legendary Mali Empire ruler Sundianguru Kante, capturing his strength, wisdom, and mystique through bold, rich notes that honor his enduring legacy.",
    imageBg: "#8b4513",
    imageSrc: "/p3.jpg"
  },
  {
    id: 13,
    name: "Spirit of Timbuktu",
    subtitle: "Sheba",
    description:
      "SHEBA is a fragrance inspired by Queen Sheba, capturing her grace, wisdom, and regal beauty. With rich, luxurious notes, it celebrates timeless femininity, strength, and elegance.",
    imageBg: "#4a0028",
    imageSrc: "/p4.jpg"
  },
  {
    id: 14,
    name: "Spirit of Timbuktu",
    subtitle: "Ndewura",
    description:
      "Ndewura is a fragrance inspired by Ndewura Jakpa, founder of the Gonja Empire. It reflects his leadership, courage, and ancestral strength with bold, earthy notes that honor tradition and vitality.",
    imageBg: "#1a3d1a",
    imageSrc: "/p5.jpg"
  },
];

function ProductRow({ product, index }: { product: typeof products[0]; index: number }) {
  const isReversed = index % 2 !== 0;

  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-20 mb-16 lg:mb-24 ${isReversed ? "lg:flex-row-reverse" : ""
        }`}
    >
      {/* Image Column */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full lg:w-[40%] flex justify-center"
      >
        <div className="relative w-full max-w-[400px] aspect-square overflow-hidden rounded-2xl shadow-lg group">
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </div>
      </motion.div>

      {/* Text Column */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        className="w-full lg:flex-1 space-y-4 text-center lg:text-left"
      >
        <div className="space-y-1">
          <h2 className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
            {product.name}
          </h2>
          {product.subtitle && (
            <p className="text-sm text-amber-600 font-medium  tracking-wide">
              {product.subtitle}
            </p>
          )}
        </div>

        <p className="text-base lg:text-lg text-zinc-500 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
          {product.description}
        </p>

        <button className="mt-4 px-8 py-3.5 bg-zinc-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-600 transition-all duration-500 shadow-md active:scale-95">
          Shop Now
        </button>
      </motion.div>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Cinematic Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Discovery Hero"
          fill
          className="object-cover scale-105"
          priority
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-amber-600 mb-4 block">
            Mac Bancy
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none ">
            Discover Our Scents
          </h1>
        </motion.div>
      </section>

      {/* Product Feed */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-24 lg:py-40">
        {products.map((product, index) => (
          <ProductRow key={product.id} product={product} index={index} />
        ))}
      </main>
    </div>
  );
}