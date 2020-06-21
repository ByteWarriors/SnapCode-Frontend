//@ts-nocheck
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { Link } from 'react-router-dom';
import '../prism.css';

import Heading from '../components/heading';
import axios from 'axios';

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

const code = `
    Hindude L stdio.h
    int main () 2
    int a5;
    int b:b;
    printf("1d,atb);
    3
`

export class codeIDE extends Component {

    state = {
        code: code,
        language: 'C',
        output: ''
    };
    
    onValueChange = code => {
        this.setState({ code });
    };

    onLanguageChange = e => {
        this.setState({ language: e.target.value });
    };

    onOutputChange = () => {
        console.log(this.state.code);
        axios.post('https://bytewarriors-snapcode.herokuapp.com/run-code',{
            "source": this.state.code,
            "lang": this.state.language,
            headers: {
                "Content-type": "application/json",
            },
        })
        .then(res => {
            if(res.status === 200) {
                this.setState({
                    output: res.data.output
                })
            }
        })
        .catch(err => {
            alert(err)
        })
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
                    <option htmlFor="language">C</option>
                    <option htmlFor="language">CPP</option>
                    <option htmlFor="language">PYTHON3</option>
                    <option htmlFor="language">JAVA</option>
                    <option htmlFor="language">JAVASCRIPT_NODE</option>
                </select>
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