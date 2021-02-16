import { useCallback } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import { BACK } from '../Strings';

interface BackArrowProps {
	url: string;
}

const Container = styled.div`
	display: flex;
	align-items: center;
	font-size: 20px;
	color: blue;
`;

const BackArrow: React.FC<BackArrowProps> = ({ url }) => {
	const history = useHistory();
	const backRedirect = useCallback(() => {
		history.push(url);
	}, [history, url]);
	return (
		<>
			<Container onClick={backRedirect}>
				<AiOutlineArrowLeft />
				{BACK}
			</Container>
		</>
	);
};
export default BackArrow;
