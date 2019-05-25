import React, { Component } from 'react';
import Carousel from '../carouselComponent/carousel';
import ProductDetails from '../productDetailsComponent/productDetails';
import {
    withRouter
} from 'react-router-dom';

import '../../Assets/css/productDetails.min.css';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            primary_product: [],
            colour_options: [],
            storage_options: [],
            selected_product_details: [],
            product_name: '',
            sale_price: '',
            sale_msg: '',
            mark_price: '',
            selected_color: '',
            selected_storage: '',
            selected_color_id: '',
            selected_storage_id: '',
            product_variations: []
        };
        
        this.getProductDetails = this.getProductDetails.bind(this);
    }

    componentWillMount() {
        this.getProductDetails();
    }

    getProductDetails() {
        const { match: { params } } = this.props;
        var selected_storage = '',
            selected_color = '';

        fetch(`https://assignment-appstreet.herokuapp.com/api/v1/products/${params.productid}`)
        .then(results => {
            return results.json();
        })
        .then(data => {
            let content = [],
                storage_id = '',
                colour_id = '',
                storage_options = [],
                colour_options = [],
                selected_product_details = [],
                selectedColorAndStorageState = {},
                selected_storage_id = '',
                selected_color_id = '',
                product_variations = [];

            content.push(data);
            let primary_product = content.map((pro)=>{
                return pro.primary_product;
            });
            let product_images = content.map((pro)=>{
                return pro.primary_product.images;
            });

            Object.keys(data).forEach(function(k, i) {
                if (k === 'attributes') {
                    let attr_id = data[k].map((attr) => { return attr._id;});
                    storage_id = attr_id[0];
                    colour_id =  attr_id[1];
                } else if( k === 'options') {
                    storage_options = data[k].filter((o) => { return (o.attrib_id === storage_id); });
                    colour_options = data[k].filter((o) => { return (o.attrib_id === colour_id); });

                    selected_storage_id = data['selected_option_ids'][0];
                    selected_color_id = data['selected_option_ids'][1];
                    selected_storage = data[k].filter((o) => { return (o._id === selected_storage_id); }).map((s) => { return s.name })[0];
                    selected_color = data[k].filter((o) => { return (o._id === selected_color_id); }).map((s) => { return s.name })[0];
                    selectedColorAndStorageState = {
                        selected_storage: selected_storage,
                        selected_color: selected_color,
                        selected_storage_id: selected_storage_id,
                        selected_color_id: selected_color_id
                    };

                } else if(k === 'product_variations') {
                    product_variations = data[k];
                    selected_product_details = data[k].filter((pro) => { return (pro._id === params.productid); });
                    
                    selected_color = data[k].filter((pro) => { return (pro._id === colour_id); });
                    selected_storage = data[k].filter((pro) => { return (pro._id === storage_id); });
                }
            });
            
            this.setState(selectedColorAndStorageState);
            this.setState({
                primary_product: primary_product[0],
                product_images: product_images[0],
                colour_options: colour_options,
                storage_options: storage_options,
                selected_product_details: selected_product_details,
                product_name: selected_product_details[0].name,
                sale_price: selected_product_details[0].sale_price,
                sale_msg: selected_product_details[0].sale_msg,
                mark_price: selected_product_details[0].mark_price,
                images: selected_product_details[0].images,
                product_variations: product_variations
            });
        })
    }

	render()  {

        return (
            <div className="product-details-wrapper">
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card">
                            <div className="card-content">
                                <div className="row">
                                    <div className="col s12 m6">
                                        <div className="row">
                                            <div className="col s12 m12">
                                                <div className="card">
                                                    <div className="card-content">
                                                        <Carousel productimages={this.state.images}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col s12 m6">
                                        <div className="row">
                                            <div className="col s12 m12">
                                                <ProductDetails data={this.state}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
		);
	}
}
export default withRouter(Product);