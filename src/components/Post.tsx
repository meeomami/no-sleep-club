import { useEffect, useState, type FC, type MouseEvent } from "react";
import styled from "styled-components";
import Flex from "./UI/Flex";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import { useActions } from "@/hooks/useActions";
import { timeAgo } from "@/utils/date";
import type { Post as PostI } from "@/store/slices/postSlice";

const PostImageContainer = styled.div`
	height: 353px;
	width: 100%;
	border-bottom: 3px solid #1f1f1f;
	overflow: hidden;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: 350ms;
	}
	@media (hover: hover) and (pointer: fine) {
		&:hover {
			img {
				scale: 1.25;
			}
		}
	}
`;

const StyledPost = styled(Flex)<{ $isPostPage: boolean }>`
	width: 100%;
	${({ $isPostPage }) => !$isPostPage && `cursor: pointer`};
	background-color: #eff2f9;
	transition: 350ms;
	@media (hover: hover) and (pointer: fine) {
		&:hover {
			background-color: #e4e7ee;
		}
	}
`;

const Title = styled.h2`
	font-size: 24px;
	font-weight: 600;
	color: #1f1f1f;
`;

const Text = styled.p`
	font-size: 16px;
	line-height: 1.5;
	color: rgba(31, 31, 31, 0.6);
`;

const AttachedImagesContainer = styled.div<{ $isPadding: boolean }>`
	overflow-x: auto;
	max-width: 100%;
	margin: 12px 24px;

	${({ $isPadding }) =>
		$isPadding &&
		`
		padding: 0 0 8px 0;
	`}
`;

const AttachedImageContainer = styled.button`
	background-color: transparent;
	flex: 0 0 240px;
	aspect-ratio: 16/9;
	border: 3px solid #1f1f1f;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: 350ms;
	}

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			img {
				scale: 1.25;
			}
		}
	}
`;

const Footer = styled(Flex)`
	color: #727376;
	line-height: 24px;
`;

const Post: FC<PostI> = ({ postId, postImage, title, content, attachedImages, lastModified }) => {
	const { setImageUrl, setModalVisibility } = useActions();

	const [formattedModifiedDate, setFormattedModifiedDate] = useState<string>("");

	const openImageHandler = (event: MouseEvent<HTMLButtonElement | HTMLDivElement>, image: string) => {
		event.preventDefault();
		event.stopPropagation();
		setImageUrl(image);
		setModalVisibility({ name: "image", visibility: true });
	};

	const formatModifiedDate = (dateString: string) => {
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.getMonth();
		const year = date.getFullYear();
		const hour = date.getHours();
		const minute = date.getMinutes();

		const months = [
			"января",
			"февраля",
			"марта",
			"апреля",
			"мая",
			"июня",
			"июля",
			"августа",
			"сентября",
			"октября",
			"ноября",
			"декабря",
		];

		return `${day} ${months[month]} ${year} г. ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} (${timeAgo(date)})`;
	};

	const location = useLocation();
	const navigate = useNavigate();

	const isPostPage = (location: Location<any>) => {
		return location.pathname.startsWith("/posts/");
	};

	useEffect(() => {
		setFormattedModifiedDate(formatModifiedDate(lastModified));

		let interval: number | undefined;

		interval = setInterval(() => {
			setFormattedModifiedDate(formatModifiedDate(lastModified));
		}, 60000);

		return () => clearInterval(interval);
	}, []);

	return (
		<StyledPost
			onClick={() => !isPostPage(location) && navigate(`/posts/${postId}`)}
			$isPostPage={isPostPage(location)}
			$column
			$border="3px solid #1f1f1f"
			$bgc="#eff2f9"
		>
			<PostImageContainer onClick={(event) => openImageHandler(event, postImage)}>
				<img src={postImage} />
			</PostImageContainer>
			<Flex $gap={16} $column $padding={24}>
				<Title>{title}</Title>
				<Flex $gap={4} $column>
					{content.map((p, index) => (
						<Text key={index}>{p}</Text>
					))}
				</Flex>
			</Flex>
			<AttachedImagesContainer $isPadding={attachedImages.length > 3}>
				<Flex $gap={8}>
					{attachedImages.map((image, index) => (
						<AttachedImageContainer onClick={(event) => openImageHandler(event, image)} key={index}>
							<img src={image} />
						</AttachedImageContainer>
					))}
				</Flex>
			</AttachedImagesContainer>
			<Footer $padding={24} $margin={[-12, 0, 0]}>
				{formattedModifiedDate}
			</Footer>
		</StyledPost>
	);
};

export default Post;
