import Flex from "@/components/UI/Flex";
import { rv } from "@/utils/rv";
import { useEffect, useState, type FC } from "react";
import styled from "styled-components";

import AttachFileIcon from "@icons/attach-file.svg?react";
import DeleteIcon from "@icons/delete.svg?react";

interface FileUploaderProps {
	$name?: string;
	$height?: number;
	$stateFiles: File[];
	$setStateFiles: React.Dispatch<React.SetStateAction<File[]>>;
	$isMultiple?: boolean;
	$placeholder?: string;
}

const Name = styled.div`
	font-weight: 500;
	font-size: 16px;
	color: #6e808e;
`;

const StyledFileUploader = styled(Flex).attrs({ as: "label" })<Pick<FileUploaderProps, "$height">>`
	height: ${({ $height }) => ($height ? $height : 160)}px;
	border: ${rv(3, 2)} dashed currentColor;
	color: #6e808e;
	cursor: pointer;
	transition: 350ms;
	text-align: center;
	line-height: 1.25;

	font-size: 16px;
	font-weight: 500;

	svg,
	svg path {
		fill: currentColor;
		transition: 350ms;
	}

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			color: #1f1f1f;
		}
	}

	input {
		display: none;
	}
`;

const ImagePreviewBody = styled(Flex)`
	overflow: auto;
	width: 100%;

	${StyledFileUploader} {
		flex: 0 0 ${rv(240, 108)};
	}
`;

const ImageOverlay = styled(Flex)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(22, 23, 25, 0.75);
	opacity: 0;
	visibility: hidden;
	transition: 350ms;
	color: white;

	svg {
		width: 40px;
		aspect-ratio: 1 / 1;
	}

	svg,
	svg path {
		fill: currentColor;
	}
`;

const ImagePreviewContainer = styled.button<Pick<FileUploaderProps, "$height" | "$isMultiple">>`
	flex: ${({ $isMultiple }) => ($isMultiple ? `0 0 ${rv(240, 108)}` : "1 1 auto")};
	height: ${({ $height }) => ($height ? $height : 160)}px;
	border: ${rv(3, 2)} solid currentColor;
	color: #1f1f1f;
	overflow: hidden;
	position: relative;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: 350ms;
	}

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			${ImageOverlay} {
				opacity: 1;
				visibility: visible;
			}
		}
	}
`;

const FileUploader: FC<FileUploaderProps> = ({ $name, $stateFiles, $setStateFiles, $height, $placeholder, $isMultiple }) => {
	const [files, setFiles] = useState<File[]>($stateFiles);
	const [previews, setPreviews] = useState<string[]>([]);

	const removeImageHandler = (index: number) => {
		setFiles((prev) => prev.filter((_, fileIndex) => fileIndex !== index));
	};

	const isSizeLimit = (size: number): boolean => {
		return size > 52428800;
	};

	const fileUploadHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
		if (!event.target.files) return;

		setFiles([...event.target.files].filter((file) => !isSizeLimit(file.size)));
	};

	const addFilesHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
		if (!event.target.files) return;

		setFiles([...files, ...event.target.files].filter((file) => !isSizeLimit(file.size)));
	};

	useEffect(() => {
		$setStateFiles(files);
		setPreviews(files.map((file) => URL.createObjectURL(file)));
	}, [files]);

	return (
		<Flex $column $gap={4}>
			{$name && <Name>{$name}</Name>}
			{files.length > 0 ? (
				<ImagePreviewBody $column $padding={[0, 0, 8]}>
					<Flex $gap={8}>
						{previews.map((image, index) => (
							<ImagePreviewContainer
								key={index}
								$isMultiple={$isMultiple}
								$height={$height}
								onClick={() => removeImageHandler(index)}
							>
								<img src={image} />
								<ImageOverlay $alignItems="center" $justifyContent="center">
									<DeleteIcon />
								</ImageOverlay>
							</ImagePreviewContainer>
						))}
						{$isMultiple && (
							<StyledFileUploader
								$height={$height}
								$column
								$padding={[0, 20]}
								$justifyContent="center"
								$alignItems="center"
								$gap={8}
							>
								<AttachFileIcon />
								{$placeholder}
								<input onChange={addFilesHandler} type="file" multiple={$isMultiple} accept="image/*" />
							</StyledFileUploader>
						)}
					</Flex>
				</ImagePreviewBody>
			) : (
				<StyledFileUploader $height={$height} $justifyContent="center" $alignItems="center" $gap={8}>
					<AttachFileIcon />
					{$placeholder}
					<input onChange={fileUploadHandler} type="file" multiple={$isMultiple} accept="image/*" />
				</StyledFileUploader>
			)}
		</Flex>
	);
};

export default FileUploader;
