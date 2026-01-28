import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store/store.ts";
import App from "./App.tsx";
import ResetStyles from "./styles/ResetStyles.tsx";

const store = setupStore();

createRoot(document.querySelector(".wrapper")!).render(
	<Provider store={store}>
		<BrowserRouter>
			<ResetStyles />
			<App />
		</BrowserRouter>
	</Provider>,
);
