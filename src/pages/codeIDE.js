//@ts-nocheck
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import theme from 'prism-react-renderer/themes/nightOwl';
import { Link } from 'react-router-dom';
import '../prism.css';

import Heading from '../components/heading';

const style = {
    Grid: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
    }
};

const styles = {
    root: {
        boxSizing: 'border-box',
        height: '60vh',
        fontFamily: '"Dank Mono", "Fira Code", monospace',
        ...theme.plain
    }
};

const outputBox = {
    border: '1px solid black',
    height: '59.8vh',
};

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;

export class codeIDE extends Component {
    state = { 
        code: exampleCode, 
        language: 'js', 
        output: ''
    };

    onValueChange = code => {
        this.setState({ code });
    };

    onLanguageChange = e => {
        this.setState({ language: e.target.value });
        console.log(e.target.value);
    };

    onOutputChange = () => {
        this.setState({ output: 'rahul' })
    };

    highlight = code => (
        <Highlight {...defaultProps} theme={theme} code={code} language={this.state.language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <React.Fragment>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                        </div>
                    ))}
                </React.Fragment>
            )}
        </Highlight>
    );
    render() {
        return (
            <div>
                <Heading />
                <Select onChange={this.onLanguageChange} value={this.state.language}>
                <MenuItem value="">
            <em>None</em>
          </MenuItem>
                        <option htmlFor="language">js</option>
                        <option htmlFor="language">py</option>
                        <option htmlFor="language">java</option>
                        <option htmlFor="language">cpp</option>
                    </Select>
                <Grid container style={style.Grid}>
                    <Grid item xs>
                        <Editor
                            value={this.state.code}
                            onValueChange={this.onValueChange}
                            highlight={this.highlight}
                            padding={10}
                            style={styles.root}
                        />
                        <button onClick={this.onOutputChange}>Execute!</button>
                    </Grid>
                    <Grid item xs>
                        <div style={outputBox}>
                            {this.state.output}
                        </div>
                    </Grid>
                </Grid>
                <Grid>
                <Link to='/addCode'>
                <button>
                    Snap Another Code
                </button>
            </Link>
                </Grid>
            </div>
        );
    }
}

export default codeIDE;