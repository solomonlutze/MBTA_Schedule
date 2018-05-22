'use es6';
import React, {Component} from 'react';
import DataCell from './DataCell.jsx';
import HeaderRow from './HeaderRow.jsx';
import Papa from 'papaparse';
import './css/app.scss';

const API_PATH = "/lib/gtrtfs/Departures.csv";

// Responsible for acquiring data and populating the display with it.
// Separated out from index.js so that index.js can handle only rendering to the root div;
// conceptual rather than functional separation

export default class App extends Component {

    constructor() {
        super()
    
        this.state = {
            data: null,
            error: false,
        }
      }

    componentDidMount() {
        Papa.parse(API_PATH,{
            download: true,
            header: true,
            complete:(results) => {
                this.handleData(results);
            }
        });
    }

    handleData(data) {
        !!data
          ? this.setState({ data: data.data, error: false })
          : this.setState({ error: true })
    }

    displayData() {
        const {data} = this.state;
        if (!!data) {
            const ret = [];
            let headers = null;
            if (data.length > 0) {
                headers = Object.keys(data[0]);
                headers = headers.filter(header => header != "TimeStamp");
            }
            // Organize departure data by scheduled time
            data.sort((lineA, lineB) => {
                return (lineA["ScheduledTime"] || 0) - (lineB["ScheduledTime"] || 0);
            });
            for(let dataLine of data) {
                const cells = [];
                // Omit schedule data that doesn't have a destinatino
                if (!dataLine['Destination']) { continue; }
                for (let header of headers) {
                    cells.push(
                        <DataCell header={header} dataLine={dataLine}/>
                    );
                }
                ret.push(<tr>{cells}</tr>);
            }
            return <table>
                <HeaderRow headers={headers}/>
                {ret}
            </table>;
        }
        return <div className="loading-msg">Loading departure times. Please wait...</div>
    }

    render() {
        return (
            <div>
                {this.displayData()}
            </div>
        )   
    }
}
