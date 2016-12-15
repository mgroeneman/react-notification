import React, { Component } from 'react';
import defaultPropTypes from './defaultPropTypes';

class Notification extends Component {
  constructor(props) {
    super(props);

    this.getBarStyle = this.getBarStyle.bind(this);
    this.getActionStyle = this.getActionStyle.bind(this);
    this.getTitleStyle = this.getTitleStyle.bind(this);
    this.handleClick = this.handleClick.bind(this);

    if (props.onDismiss && props.isActive) {
      this.dismissTimeout = setTimeout(
        props.onDismiss,
        props.dismissAfter
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dismissAfter === false) return;

    // See http://eslint.org/docs/rules/no-prototype-builtins
    if (!{}.hasOwnProperty.call(nextProps, 'isLast')) {
      clearTimeout(this.dismissTimeout);
    }

    if (nextProps.onDismiss && nextProps.isActive && !this.props.isActive) {
      this.dismissTimeout = setTimeout(
        nextProps.onDismiss,
        nextProps.dismissAfter
      );
    }
  }

  componentWillUnmount() {
    if (this.props.dismissAfter) clearTimeout(this.dismissTimeout);
  }

  /*
  * @description Dynamically get the styles for the bar.
  * @returns {object} result The style.
  */
  getBarStyle() {
    const { isActive, barStyle, activeBarStyle } = this.props;

    return isActive ?
    Object.assign({}, barStyle, activeBarStyle) :
    Object.assign({}, barStyle);
  }

  /*
  * @function getActionStyle
  * @description Dynamically get the styles for the action text.
  * @returns {object} result The style.
  */
  getActionStyle() {
    return this.props.actionStyle;
  }

  /*
  * @function getTitleStyle
  * @description Dynamically get the styles for the title.
  * @returns {object} result The style.
  */
  getTitleStyle() {
    return this.props.titleStyle;
  }

  /*
  * @function handleClick
  * @description Handle click events on the action button.
  */
  handleClick() {
    if (this.props.onClick && typeof this.props.onClick === 'function') {
      return this.props.onClick();
    }
  }

  render() {
    let className = 'notification-bar';

    if (this.props.isActive) className += ` ${this.props.activeClassName}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div className={className} style={this.getBarStyle()}>
        <div className="notification-bar-wrapper">
          {this.props.title ? (
            <span
              className="notification-bar-title"
              style={this.getTitleStyle()}
            >
              {this.props.title}
            </span>
          ) : null}
          <span className="notification-bar-message">
            {this.props.message}
          </span>
          {this.props.action ? (
            <span
              className="notification-bar-action"
              onClick={this.handleClick}
              style={this.getActionStyle()}
            >
              {this.props.action}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

Notification.propTypes = defaultPropTypes;

Notification.defaultProps = {
  isActive: false,
  dismissAfter: 2000,
  activeClassName: 'notification-bar-active'
};

export default Notification;
