
import { getCategories } from "@/app/actions/products";
import { ProductForm } from "@/components/admin/product-form";

export default async function NewProductPage() {
    const categories = await getCategories();

    return (
        <div className="space-y-6">
            <ProductForm categories={categories} />
        </div>
    );
}
