import React, { Component } from 'react';
import M from "materialize-css";

class Carousel extends Component {
    componentDidMount() {
        setTimeout(() => {
            let carousel = document.querySelectorAll(".carousel.carousel-slider");
            M.Carousel.init(carousel, {indicators: true});
        }, 1000);
    }

  render () {
    let images = this.props.productimages;
    this.productImages = images && images.map((i, idx) => {
                            return (
                                <a className="carousel-item" href={`#${idx}!`} key={idx}><img src={i} alt={idx} key={idx} /></a>
                            )
                        })

    if (this.props.productimages) {
        return (
            <div className='product-images-wrapper in'>
                <div className="carousel carousel-slider">
                    {this.productImages}
                </div>
            </div>
        )
    }
    return null;
  }
}

export default Carousel;