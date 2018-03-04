/* recommended */
/* boolean.directive.js */

/**
 * @desc select & display a yes/no true/false with editable
 * @example <div acme-order-calendar-range></div>
 */

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('tables.widget', ['core']);


angular
    .module('tables.widget')
    .directive('booleanYesNo', booleanYesNo);

function booleanYesNo() {
    /* implementation details */
}


