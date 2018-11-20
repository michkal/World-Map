import React, {Component} from "react"
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"
import myJson from '../../../topojson-maps/world-110m.json';
import {timeConverter} from "../timeConverter";
import {Rotate} from "../rotate";
import './index.scss';

let arr = (myJson.objects.ne_110m_admin_0_countries.geometries);
let countryArray = [];
let countryIdArr = [];
for (let i = 0; i < 177; i++) {
    countryArray.push(arr[i].properties.NAME);
    countryIdArr.push(arr[i].properties.ISO_A3);
}

export class WheatherMap extends Component {
    constructor() {
        super();
        this.state = {
            zoom: 0.9,
            choose: '',
            name: '',
            population: '',
            capital: '',
            area: '',
            currency: '',
            display: 'hide',
            flag: ''
        };

        this.handleZoomIn = this.handleZoomIn.bind(this);
        this.handleZoomOut = this.handleZoomOut.bind(this);
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

    handleClick = (geography, evt) => {
        let choosedId = geography.properties.ISO_A3;
        this.setState({
            choose: choosedId,
            display: 'show',
        });
        fetch(
            `https://restcountries.eu/rest/v2/alpha/${choosedId}`
        ).then((result) => {
            if (result.ok) {
                return result.json();
            } else {
                throw new Error('Błąd sieci!');
            }
        }).then((responseJSON) => {
            console.log(responseJSON);
            this.setState({
                name: responseJSON.name,
                population: responseJSON.population,
                capital: responseJSON.capital,
                area: responseJSON.area,
                currency: responseJSON.currencies[0].name,
                flag: responseJSON.flag
            });
            return responseJSON;
        }).then((countryResponse) => {
            let capital = countryResponse.capital;
            return fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${capital},${choosedId}&appid=10eb81806cfbf78d019f86d8b20a1e04&lang={pl}`);
        }).then((result) => {
            if (result.ok) {
                return result.json();
            } else {
                throw new Error('Błąd sieci!');
            }
        }).then((responseJSON2) => {
            console.log(responseJSON2);
            this.setState({
                weather: responseJSON2.weather[0].description,
                icon: 'https://openweathermap.org/img/w/' + responseJSON2.weather[0].icon + '.png',
                pressure: responseJSON2.main.pressure,
                temp: Math.round(responseJSON2.main.temp - 272.15),
                humidity: responseJSON2.main.humidity,
                sunrise: timeConverter(responseJSON2.sys.sunrise),
                sunset: timeConverter(responseJSON2.sys.sunset),
                wind: responseJSON2.wind.speed,
                longitude: responseJSON2.coord.lon,
                latitude: responseJSON2.coord.lat,
            });
        }).catch((err) => {
            this.setState({
                error: err.message,
            });
        });
    };

    render() {
        return (
            <div>
                <Rotate/>
                <div className='weather-grid-container xs'>
                    <div className='weather-grid-row weather-row1'>
                        <div className='weather-grid-col-1'>
                            <div>
                                <button onClick={this.handleZoomIn} className='zoomBtn'>{"Zoom in"}</button>
                                <button onClick={this.handleZoomOut} className='zoomBtn'>{"Zoom out"}</button>
                            </div>
                            <table className={`${this.state.display} infoTable`}>
                                <tbody>
                                <tr>
                                    <td style={{height: '60px', width: '90px'}}>
                                        <img style={{width: '100%', height: 'auto', border: '1px solid black'}}
                                             src={this.state.flag}/></td>
                                    <td>{this.state.name}</td>
                                </tr>
                                <tr>
                                    <td>Area</td>
                                    <td>{this.state.area} km^2</td>
                                </tr>
                                <tr>
                                    <td>Population</td>
                                    <td>{this.state.population}</td>
                                </tr>
                                <tr>
                                    <td>Capital</td>
                                    <td>{this.state.capital}</td>
                                </tr>
                                <tr>
                                    <td>Currency</td>
                                    <td>{this.state.currency}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='weather-grid-col-2'>
                            <ComposableMap onClick={this.handleChoose}>
                                <ZoomableGroup zoom={this.state.zoom}>
                                    <Geographies disableOptimization geography={"/topojson-maps/world-110m.json"}>
                                        {(geographies, projection) => geographies.map(geography => {
                                                const country = (this.state.choose === geography.properties.ISO_A3) ? this.state.choose : "";
                                                return (
                                                    <Geography
                                                        key={geography.id}
                                                        geography={geography}
                                                        projection={projection}
                                                        style={{
                                                            default: {fill: country ? "#929921" : "#a85b2f"},
                                                            hover: {fill: country ? "#929921" : "#FB9F31"},
                                                            pressed: {
                                                                fill: country ? "#929921" : "#929921",
                                                            },
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
                        <div className='weather-grid-col-3'>
                            <div className={this.state.display}>
                                <h2>{this.state.capital}</h2>
                                <div>
                                    <img src={this.state.icon}/> {this.state.temp} °C
                                </div>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Weather</td>
                                        <td>{this.state.weather}</td>
                                    </tr>
                                    <tr>
                                        <td>Wind</td>
                                        <td>{this.state.wind} m/s</td>
                                    </tr>
                                    <tr>
                                        <td>Pressure</td>
                                        <td>{this.state.pressure} hPa</td>
                                    </tr>
                                    <tr>
                                        <td>Humidity</td>
                                        <td>{this.state.humidity} %</td>
                                    </tr>
                                    <tr>
                                        <td>Sunrise</td>
                                        <td>{this.state.sunrise} (UTC time)</td>
                                    </tr>
                                    <tr>
                                        <td>Sunset</td>
                                        <td>{this.state.sunset} (UTC time)</td>
                                    </tr>
                                    <tr>
                                        <td>Geo cords</td>
                                        <td>[{this.state.latitude} {this.state.longitude}]</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}