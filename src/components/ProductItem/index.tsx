import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Inventory } from "../../store/inventory/types";
import { addToCart } from "../../store/cart/action";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import './index.css'

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

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

  return (
    <div className='productContainer'>
      <div className='productFigure'>
        <ProductImage src={item.image} />
      </div>
      <div className='productHeader'>{item.name}</div>
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
