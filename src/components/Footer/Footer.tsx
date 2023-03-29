/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography, useTheme } from '@mui/material';

import { FOOTER_TEXT, FOOTER_HEIGHT } from '../../utils/constants';
import { useLocation } from 'react-router';
import { useFetchNewsQuery } from '../../redux/features/news/newsApi';
import { CircleLoader } from '../CircleLoader';

export const Footer = () => {
	const theme = useTheme();

	const pathname = useLocation().pathname;
	const countryCode: any = pathname.split('/').pop()?.toLowerCase();

	const { data, isLoading, isError } = useFetchNewsQuery({
		countryCode: countryCode,
	});

	return (
		<div
			css={css`
				flex: 1;
				display: flex;
				justify-content: center;
				background: ${theme.palette.background.paper};
				min-height: ${FOOTER_HEIGHT};
			`}>
			<Typography
				css={css`
					word-spacing: 0.1rem;
					text-transform: uppercase;
				`}
				variant='caption'
				color='textSecondary'>
				{FOOTER_TEXT}
			</Typography>
			<div
				css={css`
					align-self: center;
				`}>
				{isLoading ? (
					<CircleLoader size={10} />
				) : (
					<Typography
						css={css`
							word-spacing: 0.1rem;
							text-transform: uppercase;
							display: flex;
							align-items: center;
							margin-left: 0.5rem;
						`}
						variant='caption'
						color='textSecondary'>
						{isError ? null : `Articles number: ${data?.articles.length}`}
					</Typography>
				)}
			</div>
		</div>
	);
};
