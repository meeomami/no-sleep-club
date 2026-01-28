import Container from "@/components/Container";
import type { FC } from "react";
import styled from "styled-components";

const StyledImgage = styled.img`
	width: 100%;
`;

const NotFoundPage: FC = () => {
	return (
		<Container $padding={[50, 20]}>
			<StyledImgage src="https://cdn.dribbble.com/userupload/28476171/file/original-549eefc4d8f64508e236dfe8c18c9178.png?resize=1024x768&vertical=center" />
		</Container>
	);
};

export default NotFoundPage;
