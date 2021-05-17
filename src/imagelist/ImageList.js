import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import GridView from '../reactsearchbar/GridView';


class ImageList extends Component {
    // Declaring state
    state = {
        images: [],
        error: false,
        searchString: '',
        serchItem: "",
    }

    componentDidMount() {
        this.getImages(this.state.serchItem);

    }
    // Getting data using the api
    async getImages(image) {
        try {
            const { data } = await axios.get("https://api.unsplash.com/search/photos?page=1&query=" + image + "&client_id=zk8fqRV854hxRcSCYVHcKb0rywVnyBbfJ-_EtDQQEwU");
            // console.log(data.results[0].urls.small);
            this.setState({
                images: data.results,
            });
        } catch (e) {
            this.setState({ error: true })  // Throwing custom error
            console.log(e.message);
        }
    }

    globalSearch = (event) => {
        event.preventDefault();
        console.log(this.state.serchItem)
        this.getImages(this.state.serchItem)
    }
    myChangeHandler = (event) => {
        this.setState({ serchItem: event.target.value });
    }

    render() {
        const { images } = this.state;
        return (
            <div>
                {this.state.images ? (
                    <div style={{ overflow: "hidden" }}>
                        <form onSubmit={this.globalSearch}>
                            <TextField
                                style={{
                                    marginTop: "2em",
                                    marginLeft: "2em",
                                }}
                                label="Search Image"
                                margin="normal"
                                variant="outlined"
                                size="small"
                                onChange={this.myChangeHandler} />
                        </form>
                        <div>
                            <Grid container spacing={0}>
                                {images.map(imageitems => (
                                    <Grid item xs={12} sm={4} lg={2} xl={2} key={imageitems.id}>
                                        <GridView
                                            urls={imageitems.urls.regular} alt_description={imageitems.alt_description}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </div>
                ) : "No contact found!"}
            </div>
        );
    }
}

export default ImageList;