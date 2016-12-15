'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable react/jsx-no-bind */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stackedNotification = require('./stackedNotification');

var _stackedNotification2 = _interopRequireDefault(_stackedNotification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defaultStyleFactory(index, style) {
  return _extends({}, style, { bottom: 2 + index * 4 + 'rem' });
}

/**
* The notification list does not have any state, so use a
* pure function here. It just needs to return the stacked array
* of notification components.
*/
var NotificationStack = function NotificationStack(props) {
  return _react2.default.createElement(
    'div',
    { className: 'notification-list' },
    props.notifications.map(function (notification, index) {
      var isLast = index === 0 && props.notifications.length === 1;
      var dismissNow = isLast || !props.dismissInOrder;
      var dismissAfter = notification.dismissAfter;

      if (dismissAfter !== false) {
        if (dismissAfter == null) dismissAfter = props.dismissAfter;
        if (!dismissNow) dismissAfter += index * 1000;
      }
      var barStyle = props.barStyleFactory(index, notification.barStyle);
      var activeBarStyle = props.activeBarStyleFactory(index, notification.activeBarStyle);

      return _react2.default.createElement(_stackedNotification2.default, _extends({}, notification, {
        key: notification.key,
        isLast: isLast,
        action: notification.action || props.action,
        dismissAfter: dismissAfter,
        onDismiss: props.onDismiss.bind(undefined, notification),
        activeBarStyle: activeBarStyle,
        barStyle: barStyle
      }));
    })
  );
};

/* eslint-disable react/no-unused-prop-types, react/forbid-prop-types */

NotificationStack.propTypes = {
  activeBarStyleFactory: _react.PropTypes.func,
  barStyleFactory: _react.PropTypes.func,
  dismissInOrder: _react.PropTypes.bool.isRequired,
  notifications: _react.PropTypes.array.isRequired,
  onDismiss: _react.PropTypes.func.isRequired
};

NotificationStack.defaultProps = {
  activeBarStyleFactory: defaultStyleFactory,
  barStyleFactory: defaultStyleFactory,
  dismissInOrder: true,
  dismissAfter: 1000
};

/* eslint-enable no-alert, no-console */

exports.default = NotificationStack;