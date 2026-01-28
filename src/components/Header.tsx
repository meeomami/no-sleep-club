import type { FC } from "react";
import Flex from "./UI/Flex";
import Container from "./Container";
import styled from "styled-components";

import { NavLink } from "react-router-dom";
import Button from "./UI/Button";
import { useActions } from "@/hooks/useActions";

const StyledHeader = styled(Flex)`
	border-bottom: 3px solid #1f1f1f;
`;

const Header: FC = () => {
	const { setModalVisibility } = useActions();

	return (
		<StyledHeader $padding={[28, 0, 20]} $bgc="#e4ebf1">
			<Container $alignItems="center" $justifyContent="space-between">
				<NavLink to="/">
					<img src="/src/assets/logo.png" />
				</NavLink>
				<Button handler={() => setModalVisibility({ name: "authorization", visibility: true })}>Админка</Button>
			</Container>
		</StyledHeader>
	);
};

export default Header;
