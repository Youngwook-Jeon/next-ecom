import GridView from "../components/GridView";
import ProductCard from "../components/ProductCard";
import startDb from "../lib/db";
import ProductModel from "../models/productModel";

interface LatestProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  price: {
    base: number;
    discounted: number;
  };
  sale: number;
}

const fetchLatestProducts = async () => {
  await startDb();
  const products = await ProductModel.find().sort("-createdAt").limit(10);

  const productsList = products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      category: product.category,
      thumbnail: product.thumbnail.url,
      price: product.price,
      sale: product.sale,
    };
  });

  return JSON.stringify(productsList);
};

export default async function Home() {
  const latestProducts = await fetchLatestProducts();
  const parsedProducts = JSON.parse(latestProducts) as LatestProduct[];

  return (
    <GridView>
      {parsedProducts.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </GridView>
  );
}
