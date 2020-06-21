//@ts-nocheck
import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Heading from '../components/heading';
import CodeIDE from './codeIDE';

import '../assets/addCodePage.css';
import FileImage from '../assets/images/file-image-regular.svg';

class addCodePage extends Component {

    state = {
        uploaded: false,
        selectedFile: null,
        imgSrc: null,
        imgEntered: false,
        code: undefined,
        redirect: false,
    };

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            uploaded: true
        });
        this.fileDisplay(event.target.files[0]);
    };

    fileDisplay = (file) => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                imgSrc: [
                    reader.result
                ],
                imgEntered: true
            });
            console.log(url);
        };

    };

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile);
        axios.post('https://bytewarriors-snapcode.herokuapp.com/upload-image', fd)
            .then(async res => {
                if (res.status === 200) {
                    console.log(res.data.OCRtext);
                    console.log("Code received");
                    await this.setState({
                        code: res.data.OCRtext,
                        redirect: true
                    });
                }
            })
            .catch(err => {
                alert(err);
            });
    };

    handleUrl = (event) => {
        this.setState({
            imgSrc: event.target.value
        });
    };

    handleURLSubmit = () => {
        this.setState({
            uploaded: true
        });
    };

    render() {
        if (this.state.redirect) {
            return <CodeIDE code={this.state.code} />;
        } else {
            return (
                <div>
                    <Heading />
                    <Grid container>
                        <Grid item xs>Drop an image or click to browse</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs>
                            <input type="file" name="file" id="file" className="inputfile" onChange={this.fileSelectedHandler} />
                            {this.state.uploaded ? <img className="imageSelected" src={this.state.imgSrc} alt="selectedImage" /> : <label htmlFor="file"><img src={FileImage} alt="fileimage"></img></label>}

                            {this.state.uploaded ?
                                <>
                                {this.state.imgEntered ? <p className="displayImgName"> {this.state.selectedFile.name} </p> : null}
                                    <button className="buttonStyle">Crop Image</button>
                                    <button className="buttonStyle" onClick={this.fileUploadHandler}>Upload</button>
                                
                                </>
                                :
                                null
                            }
                        </Grid>
                    </Grid>
                </div>
            );
        }
    }
}

export default addCodePage; 