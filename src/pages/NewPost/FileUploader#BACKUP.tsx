import Flex from "@/components/UI/Flex";
import { rv } from "@/utils/rv";
import { useState, type ChangeEvent, type FC } from "react";
import styled from "styled-components";

import { AnimatePresence as AP, motion as m } from "framer-motion";

import AttachFileIcon from "@icons/attach-file.svg?react";
import DeleteIcon from "@icons/delete.svg?react";

interface FileUploaderProps {
	$height?: number;
	$placeholder?: string;
	$name?: string;
	$isMultiple?: boolean;
	$uploadedFiles: FileList | null;
	$setUploadedFiles: (value: FileList | null) => void;
}

const StyledFileUploader = styled(Flex).attrs({ as: "label" })<FileUploaderProps>`
	width: 100%;
	height: ${({ $height }) => $height || 200}px;
	border: ${rv(3, 2)} dashed currentColor;
	font-weight: 500;
	font-size: 16px;
	cursor: pointer;
	transition: 350ms;
	overflow: hidden;

	svg,
	svg path {
		fill: currentColor;
		transition: 350ms;
	}

	input {
		display: none;
	}

	${({ $uploadedFiles }) =>
		!$uploadedFiles
			? `
	color: #6e808e;

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			color: #1f1f1f;
		}
	}
	`
			: `
			border: ${rv(3, 2)} solid currentColor;
			color: #1f1f1f;
	`}
`;

const ImagePreviewOverlay = styled(Flex)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(22, 23, 25, 0.75);
	color: #ffffff;
	transition: 350ms;
	opacity: 0;
	visibility: hidden;

	svg,
	svg path {
		fill: currentColor;
	}

	svg {
		width: 40px;
		height: 40px;
	}
`;

const ImagePreview = styled(m.div)<Pick<FileUploaderProps, "$height">>`
	width: 100%;
	height: 100%;
	position: relative;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			${ImagePreviewOverlay} {
				opacity: 1;
				visibility: visible;
			}
		}
	}
`;

export const Name = styled.div`
	font-weight: 500;
	color: #6e808e;
	font-size: 16px;
`;

const FileUploader: FC<FileUploaderProps> = (props) => {
	const [preview, setPreview] = useState<string | null>(null);

	const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			props.$setUploadedFiles(event.target.files);
			const objectUrl = URL.createObjectURL(event.target.files[0]);
			setPreview(objectUrl);
		}
	};

	const handleRemoveImage = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		props.$setUploadedFiles(null);
	};

	const transitions = {
		initial: { opacity: 0, scale: 1.1 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 1.1 },
	};

	return (
		<AP>
			<Flex $column $gap={4}>
				<Name>{props.$name}</Name>
				<StyledFileUploader $alignItems="center" $justifyContent="center" {...props}>
					{!props.$uploadedFiles ? (
						<m.div style={{ padding: "0 20px" }} {...transitions}>
							<AttachFileIcon />
							{props.$placeholder && <span>{props.$placeholder}</span>}
							<input
								multiple={props.$isMultiple}
								onChange={handleFileUpload}
								accept="image/jpeg, image/png, image/gif"
								type="file"
							/>
						</m.div>
					) : (
						<ImagePreview {...transitions} onClick={handleRemoveImage} $height={props.$height}>
							<img src={preview || "/"} />
							<ImagePreviewOverlay $alignItems="center" $justifyContent="center">
								<DeleteIcon />
							</ImagePreviewOverlay>
						</ImagePreview>
					)}
				</StyledFileUploader>
			</Flex>
		</AP>
	);
};

export default FileUploader;
