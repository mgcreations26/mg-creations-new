import { getCategories } from "@/lib/sheets";
import CategoryClient from "./CategoryClient";

export default async function CategoriesPage() {
    const categories = await getCategories();

    return <CategoryClient categories={categories} />;
}