import { appNavigation } from '../constants/routes';
import { REGEX_PATHNAME } from '../constants/regex';

export const getPathnameView = (pathname = '') => pathname.match(REGEX_PATHNAME) || [];

export const extractComponentName = (thisPathname) =>
	appNavigation.find((menu) => menu.pathName === thisPathname) || { componentName: '' };
