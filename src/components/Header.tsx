import type { FC } from "react";
import Flex from "./UI/Flex";
import Container from "./Container";
import styled from "styled-components";

import { NavLink } from "react-router-dom";
import Button from "./UI/Button";
import { useActions } from "@/hooks/useActions";
import { useAppSelector } from "@/hooks/useAppSelector";
import { supabase } from "@/services/supabase.services";

import TelegramIcon from "@icons/telegram.svg?react";

const StyledHeader = styled(Flex)`
	border-bottom: calc(2px + 1 * ((100vw - 320px) / (1920 - 320))) solid #1f1f1f;
`;

const StyledLogo = styled.img`
	width: calc(151px + 130 * ((100vw - 320px) / (1920 - 320)));
`;

const Header: FC = () => {
	const { setModalVisibility, logout } = useActions();

	const { authorizationToken } = useAppSelector((state) => state.auth);

	const handleLogOut = async () => {
		await supabase.auth.signOut({ scope: "local" });
		logout();
	};

	return (
		<StyledHeader $padding={[28, 0, 20]} $bgc="#e4ebf1">
			<Container $alignItems="center" $justifyContent="space-between">
				<NavLink to="/">
					<StyledLogo src="/logo.png" />
				</NavLink>
				<Flex $gap={20}>
					<Button handler={() => window.open("https://t.me/no_sleep_club_server", "_blank", "noreferrer")} $icon={TelegramIcon} />
					{!authorizationToken ? (
						<Button handler={() => setModalVisibility({ name: "authorization", visibility: true })}>Админка</Button>
					) : (
						<Button handler={handleLogOut}>Выйти</Button>
					)}
				</Flex>
			</Container>
		</StyledHeader>
	);
};

export default Header;
