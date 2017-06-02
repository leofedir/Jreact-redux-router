import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {set_Range_item, toggle_Slider_Picker} from '../REDUX/actions/actions';

class SliderRange extends Component {

    changeItem(type) {
        const {range_items, range_item} = this.props.main;
        const {set_Range_item} = this.props.Actions;
        let nextItem;

        if (typeof(type) === 'number' && type !== range_item) {
            nextItem = type;
            set_Range_item(nextItem);
        } else {
            switch(type) {
                case'-':
                    nextItem = range_item - 1;
                    if(nextItem >= 0)
                        set_Range_item(nextItem);
                    break;
        
                case'+':
                    nextItem = range_item + 1;
                    if(nextItem < range_items.length)
                        set_Range_item(nextItem);
                    break;
                
                default:
                    break;
            }
        }
    }
    
    handlerToggleSliderPicker = () => {
      const {toggle_Slider_Picker} = this.props.Actions;
      const {slider_range_picker} = this.props.main;
      
      toggle_Slider_Picker(!slider_range_picker)
    };
    
    createRange() {
        const {range_items, range_item, slider_range_picker} = this.props.main;

        const curItem = range_items[range_item]; // by default 2013

        const firstItem = range_items[0];
        const lastItem = range_items[range_items.length-1];
        
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
                <div className="sliderRangePicker-container" style={slider_range_picker ? {display: 'block'} : {display: 'none'}}>
                    <div className="sliderRangePicker">
                        {range_items.map((item, i) => {
                            
                            return <p
                                     key={i}
                                     className={`rangePicker-item ${i === range_item ? 'active' : ''}`}
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
        const {show_range} = this.props.main;
        return show_range ? this.createRange() : null
    }
}

function mapStateToProps(state) {
    return {
        main: state.main,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: bindActionCreators({set_Range_item, toggle_Slider_Picker}, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderRange);



