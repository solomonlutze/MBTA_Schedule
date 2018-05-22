'use es6';
import moment from 'moment';
import 'moment-timezone';
import React, {Component} from 'react';

// Render an individual data cell.
// Separated to keep formatting functions from cluttering App.jsx.
export default class DataCell extends Component {

    render() {
        const {header, dataLine}= this.props;
        return (
            <td className={`cell-${header.toLowerCase()} ${this.getAdditionalCellClasses(header, dataLine[header])}`}>
              {this.formatCellData(header, dataLine[header])}
            </td>
        );
    }

    getAdditionalCellClasses(header, rawCellData) {
        switch (header) {
            case 'Lateness':
                return Number(rawCellData) > 0 ? "late" : "";
            case 'Status':
                return rawCellData.replace(/\s+/g, '-').toLowerCase();
        }
        return "";
    }

    formatCellData(header, rawCellData) {
        switch (header) {
            case 'Lateness':
                return !!Number(rawCellData)  ? rawCellData : '-';
            case 'ScheduledTime':
                return moment.unix(rawCellData).tz('America/New_York').format('h:mm A');
            case 'Track':
                return rawCellData || "TBD";
            
        }
        return rawCellData;
    }
}