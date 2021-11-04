import {
    Button, Dialog,
    DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../actions/cartAction';
import {
    clearErrors,
    getProductDetails,
    newReview
} from '../../actions/productAction';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { Loader } from "../layout/Loader/Loader";
import { MetaData } from '../layout/MetaData';
import './ProductDetails.css';
import { ReviewCard } from './ReviewCard';

export const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    // const alert = useAlert();
    const { product, loading, error } = useSelector((state) => state.productDetails);

    const {success, error:reviewError} =useSelector((state) => state.newReview);

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      };
    
      const [quantity, setQuantity] = useState(1);
      const [open, setOpen] = useState(false);
      const [rating, setRating] = useState(0);
      const [comment, setComment] = useState("");
         
      const increaseQuantity=() => {
          if(product.stock <= quantity){
              return;
          }
          else{
              const qty=quantity +1;
              setQuantity(qty);
          }
      }

      const decreaseQuantity=() => {
        if(quantity <=1){
            return;
        }
        else{
            const qty=quantity -1;
            setQuantity(qty);
        }
    }

    const addToCartHandler=() => {
        dispatch(addItemToCart(match.params.id, quantity));
        alert.success("Item Added to Cart");
    }

    const submitReviewToggle=() => {
        open ? setOpen(false): setOpen(true);
    }

    const reviewSubmitHandler=()=>{
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", match.params.id);
        dispatch(newReview(myForm));
        setOpen(false);
    }

    useEffect(() => {
        if(error){
            //alert.error(error);
            console.log(error);
            dispatch(clearErrors());
        }
        if(reviewError){
            // alert.error(reviewError);
            console.log(error);
            dispatch(clearErrors());
        }
        if(success){
            // alert.success("Review Sumbit Successfully");
            dispatch({type:NEW_REVIEW_RESET});
        }
        dispatch(getProductDetails(match.params.id));
    },[dispatch, error, reviewError, success,match.params.id]);

    return (
        <Fragment>
            {loading ?(<Loader />):
            (<Fragment>
                <MetaData title={`${product.name} -- ECOMMERCE`} />
                <div className="ProductDetails">
                    <div>
                        <Carousel>
                            {product.images && product.images.map((item,i)=>(
                                <img className="carouselImage"
                                    key={i}
                                    src={item.url}
                                    alt={`${i} slide`}
                                    />
                            ))}
                        </Carousel>
                    </div>
                    <div>
                        <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>product # {product._id}</p>
                        </div>
                        <div className="detailsBlock-2">
                            <Rating {...options} />
                            <span className="detailsBlock-2-span">
                                {"  "}
                                ({product.numOfReviews} Reviews)
                            </span>
                        </div>
                        <div className="detailsBlock-3">
                                <h1>{`$${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button disabled={product.stock <1 ? true: false} onClick={addToCartHandler}>
                                        Add to Cart
                                    </button>
                                </div>
                                <p>
                                    Status:
                                    <b className={product.stock <1 ? "redColor" :"greenColor"}>
                                        {product.stock <1 ? "outOfStock": "InStock"}
                                    </b>
                                </p>
                        </div>
                        <div className="detailsBlock-4">
                            Description: <p>{product.description}</p>
                        </div>
                        <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>  
                    </div>
                </div>
                <h3 className="reviewsHeading">REVIEWS</h3>
                <Dialog 
                    aria-labelledby='simple-dialog-title'
                    open={open}
                    onClose={submitReviewToggle}
                >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="submitDialog">
                        <Rating 
                            onChange={(e) =>setRating(e.target.value)}
                            value={rating}
                            size="large"
                        />
                        <textarea 
                            className="submitDialogTextArea"
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e)=>setComment(e.target.value)}
                        >
                        </textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                        <Button onClick={reviewSubmitHandler} color="primary">Submit</Button>
                    </DialogActions>
                </Dialog>
                {product.reviews && product.reviews[0] ? (
                    <div className="reviews">
                    {product.reviews &&
                        product.reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                        ))}
                    </div>
                ) : (
                    <p className="noReviews">No Reviews Yet</p>
                )}
            </Fragment>
            )}
        </Fragment>
        
    )
}
