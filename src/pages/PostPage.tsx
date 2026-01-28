import Container from "@/components/Container";
import Post from "@/components/Post";
import { useAppSelector } from "@/hooks/useAppSelector";
import type { Post as IPost } from "@/store/slices/postSlice";
import { useEffect, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence as AP, motion as m } from "framer-motion";
import Loader from "@/components/UI/Loader";
import Flex from "@/components/UI/Flex";
import styled from "styled-components";
import ArrowBackIcon from "@icons/arrow-back.svg?react";

const LoaderContainer = styled(m.div)`
	display: flex;
	justify-content: center;
`;

const BackLink = styled.button`
	background-color: transparent;
	color: #6e808e;
	transition: 350ms;
	display: flex;
	gap: 8px;
	line-height: 20px;
	font-size: 16px;

	svg {
		height: 20px;
		width: 20px;
	}

	svg,
	svg path {
		fill: currentColor;
	}

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			opacity: 0.7;
		}
	}
`;

const PostPage: FC = () => {
	const params = useParams();

	const { posts } = useAppSelector((state) => state.post);

	const [postData, setPostData] = useState<IPost | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		let timer: number | undefined;
		if (params.postId) {
			if (posts.length > 0) {
				const candidate = posts.filter((post) => post.postId === Number(params.postId))[0];
				if (candidate) setPostData(candidate);
				else navigate("/404");
			} else {
				timer = setTimeout(() => navigate("/404"), 10000);
			}
		}
		return () => clearTimeout(timer);
	}, [params, posts]);

	const transitions = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.95 },
	};

	return (
		<AP>
			<Container $column $padding={[50, 20]}>
				{postData ? (
					<m.div {...transitions}>
						<Flex $column $gap={24}>
							<BackLink onClick={() => navigate(-1)}>
								<ArrowBackIcon />
								<span>Вернуться назад</span>
							</BackLink>
							<Flex $column>
								<Post {...postData} />
							</Flex>
						</Flex>
					</m.div>
				) : (
					<LoaderContainer {...transitions}>
						<Loader />
					</LoaderContainer>
				)}
			</Container>
		</AP>
	);
};

export default PostPage;
