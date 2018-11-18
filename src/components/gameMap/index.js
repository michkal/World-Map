import React, {Component} from "react"
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"
import {rand} from "../random"
import {shuffle} from "../shuffle"
import {Rotate} from "../rotate";
import myJson from '../../../topojson-maps/world-110m.json';
import './index.scss'

let arr = (myJson.objects.ne_110m_admin_0_countries.geometries);
let countryArray = [];
let countryIdArr = [];
for (let i = 0; i < 177; i++) {
    countryArray.push(arr[i].properties.NAME);
    countryIdArr.push(arr[i].properties.ISO_A3);
}

export class GameMap extends Component {
    constructor() {
        super();
        this.state = {
            zoom: 0.9,
            country1: "",
            country2: "",
            country3: "",
            country4: "",
            countryId: "",
            choose: "",
            display: 'hide',
            displayAnsw: 'hide'
        };
        this.handleZoomIn = this.handleZoomIn.bind(this);
        this.handleZoomOut = this.handleZoomOut.bind(this);
        this.handleRandom = this.handleRandom.bind(this);
    }

    handleZoomIn() {
        this.setState({
            zoom: this.state.zoom * 2,
        })
    }

    handleZoomOut() {
        this.setState({
            zoom: this.state.zoom / 2,
        })
    }

    handleRandom() {
        let randomNumber = rand(0, 176);
        let shuffleArr = [];
        for (let i = 0; i < 4; i++) {
            shuffleArr.push(countryArray[randomNumber[i]]);
        }
        shuffle(shuffleArr);
        const randomId = countryIdArr[randomNumber[0]];
        this.setState({
            countryTrue: countryArray[randomNumber[0]],
            country1: shuffleArr[0],
            country2: shuffleArr[1],
            country3: shuffleArr[2],
            country4: shuffleArr[3],
            countryId: randomId,
            choose: "",
            display: 'show',
            displayAnsw: 'hide'
        })

    }

    handleChoose = (event) => {
        let text = (event.target.textContent);

        this.setState({
            displayAnsw: 'show',
            choose: text === this.state.countryTrue ? 'CORRECT!!!' : 'WRONG',
            divColor: text === this.state.countryTrue ? 'answerDivCorr' : 'answerDivWrong',
        })
    };

    render() {
        return (
            <div>
            <Rotate/>
            <div className='game-grid-container'>
                <div className='game-grid-row game-row1'>
                    <div className='game-grid-col-1'>
                        <div className={`${this.state.displayAnsw} ${this.state.divColor}`}>
                            {this.state.choose}
                        </div>
                    </div>
                </div>
                <div className='game-grid-row game-row2'>
                    <button onClick={this.handleChoose}
                            className={`${this.state.display} answerBtn`}>{this.state.country1}</button>
                    <button onClick={this.handleChoose}
                            className={`${this.state.display} answerBtn`}>{this.state.country2}</button>
                    <button onClick={this.handleChoose}
                            className={`${this.state.display} answerBtn`}>{this.state.country3}</button>
                    <button onClick={this.handleChoose}
                            className={`${this.state.display} answerBtn`}>{this.state.country4}</button>
                </div>
                <div className='game-grid-row game-row3'>
                    <div className='game-grid-col-1'>
                        <button onClick={this.handleZoomIn} className='zoomBtn'>{"Zoom in"}</button>
                        <button onClick={this.handleZoomOut} className='zoomBtn'>{"Zoom out"}</button>
                    </div>
                    <div className='game-grid-col-2'>
                        <ComposableMap>
                            <ZoomableGroup zoom={this.state.zoom}>
                                <Geographies disableOptimization geography={"/topojson-maps/world-110m.json"}>
                                    {(geographies, projection) => geographies.map(geography => {

                                            const country = (this.state.countryId === geography.properties.ISO_A3) ? this.state.countryId : "";
                                            return (
                                                <Geography
                                                    key={geography.id}
                                                    geography={geography}
                                                    projection={projection}
                                                    style={{
                                                        default: {fill: country ? "#929921" : "#a85b2f"},
                                                        hover: {fill: country ? "#929921" : "#FB9F31"},
                                                        pressed: {fill: country ? "#929921" : "#929921"},
                                                    }}
                                                    onClick={this.handleClick}
                                                />
                                            )
                                        }
                                    )}
                                </Geographies>
                            </ZoomableGroup>
                        </ComposableMap>
                    </div>
                    <div className='game-grid-col-3'>
                        <button onClick={this.handleRandom} className='drawBtn'>{"Draw country"}</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}