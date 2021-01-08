import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { createMuiTheme } from '@material-ui/core/styles';

const breakpoints = createBreakpoints({});
const defaultHtmlFontSize = 16;
const pxToRem = (px) => `${px / defaultHtmlFontSize}rem`;

export default createMuiTheme({
	palette: {
		common: {},
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
			fontWeight: 300,
			letterSpacing: 0,
			fontSize: pxToRem(50),
			[breakpoints.down('sm')]: {
				fontSize: pxToRem(30),
			},
		},
		h2: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 300,
			letterSpacing: 0,
			fontSize: pxToRem(46),
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(22),
			},
		},
		h3: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 400,
			letterSpacing: 0,
			fontSize: pxToRem(34),
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(30),
			},
		},
		h4: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 400,
			letterSpacing: 0,
			fontSize: pxToRem(30),
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(22),
			},
		},
		h5: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 400,
			letterSpacing: 0,
			fontSize: pxToRem(25),
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(22),
			},
		},
		h6: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 500,
			letterSpacing: 0,
			fontSize: pxToRem(22),
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(17),
			},
		},
		subtitle1: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 400,
			letterSpacing: 0,
			fontSize: pxToRem(20),
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(12),
			},
		},
		subtitle2: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 500,
			letterSpacing: 0,
			fontSize: pxToRem(18),
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(18),
			},
		},
		body1: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 400,
			letterSpacing: 0,
			fontSize: pxToRem(17),
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(15),
			},
		},
		body2: {
			fontFamily: '"Roboto", sans-serif',
			fontWeight: 400,
			letterSpacing: 0,
			fontSize: pxToRem(16),
			[breakpoints.down('xs')]: {
				fontSize: pxToRem(13),
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
