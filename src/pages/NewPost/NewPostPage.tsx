import Container from "@/components/Container";
import { useEffect, useState, type FC } from "react";
import styled from "styled-components";
import Input from "./Input";
import { useInput } from "@/hooks/useInput";
import FileUploader from "./FileUploader";
import Textarea from "./Textarea";
import Flex from "@/components/UI/Flex";
import Button from "@/components/UI/Button";
import { supabase } from "@/services/supabase.services";
import Loader from "@/components/UI/Loader";

import { AnimatePresence as AP, motion as m } from "framer-motion";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useActions } from "@/hooks/useActions";
import type { Post } from "@/store/slices/postSlice";
import { useNavigate } from "react-router-dom";

const Title = styled.h1`
	font-size: calc(18px + 14 * ((100vw - 320px) / (1920 - 320)));
	font-weight: 700;
	color: #1f1f1f;
`;

interface Validation {
	postImage: boolean;
	postTitle: boolean;
	postContent: boolean;
}

const ErrorMessage = styled.div`
	white-space: pre;
	line-height: 1.25;
	font-size: 16px;
	color: #e38484;
`;

const LoaderOverlay = styled(Flex)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(22, 23, 25, 0.75);
	color: #fff;
	font-weight: 500;
	font-size: 18px;
`;

const NewPostPage: FC = () => {
	const postTitle = useInput("");
	const postContent = useInput("");
	const [postImage, setPostImage] = useState<File[]>([]);
	const [attachedImages, setAttachedImages] = useState<File[]>([]);
	const [validation, setValidation] = useState<Validation>({ postImage: false, postTitle: false, postContent: false });
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [loaderMessage, setLoaderMessage] = useState<string>("");

	const [loaderFileListLength, setLoaderFileListLength] = useState<number>(0);
	const [loaderFilesLoaded, setLoaderFilesLoaded] = useState<number>(0);

	const { addPost } = useActions();

	const navigate = useNavigate();

	const { posts } = useAppSelector((state) => state.post);

	const handlePostCreate = async () => {
		if (!Object.values(validation).every((value) => value === true)) {
			setErrorMessage(
				`Невозможно создать пост! Не заполнены поля:${!validation.postImage ? "\n- Обложка поста" : ""}${!validation.postTitle ? "\n- Заголовок поста" : ""}${!validation.postContent ? "\n- Содержание поста" : ""}`,
			);
		} else {
			setErrorMessage("");
			setLoaderMessage("");

			const generateFileName = (fileName: string): string => {
				const fileNameArray = fileName.split(".");
				return `${fileNameArray[0] + new Date().getTime()}.${fileNameArray[1]}`;
			};

			const fileUpload = async (file: File): Promise<string> => {
				const { data, error } = await supabase.storage
					.from(import.meta.env.VITE_SUPABASE_BUCKET_NAME)
					.upload(generateFileName(file.name), file);

				if (error) {
					throw new Error(error.message);
				} else {
					return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${import.meta.env.VITE_SUPABASE_BUCKET_NAME}/${data.path}`;
				}
			};

			const uploadAllFiles = async () => {
				setLoaderMessage("Загрузка изображений");

				setLoaderFileListLength(1 + attachedImages.length);
				setLoaderFilesLoaded(0);

				const postImageUrl = await fileUpload(postImage[0]);
				setLoaderFilesLoaded(1);

				let attachedImagesUrls: string[] = [];

				for (const image of attachedImages) {
					await fileUpload(image).then((path) => attachedImagesUrls.push(path));
					setLoaderFilesLoaded((prev) => prev + 1);
				}

				setLoaderFileListLength(0);
				setLoaderFilesLoaded(0);

				return { postImageUrl, attachedImagesUrls };
			};

			const createPost = async (postImageUrl: string, attachedImagesUrls: string[]) => {
				setLoaderMessage("Создание поста");

				const { data, error } = await supabase
					.from("posts")
					.insert({
						postId: posts[0].postId + 1,
						postImage: postImageUrl,
						title: postTitle.value,
						content: postContent.value.split("\n"),
						attachedImages: attachedImagesUrls,
						lastModified: new Date().toString(),
					})
					.select();

				if (error) {
					throw new Error(error.message);
				}

				addPost(data[0] as Post);
			};

			await uploadAllFiles()
				.then((response) => createPost(response.postImageUrl, response.attachedImagesUrls))
				.then(() => setLoaderMessage(""))
				.then(() => navigate("/posts"));
		}
	};

	useEffect(() => {
		setValidation({
			postImage: postImage.length > 0,
			postTitle: postTitle.value.length > 10,
			postContent: postContent.value.length > 30,
		});
	}, [postImage, postTitle.value, postContent.value]);

	const transitions = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.95 },
	};

	return (
		<Container $column $gap={20} $padding={["calc(20px + 30 * ((100vw - 320px) / (1920 - 320)))", 20]}>
			<Title>Создать новый пост</Title>
			<FileUploader
				$name="Обложка поста"
				$stateFiles={postImage}
				$setStateFiles={setPostImage}
				$height={250}
				$placeholder="Загрузить обложку поста"
			/>
			<Input value={postTitle.value} onChange={postTitle.onChange} placeholder="Заголовок поста" />
			<Textarea value={postContent.value} onChange={postContent.onChange} placeholder="Содержание поста" />
			<FileUploader
				$name="Прикреплённые изображения"
				$stateFiles={attachedImages}
				$setStateFiles={setAttachedImages}
				$height={120}
				$isMultiple
				$placeholder="Загрузить изображения"
			/>
			{errorMessage.length > 0 && <ErrorMessage>{errorMessage}</ErrorMessage>}
			<Flex $margin={[20, 0, 0, 0]} $justifyContent="flex-end">
				<Button handler={handlePostCreate}>Создать пост</Button>
			</Flex>
			<AP>
				{loaderMessage.length > 0 && (
					<m.div {...transitions}>
						<LoaderOverlay $column $gap={20} $justifyContent="center" $alignItems="center">
							<Loader $color={"#ffffff"} />
							<span>{`${loaderMessage}${loaderFileListLength > 0 ? ` (${loaderFilesLoaded}/${loaderFileListLength})` : ""}`}</span>
						</LoaderOverlay>
					</m.div>
				)}
			</AP>
		</Container>
	);
};

export default NewPostPage;
