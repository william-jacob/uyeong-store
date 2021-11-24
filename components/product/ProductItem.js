import React, { useContext } from "react";
import Link from "next/link";
import { DataContext } from "../../store/globalState";
import { addToCart } from "../../store/actions";
import { TYPES } from "../../store/types";

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(DataContext);
  const { notify, cart } = state; //[ product:{제품정보}, ... ]

  const onClickCart = () => {
    //성공메세지
    dispatch({
      type: TYPES.NOTIFY,
      payload: { success: "added to cart" },
    });
    //카트에 더하기
    return dispatch(addToCart(product, cart));
  };

  const userLink = () => {
    return (
      <>
        {/* View */}
        <Link href={`/product/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            View
          </a>
        </Link>
        {/* Buy */}
        <button
          className="btn btn-success"
          style={{ marginLeft: "5px", flex: 1 }}
          disabled={product.inStock === 0 ? true : false}
          onClick={onClickCart}
        >
          Cart
        </button>
      </>
    );
  };

  return (
    // 부트스트랩 4 - card
    // class, style >> className, style={{}}
    <div className="card" style={{ width: "18rem" }}>
      {/* image */}
      <img
        className="card-img-top"
        src={product.images[0].url}
        alt={product.images[0].url}
      />

      <div className="card-body">
        {/* title (+text-capitalize: 첫글자만 대문자로)*/}
        <h5 className="card-title text-capitalize">{product.title}</h5>

        {/* price && stock (+ 양쪽으로 배치) */}
        <div className="row justify-content-between mx-0">
          <h6 className="text-danger">${product.price}</h6>
          {product.inStock > 0 ? (
            <h6 className="text-danger">In Stock: {product.inStock}</h6>
          ) : (
            <h6 className="text-danger">Out Stock</h6>
          )}
        </div>

        {/* description */}
        <p className="card-text">{product.description.substr(0, 80) + "..."}</p>

        {/* button - View, Buy (+ 양쪽으로 배치) */}
        <div className="row justify-content-between mx-0">{userLink()}</div>
      </div>
    </div>
  );
};

//데이터 구조
//   products: [
//     {
//       _id: '618b6f0411620e27043a7307',
//       images: [Array]>>[ {"public_id":~, "url":~}, ... ],
//       checked: false,
//       inStock: 500,
//       sold: 0,
//       title: 'Lorem',
//       price: 5,
//       description: "~"
//     },
//     ...

export default ProductItem;
