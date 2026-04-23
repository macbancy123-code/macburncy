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
    layout: "image-left",
    imageBg: "#1a1a2e",
    imageSrc: "/p1.jpg"
  },
  {
    id: 2,
    name: "Spirit of Timbuktu",
    subtitle: "Citrus de Medici",
    description:
      "A blend of zesty freshness of bergamot, black currant, and lemon with a hint of spicy pink pepper. The heart notes of enchanting patchouli and jasmine will captivate your senses, while the rich base notes of cedarwood and oakmoss create a lasting impression.",
    layout: "text-full-image-right",
    imageBg: "#2d1b0e",
    imageSrc: "/p2.jpg"
  },
  {
    id: 3,
    name: "Spirit of Timbuktu",
    subtitle: "Village Noire",
    description:
      "Is a Floral Fruity Gourmand fragrance for women and men. Top notes are Red Apple, Lichi, Black Currant and Pink Grapefruit; middle notes are Wild Berries, Raspberry Bicon; base notes are Sugar, Musk, Vanilla Flower, Amber and Moss.",
    layout: "image-left",
    imageBg: "#1e3a5f",
    imageSrc: "/p3.jpg"
  },
  {
    id: 4,
    name: "Woods of Oregon",
    subtitle: "Multi-colonial",
    description:
      "Is a Oriental Spicy fragrance for women and men. Top notes are Black and Pink Pepper, Black Pepper, elemi and Pink Pepper; middle notes are Olibanum and Saffron; base notes are Bourbon Vanilla, Suede and Cedar.",
    layout: "text-full-image-right",
    imageBg: "#1a0a00",
    imageSrc: "/p4.jpg"
  },
  {
    id: 5,
    name: "Woods of Oregon",
    subtitle: "Toffee Infernol",
    description:
      "Is a Oriental Spicy fragrance for women and men. Top notes are Cinnamon, Cherry, Sicilian Lemon and Nutmeg; middle notes are Coca-Cola, Indonesian Patchouli Leaf and Orange Blossom; base notes are Tonka Bean, Vanilla, Benzoin and Labdanum.",
    layout: "image-left",
    imageBg: "#3d1a00",
    imageSrc: "/p5.jpg"
  },
  {
    id: 6,
    name: "Woods of Oregon",
    subtitle: "Oud Exemo",
    description:
      "Just as the rhythm of the African drum echoes across the land, so does the scent of our beloved Oud Daema bold, timeless, and unforgettable.",
    layout: "text-full-image-right",
    imageBg: "#0a0a0a",
    imageSrc: "/p6.jpg"
  },
  {
    id: 7,
    name: "Woods of Oregon",
    subtitle: "Brea",
    description: "Is a Floral Woody Musk fragrance for women and men.",
    layout: "image-left",
    imageBg: "#003366",
    imageSrc: "/p7.jpg"
  },
  {
    id: 8,
    name: "Woods of Oregon",
    subtitle: "Side Mount",
    description:
      "Is a Woody Spicy fragrance for men and women. Top note is Whiskey; middle notes are Spicy Notes, Cinnamon an Sheabutter.",
    layout: "text-full-image-right",
    imageBg: "#8b1a1a",
    imageSrc: "/p8.jpg"
  },
  {
    id: 9,
    name: "The great Harvest",
    subtitle: "",
    description:
      "Is a limited edition two in one collection, musky and oriental for men and women.",
    layout: "image-left",
    imageBg: "#2d4a1e",
    imageSrc: "/p9.jpg"
  },
  {
    id: 10,
    name: "Colonial times",
    subtitle: "",
    description:
      "An intriguing 2-in-1 collection designed for both him and her: a bold fragrance perfect for those with complex tastes.",
    layout: "text-full-image-right",
    imageBg: "#1a1a3e",
    imageSrc: "/p1.jpg"
  },
  {
    id: 11,
    name: "One Sly Guy",
    subtitle: "",
    description:
      "Three distinctive fragrances that embody mystery, confidence, and charm. Which one matches your style?",
    layout: "image-left",
    imageBg: "#0a1a2e",
    imageSrc: "/p2.jpg"
  },
  {
    id: 12,
    name: "Spirit of Timbuktu",
    subtitle: "Kante",
    description:
      "Kante is a fragrance inspired by the legendary Mali Empire ruler Sundianguru Kante, capturing his strength, wisdom, and mystique through bold, rich notes that honor his enduring legacy.",
    layout: "text-full-image-right",
    imageBg: "#8b4513",
    imageSrc: "/p3.jpg"
  },
  {
    id: 13,
    name: "Spirit of Timbuktu",
    subtitle: "Sheba",
    description:
      "SHEBA is a fragrance inspired by Queen Sheba, capturing her grace, wisdom, and regal beauty. With rich, luxurious notes, it celebrates timeless femininity, strength, and elegance.",
    layout: "image-left",
    imageBg: "#4a0028",
    imageSrc: "/p4.jpg"
  },
  {
    id: 14,
    name: "Spirit of Timbuktu",
    subtitle: "Ndewura",
    description:
      "Ndewura is a fragrance inspired by Ndewura Jakpa, founder of the Gonja Empire. It reflects his leadership, courage, and ancestral strength with bold, earthy notes that honor tradition and vitality.",
    layout: "text-full-image-right",
    imageBg: "#1a3d1a",
    imageSrc: "/p5.jpg"
  },
];

