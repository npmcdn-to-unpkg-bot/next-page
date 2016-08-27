import React from 'react';
import smallup from '../../images/smallup.png';
import smalldown from '../../images/smalldown.png';

export default class SortableHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleSort() {
        this.props.toggleSort(this.props.fieldName);
    }

    render() {
        let arrawimg = this.props.isDescending?smalldown:smallup; 

        return <th className={'clickable '+(this.props.isSorting?'sorting':'')} onClick={this.toggleSort.bind(this) }>
            {this.props.children}
            {
                this.props.isSorting ? <span className="clickable float-right">
                    {
                        <img src={arrawimg} width="20" />
                    }
                </span> : ""
            }
        </th>
    }
}