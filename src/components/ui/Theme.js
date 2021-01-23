import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { createMuiTheme } from '@material-ui/core/styles';

const breakpoints = createBreakpoints({});
const defaultHtmlFontSize = 16;
const pxToRem = (px) => `${px / defaultHtmlFontSize}rem`;

export default createMuiTheme({
	palette: {
		common: {
			black: '#0F172A',
		},
		text: {
			primary: '#0F172A',
			secondary: '#334155',
			disabled: '#CBD5E1',
		},
	},
	breakpoints: {
		keys: ['xs', 'sm', 'md', 'lg', 'xl'],
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
	typography: {
		htmlFontSize: defaultHtmlFontSize,
		fontFamily: '"Roboto", sans-serif',
		fontSize: 14,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		h1: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 500,
			letterSpacing: 0,
			fontSize: pxToRem(50),
			[breakpoints.down('sm')]: {
				fontSize: pxToRem(30),
			},
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(28),
			},
		},
		h2: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 500,
			letterSpacing: 0,
			fontSize: pxToRem(48),
			[breakpoints.down('sm')]: {
				fontSize: pxToRem(30),
			},
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(26),
			},
		},
		h3: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 500,
			letterSpacing: 0,
			fontSize: pxToRem(38),
			[breakpoints.down('sm')]: {
				fontSize: pxToRem(28),
			},
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(24),
			},
		},
		h4: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 400,
			letterSpacing: 0,
			fontSize: pxToRem(28),
			[breakpoints.down('sm')]: {
				fontSize: pxToRem(26),
			},
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(22),
			},
		},
		h5: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 400,
			letterSpacing: 0,
			fontSize: pxToRem(24),
			[breakpoints.down('sm')]: {
				fontSize: pxToRem(22),
			},
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(18),
			},
		},
		h6: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 400,
			letterSpacing: 0,
			fontSize: pxToRem(22),
			[breakpoints.down('sm')]: {
				fontSize: pxToRem(18),
			},
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(16),
			},
		},
		subtitle1: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 400,
			letterSpacing: 0,
			fontSize: pxToRem(20),
			[breakpoints.down('sm')]: {
				fontSize: pxToRem(18),
			},
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(16),
			},
		},
		subtitle2: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 500,
			letterSpacing: 0,
			fontSize: pxToRem(18),
			[breakpoints.down('sm')]: {
				fontSize: pxToRem(16),
			},
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(14),
			},
		},
		body1: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 400,
			letterSpacing: 0,
			fontSize: pxToRem(18),
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(16),
			},
		},
		body2: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 400,
			letterSpacing: 0,
			fontSize: pxToRem(16),
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(14),
			},
		},
		button: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 500,
			fontSize: '0.875rem',
			letterSpacing: '0.02857em',
			textTransform: 'uppercase',
		},
		caption: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 400,
			letterSpacing: 0,
			fontSize: pxToRem(13),
		},
		overline: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 400,
			letterSpacing: 0,
			fontSize: pxToRem(12),
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(10),
			},
		},
	},
});
