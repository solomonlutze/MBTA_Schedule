'use es6';
import React, {Component} from 'react';

// Render the headers row at the top of the table.
export default class HeaderRow extends Component {

    render() {
        const {headers}= this.props;
        const ret = [];
        for (let idx in headers) {
            let header = headers[idx];
            header = header.replace(/([A-Z])/g, ' $1').trim();
            ret.push(
                <th key={`headers-${idx}`}>{header}</th>
            );
        }
        return (
        <tr className='headers'>
            {ret}
        </tr>
        );
    }
}