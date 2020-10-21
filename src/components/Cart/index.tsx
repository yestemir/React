import React, {ReactElement, useEffect, useRef} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { Cart } from "../../store/cart/types";
import './index.css'
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {addToCart, removeFromCart} from "../../store/cart/action";

interface propsFromState {
  cartItems: Cart;
  removeFromCart: (itemIndex: any) => any;
}
const CartListItemImage = styled.img`
  width: 100px;
  height: 100px;
`;

interface Props {
    cartItems: Cart;
}

type AllProps = propsFromState;

const CartComponent: React.FC<AllProps> = ({ cartItems, removeFromCart }) => {
    const totalPriceRef = useRef(null)

    useEffect(() => {
        const sumItemsPrice = cartItems.items.reduce((a, b) => a + (b.price || 0), 0);
        console.log(sumItemsPrice)
            // @ts-ignore
        totalPriceRef.current.value = sumItemsPrice
    }, [cartItems])
    return (
    <div className='cartContainer'>
      <div className='cartHeaderDiv'>
        <div className='cartHeader'>Your Cart</div>
      </div>
      <div className='cartListsDiv'>
        {cartItems.items.map((item, index) => {
          return (
            <div className='cartListItemDiv'>
              <CartListItemImage src={item.image} />
              <div className='cartListItemName'>{item.name}</div>
              <div className='cartListItemPrice'>{item.price}</div>
                <button onClick={() => removeFromCart(index) }>-</button>
            </div>
          );
        })}
      </div>
      <div className='cartResult'>
          <input ref={totalPriceRef} type="text" />
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart }: ApplicationState) => ({
  cartItems: cart.data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        removeFromCart: (itemIndex: any) => dispatch(removeFromCart(itemIndex))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
