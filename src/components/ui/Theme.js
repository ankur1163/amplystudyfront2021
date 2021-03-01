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
});
