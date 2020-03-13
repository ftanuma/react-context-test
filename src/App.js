import React, { useContext } from "react";
import "./App.css";

const ThemeContext = React.createContext({
  mode: "light",
  changeMode: () => {}
});

function Toolbar() {
  return (
    <>
      <ContextConsumingClass />
      <ContextConsumingFuncMemo />
    </>
  );
}

const ToolbarMemo = React.memo(Toolbar, (prevProps, nextProps) => {
  return true; // Always avoid re-render
});

class ContextConsumingClass extends React.Component {
  static contextType = ThemeContext;

  shouldComponentUpdate() {
    return false;
  }

  render() {
    console.log("ContextConsumingClass:render()");
    return <p>ContextConsumingClass: I'm actually not using context :)</p>;
  }
}

function ContextConsumingFunc() {
  const context = useContext(ThemeContext);

  console.log("ContextConsumingFunc:render()");
  return <p>ContextConsumingFunc: I'm actually not using context :)</p>;
}

const ContextConsumingFuncMemo = React.memo(ContextConsumingFunc, (prevProps, nextProps) => {
  return true; // Always avoid re-render
});

class App extends React.Component {
  state = {
    mode: "dark"
  };
  changeMode = () => {
    this.setState(prevState => {
      if (this.state.mode === "dark") {
        return { mode: "light" };
      } else {
        return { mode: "dark" };
      }
    });
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{ mode: this.state.mode, changeMode: this.changeMode }}
      >
        <div className="App">
          <ToolbarMemo></ToolbarMemo>
          <button onClick={this.changeMode}>change mode</button>
          <p>{this.state.mode}</p>
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;
