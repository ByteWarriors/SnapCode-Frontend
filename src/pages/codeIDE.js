//@ts-nocheck
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { Link } from 'react-router-dom';
import '../prism.css';
import './addCodePage';

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

// const code = `
// (function someDemo() {
//   var test = "Hello World!";
//   console.log(test);
// })();

// return () => <App />;
// `;

export class codeIDE extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.receivedCode,
            language: 'js',
            output: ''
        };
    }

    onValueChange = code => {
        this.setState({ code });
    };

    onLanguageChange = e => {
        this.setState({ language: e.target.value });
        console.log(e.target.value);
    };

    onOutputChange = () => {
        this.setState({ output: 'rahul' });
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
                <select onChange={this.onLanguageChange} value={this.state.language}>
                    <option htmlFor="language">js</option>
                    <option htmlFor="language">py</option>
                    <option htmlFor="language">java</option>
                    <option htmlFor="language">cpp</option>
                </select>
                <Grid container style={style.Grid}>
                    <Grid item xs>
                        <Editor
                            value={this.state.code}
                            onValueChange={() => this.onValueChange(this.state.code)}
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