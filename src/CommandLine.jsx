import React from "react";
import PropTypes from "prop-types";
import Welcome from "./Welcome";

const propTypes = {
  commands: PropTypes.object.isRequired,
};

const defaultProps = {
  prompt: "> ",
  commands: {},
  invalid_command: (
    <span className="text-muted">
      command not found. Try "help" for list of commands.
    </span>
  ),
};

class CommandLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: [""],
      typingAllowed: true,
      history: [],
    };
    this.tempHistory = "";
    this.historyIndex = -1;
    this.promptRef = React.createRef();
    this._focus = this._focus.bind(this);
    this._appendToBuffer = this._appendToBuffer.bind(this);
    this._handleEnter = this._handleEnter.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleHistory = this._handleHistory.bind(this);
  }

  _focus() {
    this.promptRef.current.focus();
  }

  _appendToBuffer(str) {
    this.tempBuffer = [...this.tempBuffer, str];
  }

  _handleHistory() {
    if (this.historyIndex === -1)
      this.promptRef.current.innerText = this.tempHistory;
    else
      this.promptRef.current.innerText = this.state.history[this.historyIndex];
  }

  _handleEnter() {
    this._appendToBuffer(this.props.prompt + this.promptRef.current.innerText);
    this.setState({
      history: [this.promptRef.current.innerText, ...this.state.history],
    });
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
    if (e.key === "ArrowUp") {
      if (this.historyIndex === -1)
        this.tempHistory = this.promptRef.current.innerText;
      this.historyIndex =
        this.historyIndex + 1 > this.state.history.length - 1
          ? this.state.history.length - 1
          : this.historyIndex + 1;
      this._handleHistory();
    }
    if (e.key === "ArrowDown") {
      this.historyIndex =
        this.historyIndex - 1 < -1 ? -1 : this.historyIndex - 1;
      this._handleHistory();
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
      <div key={index}>{line}</div>
    ));
    return (
      <div style={styles.cli} onClick={this._focus} className="react_cli">
        <div className="banner noselect">{this.props.banner.banner_text}</div>
        <Welcome text={this.props.banner.banner_welcome} />
        <div className="terminal-output">
          <>{lines}</>
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
      </div>
    );
  }
}

CommandLine.propTypes = propTypes;
CommandLine.defaultProps = defaultProps;

export default CommandLine;
