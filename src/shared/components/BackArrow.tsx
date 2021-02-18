import React, { useCallback } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

import { BACK } from '../Strings';
import { BackArrowContainer } from './Styles';

interface BackArrowProps {
	url: string;
}

const BackArrow: React.FC<BackArrowProps> = ({ url }) => {
	const history = useHistory();

	const backRedirect = useCallback(() => {
		history.push(url);
	}, [history, url]);

	return (
		<BackArrowContainer onClick={backRedirect}>
			<AiOutlineArrowLeft />
			{BACK}
		</BackArrowContainer>
	);
};

export default BackArrow;
