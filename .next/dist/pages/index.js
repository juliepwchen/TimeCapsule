'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _Layout = require('../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _reactSlick = require('react-slick');

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _factory = require('../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/juliechen/VSCode/TimeCapsule/pages/index.js?entry';


var TimeCapsuleSlider = function (_Component) {
    (0, _inherits3.default)(TimeCapsuleSlider, _Component);

    function TimeCapsuleSlider() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, TimeCapsuleSlider);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TimeCapsuleSlider.__proto__ || (0, _getPrototypeOf2.default)(TimeCapsuleSlider)).call.apply(_ref, [this].concat(args))), _this), _this.colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'], _this.renderSliderItem = function () {
            return _this.props.timecapsules.map(function (address, index) {
                return _react2.default.createElement('div', { key: index, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 22
                    }
                }, _react2.default.createElement(_semanticUiReact.Card
                //image={require('../images/tc1.jpg')}

                .Group, { itemsPerRow: 1, style: { height: 200 }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 23
                    }
                }, _react2.default.createElement(_semanticUiReact.Card, { fluid: true
                    //header={address}
                    //meta='Code Word'
                    //description='Description'
                    //color={this.colors[index]}
                    , extra: _react2.default.createElement(_routes.Link, { route: '/timecapsules/' + address, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 32
                        }
                    }, _react2.default.createElement('a', {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 33
                        }
                    }, 'View Details')),
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 24
                    }
                }, _react2.default.createElement(_semanticUiReact.Card.Content, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 37
                    }
                }, _react2.default.createElement(_semanticUiReact.Card.Header, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 38
                    }
                }, 'Code Name'), _react2.default.createElement(_semanticUiReact.Card.Meta, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 41
                    }
                }, address), _react2.default.createElement(_semanticUiReact.Card.Description, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 44
                    }
                }, 'Description')), _react2.default.createElement(_semanticUiReact.Card.Content, { extra: true, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 48
                    }
                }, _react2.default.createElement('div', { className: 'ui two buttons', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 49
                    }
                }, _react2.default.createElement(_routes.Link, { route: '/timecapsules/' + address, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 50
                    }
                }, _react2.default.createElement(_semanticUiReact.Button, { basic: true, color: 'violet', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 51
                    }
                }, _react2.default.createElement('a', { style: { color: 'blue' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 52
                    }
                }, 'View Details'))))))));
            });
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(TimeCapsuleSlider, [{
        key: 'render',
        value: function render() {
            var settings = {
                dots: true,
                infinite: false,
                speed: 500,
                slidesToShow: 2,
                slidesToScroll: 2
            };
            return _react2.default.createElement(_Layout2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 71
                }
            }, _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 72
                }
            }, _react2.default.createElement(_reactSlick2.default, (0, _extends3.default)({}, settings, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 73
                }
            }), this.renderSliderItem())));
        }
    }], [{
        key: 'getInitialProps',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var timecapsules;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _factory2.default.methods.getDeployTimeCapsules().call();

                            case 2:
                                timecapsules = _context.sent;
                                return _context.abrupt('return', { timecapsules: timecapsules });

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getInitialProps() {
                return _ref2.apply(this, arguments);
            }

            return getInitialProps;
        }()
        // onButtonClick = (address) => {
        //     Router.pushRoute(`/timecapsules/${address}`);
        //     //Router.pushRoute('/');
        // }

    }]);

    return TimeCapsuleSlider;
}(_react.Component);

