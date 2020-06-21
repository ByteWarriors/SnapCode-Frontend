//@ts-nocheck
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Button from '@material-ui/core/Button';
import theme from 'prism-react-renderer/themes/nightOwl';
import '../prism.css';

import CodePage from './addCodePage';
import Heading from '../components/heading';
import axios from 'axios';

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

export class codeIDE extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            code: this.props.code,
            language: 'C',
            output: '',
            back: false,
            newLang: 'c',
        };
    }

    onValueChange = code => {
        this.setState({ code });
    };

    onLanguageChange = e => {
        this.setState({ 
            language: e.target.value
        });
        if(this.state.language === 'C') {
            this.setState({
                newLang: 'c'
            })
        }
        else if(this.state.language === 'PYTHON3') {
            this.setState({
                newLang: 'py'
            })
        }
        if(this.state.language === 'JAVA') {
            this.setState({
                newLang: 'java'
            })
        }
        if(this.state.language === 'JAVASCRIPT_NODE') {
            this.setState({
                newLang: 'js'
            })
        }
        if(this.state.language === 'CPP') {
            this.setState({
                newLang: 'cpp'
            })
        }
    };

    handleNav = () => {
        this.setState({
            back: true
        });
    };

    onOutputChange = () => {
        console.log(this.state.code);
        axios.post('https://bytewarriors-snapcode.herokuapp.com/run-code', {
            "source": this.state.code,
            "lang": this.state.language,
            headers: {
                "Content-type": "application/json",
            },
        })
            .then(res => {
                console.log("x", res.data);
                if (res.status === 200) {
                    this.setState({
                        output: res.data.output
                    });
                } else if (res.status === 201) {
                    this.setState({
                        output: res.data.compile_status
                    });
                }
            });
    };

    highlight = code => (
        <Highlight {...defaultProps} theme={theme} code={code} language={this.state.newLang}>
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
        if (this.state.back) {
            return <CodePage />;
        } else {
            return (
                <div>
                    <Heading />
                    {/* TODO - Syntax Highlighting */}
                    <select onChange={this.onLanguageChange} value={this.state.language}>
                        <option htmlFor="language">C</option>
                        <option htmlFor="language">CPP</option>
                        <option htmlFor="language">PYTHON3</option>
                        <option htmlFor="language">JAVA</option>
                        <option htmlFor="language">JAVASCRIPT_NODE</option>
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
                            <button className="buttonStyle" onClick={this.handleNav}>Snap Another Code!</button>
                        </Grid>
                    </Grid>
                </div>
            );
        }
    }
}

export default codeIDE;