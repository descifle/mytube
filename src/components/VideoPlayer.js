import React from 'react';
import './videoplayer.scss';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import axios from 'axios';

const KEY = 'AIzaSyAfEaZF62jt_nxrzVhl40SASJPfLLURpS4';
// const KEY = 'AIzaSyAfEaZF62jt_nxrzVhl40SASJPdisabled';

class VideoPlayer extends React.Component {
    state = {savedVideos: [], videos: [], selectedVideo: null, loggedIn: false, user: ''}

    componentDidMount() {
        // this.onTermSubmit('building')
        this.validateLogin()
        this.setState({ user: JSON.parse(localStorage.getItem('trueUID'))})
        setTimeout(() => {
            this.getSavedVideos()
        }, 1000) 

        console.log('mounted')
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
    }

    getSavedVideos = () => {
        const {user, loggedIn} = this.state

        if(loggedIn) {
            axios.get('http://localhost:5000/users/get-videos', {
            params: {id: user}
            }).then((res) => {
                this.setState({ savedVideos: res.data.videos})
            }).catch(err => console.log(err))
        } else {
            console.log('user not logged in')
        }   
    }

    saveVideo = (video) => {

        const sameVideo = this.state.savedVideos.find((videos) => {
            return videos.etag === video.etag
        })

        const {user} = this.state

        if(sameVideo) {
            console.log('already saved')
        } else {
            axios.post('http://localhost:5000/users/save-video', {
            params: { id: user, videos: video}
            })
            .then((res) => {
                this.setState({savedVideos: res.data.videos})
            }).catch((err) => {console.log(err)})
        }

        this.setState(this.state)

        
    }

    removeVideo = (video) => {

        const {user} = this.state
        const videoID = video.etag

        const data = {
            user: user,
            videoId: videoID 
        }
        
        axios.post('http://localhost:5000/users/delete-video', data).then((msg) => {
            console.log(msg.data)
        }).catch(err => console.log(err))
        setTimeout(() => {
            this.getSavedVideos()
        }, 1000)
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
                                <div className="col-lg-12">
                                    <VideoList removeVideo={this.removeVideo} status={"saved-video"} onVideoSelect={this.onVideoSelect} videos={this.state.savedVideos} />
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