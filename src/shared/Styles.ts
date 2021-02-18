import styled from 'styled-components';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';

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

export const DeleteIconWrapper = styled.div`
	margin-right: 10px;
	vertical-align: middle;
	display: inline-block;
	margin-top: 3px;
`;
export const RightArrowWrapper = styled.div`
	margin-left: auto;
	vertical-align: middle;
	margin-top: 3px;
	display: inline-block;
`;

export const PlusMinusWrapper= styled.div`
    font-size: 30px;
    margin-top: 5px;
`;

export const GreenSmile = styled(SmileOutlined)`
	color: green;
`;

export const RedFrown = styled(FrownOutlined)`
	color: red
`;