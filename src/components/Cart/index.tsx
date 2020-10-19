import React, {ReactElement} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { Cart } from "../../store/cart/types";
import './index.css'

interface propsFromState {
  cartItems: Cart;
}
const CartListItemImage = styled.img`
  width: 100px;
  height: 100px;
`;

interface Props {
    cartItems: Cart;
}

type AllProps = propsFromState;

// export default function CartComponent({cartItems}: Props): ReactElement {
const CartComponent: React.FC<AllProps> = ({ cartItems }) => {
  console.log("cartItems", cartItems);
  return (
    <div className='cartContainer'>
      <div className='cartHeaderDiv'>
        <div className='cartHeader'>Your Cart</div>
      </div>
      <div className='cartListsDiv'>
        {cartItems.items.map(item => {
          return (
            <div className='cartListItemDiv'>
              <CartListItemImage src={item.image} />
              <div className='cartListItemName'>{item.name}</div>
              <div className='cartListItemPrice'>{item.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart }: ApplicationState) => ({
  cartItems: cart.data
});

const mapDispatchProps = () => {};

export default connect(mapStateToProps, mapDispatchProps)(CartComponent);
