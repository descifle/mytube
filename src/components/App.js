import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const KEY = 'AIzaSyAfEaZF62jt_nxrzVhl40SASJPfLLURpS4';


class App extends React.Component {
    state = {videos: [], selectedVideo: null}

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video})
    }

    onTermSubmit = async (term) => {
        const response = await youtube.get('/search', {
            params: {
                q: term,
                part: 'snippet',
                type: 'video',
                maxResults: '5',
                key: KEY
            }
        })

        this.setState({ videos: response.data.items, selectedVideo: null})
    }
    
    render() {
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
            </div>
        )
    }
}

export default App;