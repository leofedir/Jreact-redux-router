import React, {Component} from 'react';

class SliderRange extends Component {
    changeItem(e) {
        this.props.set_Range_item(e.target.value);
    }

    /*
    *  <div className="slider" id="slider">
     <div className="slider_title">
     {items.map((item, i) => <p key={ i }>20{item.substring(5)}</p>)}
     </div>
     <input
     className="slider_range"
     type="range"
     min="0"
     max={items.length - 1}
     value={this.props.range_item    }
     id="fader"
     step="1"
     onChange={ ::this.changeItem}/>
     </div>
    * */
    createRange() {
        const items = this.props.range_items;
        const firtItem = items[0];
        const lastItem = items[items.last-1];
    
        return (
            <div className="sliderRange">
                <p className="rangeItem first">{firtItem}</p>
                <div className="current-year-container">
                    <div className="container-fa">
                        <i className="fa fa-caret-left" aria-hidden="true"></i>
                    </div>
                
                    <div className="current-year">
                        <span>2013</span>
                    </div>
                
                    <div className="container-fa">
                        <i className="fa fa-caret-right" aria-hidden="true"></i>
                    </div>
            
                </div>
                <p className="rangeItem last">{lastItem}</p>
            </div>
        )
    }

    render() {
        return this.createRange();
    }
}

export default SliderRange



