import React, { Component } from 'react';
import Product from './productCard';
import PreLoader from '../loaderComponent/loader';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            productList: [],
            isFetching:false,
            pagesLoaded: '',
            totalPages: 2
        };

        this.getProducts = this.getProducts.bind(this);
    }

    componentDidMount(){
        window.addEventListener('scroll', this.loadOnScroll);
    }

    componentWillMount() {
        this.getProducts([], 1);
    }

    getProducts(dataarray, page_number) {
        fetch('https://assignment-appstreet.herokuapp.com/api/v1/products?page='+page_number)
            .then(results => {
                return results.json();
            })
            .then(data => {
                let content = Array.from(dataarray);
                data.products.forEach((item, idx) => {
                    content.push(
                        <div className="col s12 m3 l3" key={item._id}>
                            <Product productDetails={item}/>
                        </div>
                    );
                });
                this.setState({productList: content, isFetching: false, pagesLoaded: page_number});
            })
    }

    loadOnScroll = (e) =>{
        //If all the content loaded
        if(this.state.pagesLoaded >= this.state.totalPages) {
            return;
        }
    
        var el = document.getElementById('content-end');
    
        var rect = el.getBoundingClientRect();
        var isAtEnd = (
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    
        //if User is at the end of content. load more content
        if(isAtEnd){
          //If content list is still loading do not request for another content list.
            if(this.state.isFetching) {
                return;
            }

            this.setState({isFetching:true});
            
            let currentNumOfPages = this.state.pagesLoaded;

            //Call server and request content.
            this.getProducts(this.state.productList, ++currentNumOfPages);
        }
      }

	render()  {
		return (
            <div className="homepage-content">
                <div className="row product-list-wrapper">
                    {this.state.productList}
                </div>
                <div className="row">
                    {(this.state.pagesLoaded !== this.state.totalPages) ?
                        <div id="content-end" className="preloader-content">
                            <PreLoader />
                        </div>: <center>That's all Folks!!</center>
                    }
                </div>
            </div>
		);
	}
}
export default HomePage;