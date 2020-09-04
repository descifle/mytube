import React from 'react';
import './videoplayer.scss';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import axios from 'axios';
// import SavedVideoItem from './SavedVideoItem';

const KEY = 'AIzaSyAfEaZF62jt_nxrzVhl40SASJPfLLURpS4';
// const KEY = 'AIzaSyAfEaZF62jt_nxrzVhl40SASJPdisabled';

class VideoPlayer extends React.Component {
    state = {savedVideos: [], videos: [], selectedVideo: null, loggedIn: false, user: ''}

    componentDidMount() {
        this.onTermSubmit('building')
        this.validateLogin()
        this.setState({ user: JSON.parse(localStorage.getItem('trueUID'))})
        setTimeout(() => {
            this.getSavedVideo()
        }, 1000) 
    }

    componentDidUpdate() {
        console.log(this.state.savedVideos)
        console.log(this.state.user)
        
    }

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

        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0]})
        console.log(response.data.items)
    }

    getSavedVideo = () => {
        const {user} = this.state

        axios.get('http://localhost:5000/users/get-videos', {
            params: {id: user}
        }).then((res) => {
            // console.log(res.data.videos)
            this.setState({ savedVideos: res.data.videos})
        }).catch(err => console.log(err))
    }

    saveVideo = (video) => {

        const {user} = this.state

        axios.post('http://localhost:5000/users/save-video', {
            params: { id: user, videos: video}
        })
        .then((res) => {
            this.setState({savedVideos: res.data.videos})
        }).catch((err) => {console.log(err)})
    }

    validateLogin = () => {
        if(localStorage.getItem('username') !== "" && localStorage.getItem('username') !== null) {
            this.setState({loggedIn: true})
        }
    }
    
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                    <SearchBar onFormSubmit={this.onTermSubmit} />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-8 py-3">
                                    <VideoDetail video={this.state.selectedVideo} saveVideo={this.saveVideo} />
                                </div>
                                <div className="col-lg-4">
                                    <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
                                </div>
                                <div className="col-lg-12 px-4">
                                    <VideoList status={"saved-video"} onVideoSelect={this.onVideoSelect} videos={this.state.savedVideos} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VideoPlayer;