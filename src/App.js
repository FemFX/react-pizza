import { Route, Switch } from "react-router-dom";
import { Header } from "./components";
import { Home, Cart } from "./pages";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
