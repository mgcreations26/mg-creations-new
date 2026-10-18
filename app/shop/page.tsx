import { getProducts, getCollections } from "@/lib/sheets";
import ShopClient from "./ShopClient";

export default async function ShopPage() {
    const [products, collections] = await Promise.all([
        getProducts(),
        getCollections(),
    ]);

    return <ShopClient products={products} collections={collections} />;
}
