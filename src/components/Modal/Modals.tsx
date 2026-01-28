import type { FC } from "react";
import AuthorizationModal from "./AuthorizationModal";
import ImageModal from "./ImageModal";

const Modals: FC = () => {
	return (
		<>
			<AuthorizationModal />
			<ImageModal />
		</>
	);
};

export default Modals;
