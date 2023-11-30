import React, { Component } from 'react';
import { GridGenerator, HexGrid, Layout, Path, Hexagon, Text, Pattern, Hex } from 'react-hexgrid';
import './App.css';

const style = {
  backgroundColor: 'lightBlue',
  color: 'red'
};

class App extends Component {
  render() {
    const hexagonSize = { x: 10, y: 10 };
    const moreHexas = GridGenerator.rectangle(20,20);
    return (
      <div className="App">
        <h2>Bug Chess v1</h2>
        <HexGrid width={1200} height={800} viewBox="-200 -200 200 200">
          {/* Additional small grid, hexagons generated with generator */}
          <Layout size={{ x: 10, y: 10 }} origin={{ x: -75, y: -100 }}>
            { moreHexas.map((hex, i) => <Hexagon style={style} key={i} q={hex.q} r={hex.r} s={hex.s} />) }
          </Layout>
        </HexGrid>
      </div>
    );
  }
}

export default App;