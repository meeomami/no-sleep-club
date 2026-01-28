import { useEffect } from "react";
import AppRouter from "./AppRouter";
import Header from "./components/Header";
import Modals from "./components/Modal/Modals";
import { useActions } from "./hooks/useActions";
import { supabase } from "./services/supabase.services";
import type { Post } from "./store/slices/postSlice";

function App() {
	const { setPosts, closeAllModals } = useActions();

	const getPosts = async (): Promise<Post[]> => {
		const { data, error } = await supabase.from("posts").select("*");

		if (error) {
			throw new Error(error.message);
		}

		setPosts(data as Post[]);

		return data as Post[];
	};

	useEffect(() => {
		getPosts();
	}, []);

	useEffect(() => {
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
