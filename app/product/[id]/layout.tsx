import { Metadata } from "next";
import { getProduct } from "@/lib/firestore";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const product = await getProduct(id);

    if (!product) {
      return {
        title: "Product Not Found | Mac Bancy Perfume",
      };
    }

    return {
      title: `${product.name} | Mac Bancy Perfume`,
      description: product.description,
      openGraph: {
        title: `${product.name} | Mac Bancy Perfume`,
        description: product.description,
        images: [
          {
            url: product.imageSrc,
            width: 800,
            height: 800,
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} | Mac Bancy Perfume`,
        description: product.description,
        images: [product.imageSrc],
      },
    };
  } catch (error) {
    return {
      title: "Product | Mac Bancy Perfume",
    };
  }
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
