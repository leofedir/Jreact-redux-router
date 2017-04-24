import React, {Component} from 'react';

class SliderRange extends Component {
    omButtonMenuClick(e) {
        this.props.toggleMenu(this.props.showMenu)
    }

    changeItem(e) {
        this.props.set_Range_item(e.target.value);
    }

    createRange() {
        const items = this.props.range_items;

        return (
            <div className="slider" id="slider">
                <div className="slider_title">
                    {items.map((item, i) => <p key={ i }>20{item.substring(5)}</p>)}
                </div>
                <input
                    className="slider_range"
                    type="range"
                    min="0"
                    max={items.length - 1}
                    value={this.props.range_item}
                    id="fader"
                    step="1"
                    onChange={ ::this.changeItem}/>
            </div>
        )
    }

    render() {
        return this.props.show_range ? this.createRange() : null
    }
}

export default SliderRange



