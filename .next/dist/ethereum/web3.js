'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var web3 = void 0;
//Assume user has Metamask installed in browser
//Metamask injects a web3 object in browser
if (typeof window !== 'undefined') {
    if (typeof window.web3 !== 'undefined') {
        web3 = new _web2.default(window.web3.currentProvider); //window.web3 deprecated
    } else web3 = new _web2.default(web3.currentProvider);
} else {
    //user on server OR not using Metamask
    var provider = new _web2.default.providers.HttpProvider('https://rinkeby.infura.io/1sShrQjlFt3rxAc7c4Tu');
    web3 = new _web2.default(provider);
}

exports.default = web3;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL3dlYjMuanMiXSwibmFtZXMiOlsiV2ViMyIsIndlYjMiLCJ3aW5kb3ciLCJjdXJyZW50UHJvdmlkZXIiLCJwcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTyxBQUFQOzs7Ozs7QUFFQSxJQUFJLFlBQUo7QUFDQTtBQUNBO0FBQ0EsSUFBSSxPQUFPLEFBQVAsV0FBa0IsQUFBdEIsYUFBbUMsQUFDL0I7UUFBSSxPQUFPLE9BQU8sQUFBZCxTQUF1QixBQUEzQixhQUF3QyxBQUNwQztlQUFPLEFBQUksQUFBSixrQkFBUyxPQUFPLEFBQVAsS0FBWSxBQUFyQixBQUFQLEFBRG9DLGtCQUNXLEFBQ2xEO0FBRkQsV0FFTyxPQUFPLEFBQUksQUFBSixrQkFBUyxLQUFLLEFBQWQsQUFBUCxBQUNWO0FBSkQsT0FJTyxBQUNIO0FBQ0E7UUFBTSxXQUFXLElBQUksY0FBSyxBQUFMLFVBQWUsQUFBbkIsYUFDYixBQURhLEFBQWpCLEFBR0E7V0FBTyxBQUFJLEFBQUosa0JBQVMsQUFBVCxBQUFQLEFBQ0g7QUFFRDs7a0JBQWUsQUFBZiIsImZpbGUiOiJ3ZWIzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qdWxpZWNoZW4vVlNDb2RlL1RpbWVDYXBzdWxlIn0=