//@ts-nocheck
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Button from '@material-ui/core/Button';
import theme from 'prism-react-renderer/themes/nightOwl';
import { Link } from 'react-router-dom';
import '../prism.css';
import './addCodePage';

import Heading from '../components/heading';

const gridStyle = {
    Grid: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
    }
};

const styles = {
    root: {
        boxSizing: 'border-box',
        height: '50vh',
        width: '100%',
        fontFamily: '"Dank Mono", "Fira Code", monospace',
        ...theme.plain
    }
};

const outputBox = {
    height: '50vh',
    width: '100%',
    padding: '20',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.3)',
};

const code = `(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;

export class codeIDE extends Component {
    state = {
        code: code,
        language: 'js',
        output: ''
    };

    onValueChange = code => {
        this.setState({code});
    };

    onLanguageChange = e => {
        this.setState({ language: e.target.value });
        console.log(e.target.value);
    };

    onOutputChange = () => {
        this.setState({ output: 'Hello World' });
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
                    <option htmlFor="language" value="js">JavaScript</option>
                    <option htmlFor="language" value="py">Python</option>
                    <option htmlFor="language" value="java">Java</option>
                    <option htmlFor="language" value="cpp">C++</option>
                </select>
                <Grid container style={gridStyle.Grid}>
                    <Grid item xs sm>
                        <Editor
                            value={this.state.code}
                            onValueChange={this.onValueChange}
                            highlight={this.highlight}
                            padding={20}
                            style={styles.root}
                        />
                        <br />
                        <Button variant="contained" onClick={this.onOutputChange}>Execute</Button>
                    </Grid>
                    <Grid item xs>
                        <div style={outputBox}>
                            {this.state.output}
                        </div>
                    </Grid>
                </Grid>
                <Grid>
                    <Grid item xs>
                        <Link to='/addCode'>
                            <button className="buttonStyle">Snap Another Code!</button>
                        </Link>  
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default codeIDE;