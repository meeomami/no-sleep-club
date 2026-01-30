import { useEffect } from "react";
import AppRouter from "./AppRouter";
import Header from "./components/Header";
import Modals from "./components/Modal/Modals";
import { useActions } from "./hooks/useActions";
import { supabase } from "./services/supabase.services";
import type { Post } from "./store/slices/postSlice";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Session } from "@supabase/supabase-js";

function App() {
	const { setPosts, closeAllModals, login } = useActions();

	const getPosts = async (): Promise<Post[]> => {
		const { data, error } = await supabase.from("posts").select("*");

		if (error) {
			throw new Error(error.message);
		}

		setPosts(data as Post[]);

		return data as Post[];
	};

	useLocalStorage(`sb-${import.meta.env.VITE_SUPABASE_PROJECT_REF}-auth-token`, (data: Session) => {
		if (data && data.access_token) {
			login(data.access_token);
		}
	});

	useEffect(() => {
		/* load posts */
		getPosts();

		/* handler to close modal's on Escape's key press */
		const closeModalHandler = (event: KeyboardEvent) => {
			if (event.key === "Escape") closeAllModals();
		};

		document.addEventListener("keyup", closeModalHandler);

		return () => document.removeEventListener("keyup", closeModalHandler);
	}, []);

	return (
		<>
			<Header />
			<AppRouter />
			<Modals />
		</>
	);
}

export default App;
