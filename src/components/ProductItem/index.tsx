import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Inventory } from "../../store/inventory/types";
import { addToCart } from "../../store/cart/action";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import './index.css'
import {Link} from "react-router-dom";

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

export const LOCAL_STORAGE_RECENT_ITEMS_KEY = 'items.recently_viewed'


interface propsFromComponent {
  item: Inventory;
}

interface propsFromDispatch {
  addToCart: (item: any) => any;
}

type Props = propsFromComponent & propsFromDispatch;

const ProductItem: React.FC<Props> = ({ item, addToCart }) => {
  const AddItemToCart = (item: any) => {
    addToCart(item);
  };


  const handleOpenItem = (currentItem: Inventory) => {
      const recentlyViewedItemsKey = localStorage.getItem(LOCAL_STORAGE_RECENT_ITEMS_KEY)
      if (recentlyViewedItemsKey) {
          let recentlyViewedItems = JSON.parse(recentlyViewedItemsKey)
          if (recentlyViewedItems.some((s: Inventory) => s.id === currentItem.id) === false)
              localStorage.setItem(LOCAL_STORAGE_RECENT_ITEMS_KEY, JSON.stringify([...recentlyViewedItems, item]))
      }
      else
          localStorage.setItem(LOCAL_STORAGE_RECENT_ITEMS_KEY, JSON.stringify([currentItem]))
  }


  return (
    <div className='productContainer'>
      <div className='productFigure'>
        <ProductImage src={item.image} />
      </div>
        <Link to={'/items/' + item.id}><div onClick={() => handleOpenItem(item)} className='productHeader'>{item.name}</div></Link>
      <div className='productDescriptionDiv'>
        <div className='productBrandText'>{item.brand}</div>
        <div className='addToCart' onClick={() => AddItemToCart(item)}>Add To Cart</div>
      </div>
    </div>
  );
};

const mapStateToProps = () => {};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    addToCart: (item: any) => dispatch(addToCart(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
