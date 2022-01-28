import React from "react";
import PropTypes from "prop-types";
import Welcome from "./Welcome";

const propTypes = {
  commands: PropTypes.object.isRequired,
};

const defaultProps = {
  prompt: "> ",
  commands: {},
  invalid_command: 'command not found. Try "help" for list of commands.',
};

class CommandLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: [""],
      typingAllowed: true,
    };
    this.promptRef = React.createRef();
    this._focus = this._focus.bind(this);
    this._appendToBuffer = this._appendToBuffer.bind(this);
    this._handleEnter = this._handleEnter.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  _focus() {
    this.promptRef.current.focus();
  }

  _appendToBuffer(str) {
    this.tempBuffer = [...this.tempBuffer, ...str.split("\n")];
  }

  _handleEnter() {
    this._appendToBuffer(this.props.prompt + this.promptRef.current.innerText);
    const input = this.promptRef.current.innerText.trim();
    const commandName = /^([^\s]*)\s?.*$/.exec(input)?.pop();

    if (commandName === "clear") {
      this.tempBuffer = [""];
      this.promptRef.current.innerText = "";
      return;
    }

    this.promptRef.current.innerText = "";
    const command = this.props.commands[commandName];

    if (typeof command === "undefined") {
      this._appendToBuffer(this.props.invalid_command);
      return;
    }

    const args = input.split(/\s+/).slice(1);

    if (command.isAsync) {
      this.setState({
        typingAllowed: false,
      });
      command.fn(args).then((result) => {
        this.setState({
          typingAllowed: true,
          buffer: [...this.state.buffer, result],
        });
      });
    } else {
      const result = command.fn(args);
      this._appendToBuffer(result);
    }
  }

  _handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.tempBuffer = [...this.state.buffer];
      this._handleEnter();
      this.setState({
        buffer: this.tempBuffer,
      });
    }
  }

  componentDidUpdate() {
    this.promptRef.current.scrollIntoView();
  }

  componentDidMount() {
    this._focus();
  }

  render() {
    const styles = this.props.styles || {};
    const lines = this.state.buffer.map((line, index) => (
      <p key={index}>{line}</p>
    ));

    return (
      <div style={styles.cli} onClick={this._focus} className="react_cli">
        <div className="banner noselect">{this.props.banner.banner_text}</div>
        <Welcome text={this.props.banner.banner_welcome} />
        {lines}
        <p style={{ display: this.state.typingAllowed ? "block" : "none" }}>
          <span>{this.props.prompt}</span>
          <span
            spellCheck="false"
            contentEditable="true"
            onKeyDown={this._handleKeyDown}
            ref={this.promptRef}
            style={{ display: "inline-block", verticalAlign: "top" }}
          ></span>
        </p>
      </div>
    );
  }
}

CommandLine.propTypes = propTypes;
CommandLine.defaultProps = defaultProps;

export default CommandLine;