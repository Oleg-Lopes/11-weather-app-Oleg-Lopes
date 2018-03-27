import React, { Component } from "react";
import { Header, Content, Form } from "../../components";

import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header title="Weathr" />
                <Content>
                    <h2>Get your weather data</h2>
                    <Form />
                </Content>
            </div>
        );
    }
}

export default App;
