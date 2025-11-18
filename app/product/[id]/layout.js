import { fetchProductDetail } from "../../../lib/api";

const defaultMeta = {
  title: "Product Details",
  description:
    "Explore detailed specifications, pricing, and availability for AppleDream devices.",
  image: "/logo.png",
};

export async function generateMetadata({ params }) {
  const productId = params?.id;
  if (!productId) {
    return {
      title: defaultMeta.title,
      description: defaultMeta.description,
      openGraph: {
        images: [defaultMeta.image],
      },
      twitter: {
        images: [defaultMeta.image],
      },
    };
  }

  try {
    const response = await fetchProductDetail(productId);
    const product = response?.data;

    if (!response?.success || !product) {
      return {
        title: defaultMeta.title,
        description: defaultMeta.description,
        openGraph: {
          images: [defaultMeta.image],
        },
        twitter: {
          images: [defaultMeta.image],
        },
      };
    }

    const title = product.name
      ? `${product.name} Details`
      : defaultMeta.title;
    const description =
      product.short_description ||
      product.meta_description ||
      product.description?.replace(/<[^>]*>?/gm, "")?.slice(0, 160) ||
      defaultMeta.description;
    const image =
      product.image_path ||
      product.images?.find(Boolean) ||
      defaultMeta.image;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "product",
        images: [
          {
            url: image,
            alt: product.name || "AppleDream product",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch (error) {
    console.error("Product metadata error:", error);
    return {
      title: defaultMeta.title,
      description: defaultMeta.description,
      openGraph: {
        images: [defaultMeta.image],
      },
      twitter: {
        images: [defaultMeta.image],
      },
    };
  }
}

export default function ProductDetailLayout({ children }) {
  return <>{children}</>;
}

