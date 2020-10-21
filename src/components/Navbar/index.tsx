import React, {useContext} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ApplicationState } from "../../store";
import { Cart } from "../../store/cart/types";
import './index.css'
import {LanguageContext, ThemeContext} from "../../context";

interface propsFromState {
  data: Cart;
  loading: boolean;
  errors?: string;
}

type AllProps = propsFromState;

const Navbar: React.FC<AllProps> = ({ data, loading, errors, children }) => {
  const Language = useContext(LanguageContext)
  const Theme = useContext(ThemeContext)
  return (
    <div>
      <Theme>
        <div className='navHeader'>
          <Link to="/">{Language === 'RU' ? 'Продукты' : 'Products'}</Link>
        </div>
        <div className='navCart'>
          <ul>
            <Link to="/cart">Cart <div className='cartSpan'>{data.items.length}</div></Link>
            <Link to="/auth"><li>Login</li></Link>
            <Link to="/register"><li>Register</li></Link>
          </ul>
        </div>
      {children}
      </Theme>
    </div>
  );
};

const mapStateToProps = ({ cart }: ApplicationState) => ({
  data: cart.data,
  loading: cart.loading,
  errors: cart.errors
});

const mapDispatchProps = () => {};

export default connect(mapStateToProps, mapDispatchProps)(Navbar);
