import { Provider } from "react-redux";
import store from "./redux/store";
import AppTemplate from "./components/AppTemplate";

function App() {
  return (
    <Provider store={store}>
      <AppTemplate />
    </Provider>
  );
}

export default App;
