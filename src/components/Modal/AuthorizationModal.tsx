import { useState, type FC } from "react";
import ModalWrapper from "./ModalWrapper";
import styled from "styled-components";
import Flex from "../UI/Flex";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useInput } from "@/hooks/useInput";
import { useAppSelector } from "@/hooks/useAppSelector";
import { supabase } from "@/services/supabase.services";
import { useActions } from "@/hooks/useActions";

const Title = styled.div`
	font-size: calc(18px + 6 * ((100vw - 320px) / (1920 - 320)));
	font-weight: 700;
	color: #1f1f1f;
`;

const InputContainer = styled(Flex)`
	max-width: 360px;
	width: 100%;
`;

const AuthorizationContent = styled(Flex).attrs({ as: "form" })`
	width: 360px;

	@media (max-width: 480px) {
		max-width: 360px;
		width: 100%;
	}
`;

const ErrorMessage = styled.div`
	color: #dd5b5b;
`;

const AuthorizationModal: FC = () => {
	const login = useInput("");
	const password = useInput("");

	const { authorization: isActive } = useAppSelector((state) => state.modal);

	const { login: authorizeUser, setModalVisibility } = useActions();

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const logIn = async (event: React.SubmitEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const { data, error } = await supabase.auth.signInWithPassword({
			email: login.value,
			password: password.value,
		});

		if (data.session?.access_token) {
			authorizeUser(data.session.access_token);
			setModalVisibility({ name: "authorization", visibility: false });
		}

		setErrorMessage(error ? "Неверный логин или пароль" : null);
	};

	return (
		<ModalWrapper isActive={isActive} name="authorization">
			<AuthorizationContent $column $alignItems="center" $gap={24}>
				<Title>Войти как администратор</Title>
				<InputContainer $column $gap={16}>
					<Input type="text" onChange={login.onChange} value={login.value} placeholder=" Логин" />
					<Input type="password" onChange={password.onChange} value={password.value} placeholder=" Пароль" />
				</InputContainer>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<Button handler={(event: React.SubmitEvent<HTMLButtonElement>) => logIn(event)}>Войти</Button>
			</AuthorizationContent>
		</ModalWrapper>
	);
};

export default AuthorizationModal;
