import React, {Component} from "react"

import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"
import './index.scss'
import {Rotate} from "../rotate";

export class Map extends Component {
    constructor() {
        super();
        this.state = {
            zoom: 0.9
        };
    }

    render() {
        return (
            <div>
            <Rotate/>
                <div className='main-grid-container'>
                    <div className='main-grid-row main-row1'>
                        <div className='main-grid-col-1'>
                        </div>
                        <div className='main-grid-col-2'>
                            <ComposableMap>
                                <ZoomableGroup zoom={this.state.zoom}>
                                    <Geographies geography={"/topojson-maps/world-110m.json"}>
                                        {(geographies, projection) => geographies.map(geography => (
                                            <Geography
                                                key={geography.id}
                                                geography={geography}
                                                projection={projection}
                                                style={{
                                                    default: {fill: "#a85b2f"},
                                                    hover: {fill: "#FB9F31"},
                                                    pressed: {fill: "#929921"},
                                                }}
                                            />
                                        ))}
                                    </Geographies>
                                </ZoomableGroup>
                            </ComposableMap>
                        </div>
                        <div className='main-grid-col-3'>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}