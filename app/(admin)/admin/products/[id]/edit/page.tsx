
import { getCategories, getProductById } from "@/app/actions/products";
import { ProductForm } from "@/components/admin/product-form";
import { notFound } from "next/navigation";

interface EditProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProductPage(props: EditProductPageProps) {
    const params = await props.params;
    const [product, categories] = await Promise.all([
        getProductById(params.id),
        getCategories()
    ]);

    if (!product) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <ProductForm categories={categories} product={product} />
        </div>
    );
}
