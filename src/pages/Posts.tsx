import Container from "@/components/Container";
import Flex from "@/components/UI/Flex";
import { useAppSelector } from "@/hooks/useAppSelector";
import type { FC } from "react";
import styled from "styled-components";
import { AnimatePresence as AP, motion as m } from "framer-motion";
import Loader from "@/components/UI/Loader";
import Post from "@/components/Post";

const LoaderContainer = styled(m.div)`
	display: flex;
	justify-content: center;
`;

const PostCounter = styled.div`
	color: #23272e;
	font-size: 20px;
	font-weight: 600;
	padding: 20px;
	border: 3px solid #1f1f1f;
	background-color: #e4ebf1;
	align-self: flex-start;
`;

const Posts: FC = () => {
	const { posts } = useAppSelector((state) => state.post);

	const transitions = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.95 },
	};

	return (
		<AP>
			<Container $padding={[50, 20]} $column>
				{posts.length > 0 ? (
					<Flex $column $gap={32}>
						<PostCounter>Всего постов: {posts.length}</PostCounter>
						<m.div {...transitions}>
							<Flex $column $gap={20}>
								{posts.map((post, index) => (
									<Post {...post} key={index} />
								))}
							</Flex>
						</m.div>
					</Flex>
				) : (
					<LoaderContainer {...transitions}>
						<Loader />
					</LoaderContainer>
				)}
			</Container>
		</AP>
	);
};

export default Posts;
