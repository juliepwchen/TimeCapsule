'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _TimeCapsuleFactory = require('./build/TimeCapsuleFactory.json');

var _TimeCapsuleFactory2 = _interopRequireDefault(_TimeCapsuleFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Using deployed Contract address from manually run "node deploy.js"
//return an instance of Factory via Web3 provider
var instance = new _web2.default.eth.Contract(JSON.parse(_TimeCapsuleFactory2.default.interface), '0x09FF5BfA0a0dbFDC06aC07c5c6Cd4C34203b7EED');

exports.default = instance;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2ZhY3RvcnkuanMiXSwibmFtZXMiOlsid2ViMyIsIlRpbWVDYXBzdWxlRmFjdG9yeSIsImluc3RhbmNlIiwiZXRoIiwiQ29udHJhY3QiLCJKU09OIiwicGFyc2UiLCJpbnRlcmZhY2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQXdCOzs7Ozs7QUFIL0I7QUFDQTtBQUlBLElBQU0sV0FBVyxJQUFJLGNBQUEsQUFBSyxJQUFULEFBQWEsU0FDMUIsS0FBQSxBQUFLLE1BQU0sNkJBREUsQUFDYixBQUE4QixZQURsQyxBQUFpQixBQUViLEFBR0o7O2tCQUFBLEFBQWUiLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvanVsaWVjaGVuL1ZTQ29kZS9UaW1lQ2Fwc3VsZSJ9