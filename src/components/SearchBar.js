import React from 'react';
import logo from '../assets/logo.png';
import './searchbar.scss';
import {Link} from 'react-router-dom';

class SearchBar extends React.Component {
    state = {term: ''}

    onInputChange = (e) => {
        this.setState({ term: e.target.value})
    }

    onFormSubmit = (e) => {
        e.preventDefault()

        // Make callback from parent component
        this.props.onFormSubmit(this.state.term)
    }

    renderUser() {
        if(localStorage.getItem('username') !== null && localStorage.getItem('username') !== "") {
            return localStorage.getItem('username').slice(1, -1)
        } else {
            return <Link to="/login">Login Now</Link>
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
                        <span className="btn">{this.renderUser()}</span>
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