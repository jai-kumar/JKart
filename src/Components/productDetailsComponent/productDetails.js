import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        
        this.convertToPrice = this.convertToPrice.bind(this);
        this.getSavingAmount = this.getSavingAmount.bind(this);
        this.colourClickHandler = this.colourClickHandler.bind(this);
        this.storageClickHandler = this.storageClickHandler.bind(this);
        this.getProductDetails = this.getProductDetails.bind(this);
        this.getVariationId = this.getVariationId.bind(this);
    }

    componentWillMount() {
        //this.getProductDetails();
    }

    convertToPrice(amount) {
        return Number(amount).toFixed(2);
    }

    getSavingAmount(actualPrice, salePrice) {
        return actualPrice - salePrice;
    }

    colourClickHandler(e) {
        let clicked_color_id = e.target.getAttribute("data-colorid"),
            selected_storage_id = this.props.data.selected_storage_id;

        let var_id = this.getVariationId(clicked_color_id, selected_storage_id);

        let { history } = this.props;
        history.push({
            pathname: '/product/'+var_id
        });

        this.getProductDetails();
    }

    storageClickHandler(e) {
        let clicked_storage_id = e.target.getAttribute("data-storageid"),
            selected_color_id = this.props.data.selected_color_id;

        let var_id = this.getVariationId(clicked_storage_id, selected_color_id);
        
        let { history } = this.props;
        history.push({
            pathname: '/product/'+var_id
        });

        this.getProductDetails();
    }

    getVariationId(id1, id2) { 
        let variations = this.props.data.product_variations.filter((item, key) => {return item.sign.includes(id1) && item.sign.includes(id2)});
        let var_id = variations.map((item) => item._id)[0];
        return var_id;
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
                    console.log('2',selected_storage, selected_color);
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
        this.color = this.props.data.colour_options.map((item, key) => <span key={item._id} data-colorid={item._id} onClick={this.colourClickHandler} className={(this.props.data.selected_color === item.name) ? 'available-option-btn active' : 'available-option-btn'}>{item.name}</span>);
        this.storage = this.props.data.storage_options.map((item, key) => <span key={item._id} data-storageid={item._id} onClick={this.storageClickHandler} className={(this.props.data.selected_storage === item.name) ? 'available-option-btn active' : 'available-option-btn'}>{item.name}</span>);
        this.images = this.props.data.images;

		return (
            <div className="col s12 m12">
            <div className="card">
                <div className="card-content">
                    <div className="">
                        <span className="card-title product-title">{this.props.data.product_name}</span>
                    </div>
                    <div className="">
                        <p className="product-desc">{this.props.data.primary_product.desc}</p>
                    </div>
                    
                    <hr className="line-breaker"></hr>
                    
                    <div className="price-section">
                        <p className="prices bold">Rs.{this.convertToPrice(this.props.data.sale_price)} &nbsp;
                            <span className="mark-price txt-striked">
                                Rs.{this.convertToPrice(this.props.data.mark_price)}
                            </span>
                        </p>
                        <p className="saving-details">You save Rs.{this.convertToPrice(this.getSavingAmount(this.props.data.mark_price,this.props.data.sale_price))} ({this.props.data.sale_msg})</p>
                        <p className="tax-tnc">*Local taxes included (wherever applicable)</p>
                    </div>
                    
                    <hr className="line-breaker"></hr>
                    
                    <div className="storage-section">
                        <p className="section-title">STORAGE</p>
                        {this.storage}
                    </div>
                    
                    <hr className="line-breaker"></hr>
                    
                    <div className="color-section">
                        <p className="section-title">COLORS</p>
                        {this.color}
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default withRouter(ProductDetails);