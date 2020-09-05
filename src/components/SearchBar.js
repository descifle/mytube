import React from 'react';
import logo from '../assets/logo.png';
import './searchbar.scss';
import {Link} from 'react-router-dom';
import 'animate.css';

class SearchBar extends React.Component {
    state = {term: '', showModal: false}

    onInputChange = (e) => {
        this.setState({ term: e.target.value})
    }

    onFormSubmit = (e) => {
        e.preventDefault()

        this.props.onFormSubmit(this.state.term)
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal})
    }

    logMeOut() {
        localStorage.removeItem('trueUID')
        localStorage.removeItem('username')
        this.toggleModal()
    }

    renderUser() {
        if(localStorage.getItem('username') !== null && localStorage.getItem('username') !== "") {
        return <span onClick={() => {if(localStorage.getItem('username') !== null && localStorage.getItem('username') !== "") this.toggleModal()}} className="btn btn-light">{localStorage.getItem('username').slice(1, -1)}</span>
        } else {
            return <Link className="btn btn-light" to="/login">Login Now</Link>
        }
    }
 
    render() {
        return (

            <div className="head">
                <div className="d-flex">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <h1>Video Player</h1>
                    <div className="user-auth">
                        <Link className="btn btn-account" to="/create">Create Account</Link>
                        {this.renderUser()}
                    </div>
                    <div className={this.state.showModal ? "modal animate__animated animate__fadeIn show d-block" : "modal"} id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">Log Out?</h5>
                            <button onClick={() => {this.toggleModal()}} className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            </div>
                            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div className="modal-footer">
                            <button onClick={() => {this.toggleModal()}} className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button onClick={() => {this.logMeOut()}} className="btn btn-primary">Logout</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={this.onFormSubmit} className=""> 
                    <div className="field">
                        <label className="font-weight-bold">Search Video</label>
                        <input 
                        autoFocus
                        className="form-control mr-sm-2"
                        type="text"
                        value={this.state.term}
                        onChange={this.onInputChange} 
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar;