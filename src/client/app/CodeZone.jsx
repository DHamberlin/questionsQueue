import React from 'react';
import CodeMirror from 'codemirror';
import javascript from 'codemirror/mode/javascript/javascript';

class CodeZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeEditor: null,
      readOnly: props.readOnly || false,
    };
    this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  handleCodeChange() {
    const codeSnippet = this.state.codeEditor.getValue();
    // create an object that mimics an event object.
    // provide the values that FormComponent expects for handleInputChange
    this.props.onChange({
      target: {
        value: codeSnippet,
        name: this.props.name,
      },
    });
  }

  componentDidMount() {
    if (!this.state.codeEditor) {
      this.state.codeEditor = CodeMirror.fromTextArea(this.refs.codeZone, {
        lineNumbers: true,
        mode: 'javascript',
        viewportMargin: 50,
        readOnly: this.state.readOnly,
        // matchBrackets: true,
      });
      this.state.codeEditor.on('change', this.handleCodeChange);
    }
  }

  componentWillUnmount() {
    this.state.codeEditor.toTextArea();
  }

  render() {
    return (
      <textarea
      name={this.props.name}
      ref="codeZone"
      rows={10}
      value={this.props.codeSnippet} >
      </textarea>
    );
  }
}

export default CodeZone;
