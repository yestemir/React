import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";


import ProductItem from "../ProductItem";
import { ApplicationState } from "../../store";
import { Inventory } from "../../store/inventory/types";
import { fetchRequest } from "../../store/inventory/action";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import './index.css'
import RecentlyViewedProducts from "../RecentlyViewedProducts";


interface PropsFromState {
  loading: boolean;
  data: Inventory[];
  errors?: string;
}

interface propsFromDispatch {
  fetchRequest: () => any;
}

type AllProps = PropsFromState & propsFromDispatch;

const HomePage: React.FC<AllProps> = ({
  loading,
  errors,
  data,
  fetchRequest
}) => {
  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div className='container'>
      {/* <Navbar /> */}
      <div className='productListItems'>
        {data.map(item => {
          return <ProductItem key={item.id} item={item} />;
        })}
      </div>
      <RecentlyViewedProducts/>
    </div>
  );
};

const mapStateToProps = ({ inventory }: ApplicationState) => ({
  loading: inventory.loading,
  errors: inventory.errors,
  data: inventory.data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    fetchRequest: () => {
      dispatch(fetchRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
