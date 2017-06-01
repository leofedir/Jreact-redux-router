import React, {Component} from 'react';

class SliderRange extends Component {

    changeItem(type) {
        const items = this.props.range_items;
        const curItem = this.props.range_item;
        let nextItem;
        console.log('curItem', curItem);
        console.log('type', type);
        if (typeof(type) === 'number' && type !== curItem) {
            nextItem = type;
            this.props.set_Range_item(nextItem);
        } else {
            switch(type) {
                case'-':
                    nextItem = curItem - 1;
                    if(nextItem >= 0)
                        this.props.set_Range_item(nextItem);
                    break;
        
                case'+':
                    nextItem = curItem + 1;
                    if(nextItem < items.length)
                        this.props.set_Range_item(nextItem);
                    break;
                
                default:
                    break;
            }
        }
    }
    
    handlerToggleSliderPicker = () => {
      this.props.toggle_Slider_Picker(!this.props.slider_range_picker)
    };
    
    createRange() {
        const items = this.props.range_items;
        const curItem = items[this.props.range_item]; // by default 2013

        const firstItem = items[0];
        const lastItem = items[items.length-1];
        
        function toYear(str) {
            return '20'+str.substring(5);
        }
        
        return (
            <div>
                <div className="sliderRange">
                    <p className="rangeItem first">{toYear(firstItem)}</p>
                    <div className="current-year-container">
                        <div className="container-fa left" onClick={() => this.changeItem('-')}>
                            <i className="fa fa-caret-left" aria-hidden="true"></i>
                        </div>
                    
                        <div className="current-year" onClick={() => this.handlerToggleSliderPicker()}>
                            <span>{toYear(curItem)}</span>
                        </div>
                    
                        <div className="container-fa right" onClick={() => this.changeItem('+')}>
                            <i className="fa fa-caret-right" aria-hidden="true"></i>
                        </div>
                
                    </div>
                    <p className="rangeItem last">{toYear(lastItem)}</p>
                </div>
                <div className="sliderRangePicker-container" style={this.props.slider_range_picker ? {display: 'block'} : {display: 'none'}}>
                    <div className="sliderRangePicker">
                        {items.map((item, i) => {
                            
                            return <p
                                     key={i}
                                     className={`rangePicker-item ${i === this.props.range_item ? 'active' : ''}`}
                                     onClick={() => this.changeItem(i) || this.handlerToggleSliderPicker()}>
                                {toYear(item)}
                            </p>
                        })}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return this.props.show_range ? this.createRange() : null
    }
}

export default SliderRange



