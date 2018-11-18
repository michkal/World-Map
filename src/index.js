import React, {Component} from "react"
import ReactDOM from "react-dom"
import {
    Link,
    Route,
    HashRouter,
    Switch,
    NavLink
} from 'react-router-dom';

import {Main} from "./layouts/main";
import {Game} from "./layouts/game";
import {Weather} from "./layouts/weather";
import {FourOhFour} from "./layouts/notFound";

import {Header} from "./components/header";
import {Footer} from "./components/footer";

class App extends Component {

    render() {
        return (
            <div>
                <HashRouter>
                    <div>
                        <Header/>
                        <Switch>
                            <Route exact path='/' component={Main}/>
                            <Route exact path='/game' component={Game}/>
                            <Route exact path='/weather' component={Weather}/>

                            <Route path='/:view' component={FourOhFour}/>
                        </Switch>
                    </div>
                </HashRouter>
                <Footer/>
            </div>
        )
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<App/>, document.getElementById("app"))
})