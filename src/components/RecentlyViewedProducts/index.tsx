import React, {useEffect, useState} from 'react'
import ProductItem, {LOCAL_STORAGE_RECENT_ITEMS_KEY} from "../ProductItem";
import {Inventory} from "../../store/inventory/types";



const RecentlyViewedProducts: React.FC = () => {
    const [items, setItems] = useState<Inventory[]>([])

    useEffect(() => {
        const storedItemsKey = localStorage.getItem(LOCAL_STORAGE_RECENT_ITEMS_KEY)
        if (storedItemsKey) {
            setItems(JSON.parse(storedItemsKey))
        }
    }, [])

    return (
        <div className='container'>
            <h1> You recently interested products</h1>
            <div className='productListItems'>
                {items.map(item => {
                    return <ProductItem key={item.id} item={item} />;
                })}
            </div>
        </div>
    );
};

export default RecentlyViewedProducts
