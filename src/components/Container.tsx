import type { FC } from "react";
import styled from "styled-components";
import Flex, { type FlexProps } from "./UI/Flex";

const StyledContainer = styled(Flex)`
	max-width: 1000px;
	width: 100%;
`;

const Container: FC<FlexProps> = (props) => {
	return <StyledContainer {...props} $padding={props.$padding || [0, 20]} $margin={[0, "auto"]} />;
};

export default Container;
