/**
 * Simple banner files from package.json.
 * E.g:
 * 			Prelodr v1.0.4 | MIT (c) 2015 José Luis Quintana
 */

import pkg from '../package.json';

module.exports = `/*! ${pkg.name.charAt(0).toUpperCase()}${pkg.name.slice(1)} v${pkg.version} | ${pkg.license} (c) ${new Date().getFullYear()} ${pkg.author.name} */
`;
