import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import {Cart} from "../../store/cart/types";
import './index.css'
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {removeFromCart} from "../../store/cart/action";
import {Link} from "react-router-dom";

interface propsFromState {
  cartItems: Cart;
  removeFromCart: (itemIndex: any) => any;
}
const CartListItemImage = styled.img`
  width: 180px;
  height: 100px;
`;

type AllProps = propsFromState;

const CartComponent: React.FC<AllProps> = ({ cartItems, removeFromCart }) => {
    const totalPriceRef = useRef(null)

    useEffect(() => {
        if (cartItems.items.length > 0) {
            // @ts-ignore
            totalPriceRef.current.value = cartItems.items.reduce((a, b) => a + (b.price || 0), 0)
        }
    }, [cartItems])

    return (
    <div className='container'>
        <div className="cartContainer">
            <div className='cartHeaderDiv'>
                <h3>Your Cart</h3>
            </div>
            <div className='cartListsDiv'>
                {cartItems.items.map((item, index) => {
                    return (
                        <div key={index} className='cartListItemDiv'>
                            <CartListItemImage src={item.image} />
                            <Link to={'/items/' + item.id}>  <div className='cartListItemName'>{item.name}</div></Link>
                            <div className='cartListItemPrice'>{item.price}</div>
                            <button onClick={() => removeFromCart(index) }>-</button>
                        </div>
                    );
                })}
            </div>
        </div>
        {cartItems.items.length > 0 &&
        <div className="cart-total">
            <h5>Total price: <input ref={totalPriceRef} type="text" readOnly={true}/></h5>
            <button className="addToCart"> Order</button>
        </div>
        }
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
