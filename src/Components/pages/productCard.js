import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import '../../Assets/css/productCard.min.css';

class ProductCard extends Component {
    constuctor() {
        this.handleProductClick = this.handleProductClick.bind(this);
    }

    getImageStyles(imgUrl) {
        let bgStyle = {"background": "url("+imgUrl+")"  };
        return bgStyle;
    }

    handleProductClick() {
        let { history } = this.props;
        history.push({
            pathname: '/product/'+this.props.productDetails._id
        });
    }

    render()  {
		return (
			<div className="product-card" onClick={this.handleProductClick.bind(this)} key={this.props.productDetails._id}>
                <div className="card hoverable">
                    <div className="card-content">
                        <div className="product-image-wrapper">
                            <div className="image-prod" style={this.getImageStyles(this.props.productDetails.images[0])}></div>
                        </div>
                        <div className="product-name-wrapper">
                            <span className="card-title">{this.props.productDetails.name}</span>
                        </div>
                    </div>
                    <div className="card-action">
                        <div className="product-pricing-wrapper">
                            <p>Rs.{this.props.productDetails.sale_price.toFixed(2)} &nbsp;
                                <span className="mark-price txt-striked">
                                    Rs.{this.props.productDetails.mark_price.toFixed(2)}
                                </span>
                                <span className="sale-msg">
                                    ({this.props.productDetails.sale_msg})
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
			</div>
		);
	}
}
export default withRouter(ProductCard);