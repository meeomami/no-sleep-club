import type { FC } from "react";
import ModalWrapper from "./ModalWrapper";
import styled from "styled-components";
import Flex from "../UI/Flex";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useInput } from "@/hooks/useInput";
import { useAppSelector } from "@/hooks/useAppSelector";

const Title = styled.div`
	font-size: calc(18px + 6 * ((100vw - 320px) / (1920 - 320)));
	font-weight: 700;
	color: #1f1f1f;
`;

const InputContainer = styled(Flex)`
	max-width: 360px;
	width: 100%;
`;

const AuthorizationContent = styled(Flex)`
	width: 360px;

	@media (max-width: 480px) {
		max-width: 360px;
		width: 100%;
	}
`;

/* const ErrorMessage = styled.div`
	color: #dd5b5b;
`; */

const AuthorizationModal: FC = () => {
	const login = useInput("");
	const password = useInput("");

	const { authorization: isActive } = useAppSelector((state) => state.modal);

	return (
		<ModalWrapper isActive={isActive} name="authorization">
			<AuthorizationContent $column $alignItems="center" $gap={24}>
				<Title>Войти как администратор</Title>
				<InputContainer $column $gap={16}>
					<Input type="text" onChange={login.onChange} value={login.value} placeholder=" Логин" />
					<Input type="password" onChange={password.onChange} value={password.value} placeholder=" Пароль" />
				</InputContainer>
				{/* <ErrorMessage>Неверный логин или пароль</ErrorMessage> */}
				<Button>Войти</Button>
			</AuthorizationContent>
		</ModalWrapper>
	);
};

export default AuthorizationModal;
