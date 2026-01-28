import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Post {
	postId: number;
	postImage: string;
	title: string;
	content: string[];
	attachedImages: string[];
	lastModified: string;
}

interface PostState {
	posts: Post[];
}

const initialState: PostState = {
	posts: [],
};

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setPosts(state, action: PayloadAction<Post[]>) {
			state.posts = action.payload.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
		},
		addPost(state, action: PayloadAction<Post>) {
			state.posts = [...state.posts, action.payload];
		},
		removePost(state, action: PayloadAction<number>) {
			state.posts = state.posts.filter((post) => post.postId !== action.payload);
		},
		editPost(state, action: PayloadAction<Post>) {
			state.posts = state.posts.map((post) => (post.postId === action.payload.postId ? action.payload : post));
		},
	},
});

export default postSlice;
