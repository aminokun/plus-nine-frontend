import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';

const Premium: React.FC = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [priceId, setPriceId] = useState<string | null>(null);

    const handlePurchase = async () => {
        try {
            const response = await axiosInstance.post('/Stripe/Pay', { priceId: priceId });
            console.log(response);
            if (response.data) {
                window.location.href = response.data
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get<ProductsResponse>('/Stripe/GetAllProducts');
                console.log(response);
                if (response.data.data.length > 0) {
                    setProduct(response.data.data[0]);
                    setPriceId(response.data.data[0].default_price.id);
                    console.log(priceId)
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <a onClick={handlePurchase}>
            <div className="flex justify-center items-center">
                <div className="w-[15rem] border-solo border-2 border-opacity-30 rounded-sm overflow-hidden m-[16px]">
                    <img src={product.images[0]} alt={product.name} className="w-[100%] h-auto" />
                    <div className="p-[16px]">
                        <h5 className=" text-xl">{product.name}</h5>
                        <p className="text-sm text-solo font-bold">{(product.default_price.unit_amount / 100).toFixed(2)} {product.default_price.currency.toUpperCase()}</p>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default Premium;
