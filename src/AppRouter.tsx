import type { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PostPage from "./pages/PostPage";
import Posts from "./pages/Posts";
import NotFoundPage from "./pages/NotFoundPage";

const AppRouter: FC = () => {
	return (
		<Routes>
			<Route index element={<Navigate to={"posts"} />}></Route>
			<Route path="posts" element={<Posts />} />
			<Route path="posts/:postId" element={<PostPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export default AppRouter;
