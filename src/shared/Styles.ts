import styled from 'styled-components';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { ImMinus, ImPlus } from 'react-icons/im';
import { AiOutlineRight } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';

export const SkeletonFlexContainer = styled.div`
	width: 100%;
	height: 100%;
`;
export const HeaderContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;

export const Container = styled.div``;

export const DetailsHeader = styled.h1`
	margin: 0 0 0 0;
	height: 100%;
	width: 100%;
	text-align: center;
`;

export const AppContainer = styled.div`
	width: 90%;
	margin: 50px auto 0px auto;
`;

export const DeleteIcon = styled(RiDeleteBin6Line)`
	margin-right: 10px;
	vertical-align: middle;
	display: inline-block;
	margin-top: 3px;
	&:hover {
		color: red !important;
		cursor: pointer
	}
`;
export const RightArrow = styled(AiOutlineRight)`
	margin-left: auto;
	vertical-align: middle;
	margin-top: 3px;
	display: inline-block;
	&:hover {
		color: green !important;
		cursor: pointer 
	}
`;

export const GreenSmile = styled(SmileOutlined)`
	color: green;
`;

export const RedFrown = styled(FrownOutlined)`
	color: red
`;

export const MinusIcon = styled(ImMinus)`
	font-size: 30px;
	margin-top: 5px;
	&:hover {
		cursor: pointer;
		color: red !important;
	}
`;

export const PlusIcon = styled(ImPlus)`
	font-size: 30px;
	margin-top: 5px;
	&:hover {
		color: green !important;
		cursor: pointer 
	}
`;