exports.default = TimeCapsuleSlider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiQ2FyZCIsIkJ1dHRvbiIsIkltYWdlIiwiSWNvbiIsIkxheW91dCIsIlNsaWRlciIsImZhY3RvcnkiLCJSb3V0ZXIiLCJMaW5rIiwiVGltZUNhcHN1bGVTbGlkZXIiLCJjb2xvcnMiLCJyZW5kZXJTbGlkZXJJdGVtIiwicHJvcHMiLCJ0aW1lY2Fwc3VsZXMiLCJtYXAiLCJhZGRyZXNzIiwiaW5kZXgiLCJoZWlnaHQiLCJjb2xvciIsInNldHRpbmdzIiwiZG90cyIsImluZmluaXRlIiwic3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsIm1ldGhvZHMiLCJnZXREZXBsb3lUaW1lQ2Fwc3VsZXMiLCJjYWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFTLEFBQU0sQUFBUSxBQUFPOztBQUM5QixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTzs7OztBQUNQLEFBQU8sQUFBYTs7OztBQUNwQixBQUFTLEFBQVEsQUFBWTs7Ozs7OztJLEFBRXZCOzs7Ozs7Ozs7Ozs7OztzT0FDRixBLFNBQVMsQ0FBQSxBQUNMLE9BREssQUFDRSxVQURGLEFBQ1ksVUFEWixBQUNzQixTQUR0QixBQUMrQixTQUQvQixBQUN3QyxRQUR4QyxBQUNnRCxRQURoRCxBQUN3RCxVQUR4RCxBQUNrRSxVQURsRSxBQUM0RSxRQUQ1RSxBQUNvRixTQURwRixBQUM2RixRQUQ3RixBQUNxRyxBLGdCQVU5RyxBLG1CQUFtQixZQUFBO3lCQUNmLEFBQUssTUFBTCxBQUFXLGFBQVgsQUFBd0IsSUFBSSxVQUFBLEFBQUMsU0FBRCxBQUFVLE9BQVY7dUNBQ3hCLGNBQUEsU0FBSyxLQUFMLEFBQVU7a0NBQVY7b0NBQUEsQUFDRTtBQURGO2lCQUFBLGtCQUNHO0FBQ0M7O0FBREYsaUJBQUEsQUFBTSxTQUFNLGFBQVosQUFBeUIsR0FBRyxPQUFPLEVBQUMsUUFBcEMsQUFBbUMsQUFBUztrQ0FBNUM7b0NBQUEsQUFDRTtBQURGO21DQUNHLEFBQ0csdUNBQ0EsT0FDQTtBQUNBO0FBQ0E7QUFDQTtBQU5KO3NCQU9JLHVCQUNJLEFBQUMsOEJBQUssMEJBQU4sQUFBOEI7c0NBQTlCO3dDQUFBLEFBQ0k7QUFESjtxQkFBQSxrQkFDSSxjQUFBOztzQ0FBQTt3Q0FBQTtBQUFBO0FBQUEsdUJBVFosQUFRUSxBQUNJOztrQ0FUWjtvQ0FBQSxBQWFJO0FBYko7bUNBYUssY0FBRCxzQkFBQSxBQUFNOztrQ0FBTjtvQ0FBQSxBQUNJO0FBREo7QUFBQSxtQ0FDSyxjQUFELHNCQUFBLEFBQU07O2tDQUFOO29DQUFBO0FBQUE7QUFBQSxtQkFESixBQUNJLEFBR0EsOEJBQUMsY0FBRCxzQkFBQSxBQUFNOztrQ0FBTjtvQ0FBQSxBQUNDO0FBREQ7QUFBQSxtQkFKSixBQUlJLEFBR0EsMEJBQUMsY0FBRCxzQkFBQSxBQUFNOztrQ0FBTjtvQ0FBQTtBQUFBO0FBQUEsbUJBcEJSLEFBYUksQUFPSSxBQUlKLGlDQUFDLGNBQUQsc0JBQUEsQUFBTSxXQUFRLE9BQWQ7a0NBQUE7b0NBQUEsQUFDSTtBQURKO21DQUNJLGNBQUEsU0FBSyxXQUFMLEFBQWU7a0NBQWY7b0NBQUEsQUFDRTtBQURGO21DQUNFLEFBQUMsOEJBQUssMEJBQU4sQUFBOEI7a0NBQTlCO29DQUFBLEFBQ0U7QUFERjttQ0FDRSxBQUFDLHlDQUFPLE9BQVIsTUFBYyxPQUFkLEFBQW9CO2tDQUFwQjtvQ0FBQSxBQUNJO0FBREo7bUNBQ0ksY0FBQSxPQUFHLE9BQU8sRUFBQyxPQUFYLEFBQVUsQUFBTztrQ0FBakI7b0NBQUE7QUFBQTttQkEvQkksQUFDeEIsQUFDRSxBQUNFLEFBd0JJLEFBQ0ksQUFDRSxBQUNFLEFBQ0k7QUFoQ1QsQUFDZixhQUFBO0E7Ozs7O2lDQXlDSyxBQUNMO2dCQUFNO3NCQUFXLEFBQ1AsQUFDTjswQkFGYSxBQUVILEFBQ1Y7dUJBSGEsQUFHTixBQUNQOzhCQUphLEFBSUMsQUFDZDtnQ0FMSixBQUFpQixBQUtHLEFBRXBCO0FBUGlCLEFBQ2I7bUNBT0EsQUFBQzs7OEJBQUQ7Z0NBQUEsQUFDSTtBQURKO0FBQUEsYUFBQSxrQkFDSSxjQUFBOzs4QkFBQTtnQ0FBQSxBQUNJO0FBREo7QUFBQSwrQkFDSSxBQUFDLCtEQUFELEFBQVk7OzhCQUFaO2dDQUFBLEFBRUk7QUFGSjtBQUFBLHFCQUhaLEFBQ0ksQUFDSSxBQUNJLEFBRUksQUFBSyxBQU14Qjs7Ozs7Ozs7Ozs7O3VDQXBFOEIsa0JBQUEsQUFBUSxRQUFSLEFBQWdCLHdCQUFoQixBLEFBQXdDOztpQ0FBN0Q7QTtpRUFDQyxFQUFFLGNBQUYsQTs7Ozs7Ozs7Ozs7Ozs7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQVg0QixBLEFBNEVoQzs7a0JBQUEsQUFBZSIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvVXNlcnMvanVsaWVjaGVuL1ZTQ29kZS9UaW1lQ2Fwc3VsZSJ9