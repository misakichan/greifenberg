import "../styles/globals.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "../store";

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

const store = createStore(rootReducer);

function MyApp({ Component, pageProps }) {
  return (
    <SafeHydrate>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SafeHydrate>
  );
}

export default MyApp;