function ProductImage({ src, name }: { src: string; name: string }) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "1/1",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      }}
    >
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 hover:scale-110"
      />
    </div>
  );
}

function ProductRow({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const isImageLeft = product.layout === "image-left";

  if (isImageLeft) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "center",
          marginBottom: "64px",
        }}
      >
        <div style={{ maxWidth: "400px" }}>
          <ProductImage src={product.imageSrc} name={product.name} />
        </div>
        <div>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#111",
              marginBottom: "4px",
              fontFamily: "Georgia, serif",
            }}
          >
            {product.name}
          </h2>
          {product.subtitle && (
            <p
              style={{
                fontSize: "13px",
                color: "#888",
                marginBottom: "16px",
                fontStyle: "italic",
              }}
            >
              ({product.subtitle})
            </p>
          )}
          <p
            style={{
              fontSize: "15px",
              color: "#444",
              lineHeight: "1.75",
              maxWidth: "480px",
            }}
          >
            {product.description}
          </p>
          <button
            style={{
              marginTop: "24px",
              padding: "10px 28px",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "9999px",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Shop Now
          </button>
        </div>
      </motion.div>
    );
  }

  // text-full-image-right: full-width text block above, then image on the right
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      style={{ marginBottom: "64px" }}
    >
      {/* Full-width text row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#111",
              marginBottom: "4px",
              fontFamily: "Georgia, serif",
            }}
          >
            {product.name}
          </h2>
          {product.subtitle && (
            <p
              style={{
                fontSize: "13px",
                color: "#888",
                marginBottom: "16px",
                fontStyle: "italic",
              }}
            >
              ({product.subtitle})
            </p>
          )}
          <p
            style={{
              fontSize: "15px",
              color: "#444",
              lineHeight: "1.75",
            }}
          >
            {product.description}
          </p>
          <button
            style={{
              marginTop: "24px",
              padding: "10px 28px",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "9999px",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Shop Now
          </button>
        </div>
        <div style={{ maxWidth: "400px", marginLeft: "auto" }}>
          <ProductImage src={product.imageSrc} name={product.name} />
        </div>
      </div>
    </motion.div>
  );
}

export default function DiscoverPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Georgia, serif" }}>

      {/* HERO */}
      <div
        style={{
          height: "60vh",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          src="/hero.jpg"
          alt="Hero Background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.1))"
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Nav hint */}
          <div style={{ marginBottom: "48px" }}>
            <span
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "13px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Macbancy
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: "700",
              color: "#fff",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              margin: 0,
              lineHeight: 1.1,
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            Discover Our Scents
          </h1>
        </motion.div>
      </div>

      {/* PRODUCTS */}
      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "80px 48px",
        }}
      >
        {products.map((product, index) => (
          <ProductRow key={product.id} product={product} index={index} />
        ))}
      </main>

      {/* FOOTER */}
      <footer
        style={{
          background: "#111",
          color: "#fff",
          padding: "60px 48px 32px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "12px",
                color: "#fff",
              }}
            >
              Mac&Bancy
            </div>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.6", maxWidth: "240px" }}>
              Bold African Luxury Scent
            </p>
          </div>

          {/* About */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "16px",
                color: "#fff",
              }}
            >
              About
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Shop Now", "Discover", "Contact Us"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{
                      fontSize: "13px",
                      color: "#888",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "16px",
                color: "#fff",
              }}
            >
              Contact Us
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Jontare97@gmail.com",
                "0242250574",
                "Ghana — West Africa",
              ].map((item) => (
                <li key={item}>
                  <span style={{ fontSize: "13px", color: "#888" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "16px",
                color: "#fff",
              }}
            >
              Socials
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Instagram", "Twitter", "Facebook", "Tiktok", "Snapchat"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{
                      fontSize: "13px",
                      color: "#888",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            borderTop: "1px solid #333",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "12px", color: "#666" }}>
            2025 MacBancy. All rights reserved.
          </span>
          <span style={{ fontSize: "12px", color: "#666" }}>
            @macbancy_perfumes
          </span>
        </div>
      </footer>
    </div>
  );
}