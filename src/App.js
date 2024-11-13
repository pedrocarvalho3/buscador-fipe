// App.js
import { Provider } from "react-redux";
import store from "./components/Store";
import AppTemplate from "./components/AppTemplate";
import HistoryTable from "./components/HistoryTable";

function App() {
  return (
    <Provider store={store}>
      <AppTemplate>
        <HistoryTable />
      </AppTemplate>
    </Provider>
  );
}

export default App;
