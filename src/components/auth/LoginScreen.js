import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './createaccount.css';
import '../sb.css';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    loginErrors: '',
    user: {}
  }

    // componentDidUpdate() {
    //   console.log(this.state.user)
    // }
    

    handleSubmit = (e) => {
      e.preventDefault()

      const user = {
        username: this.state.email,
        password: this.state.password
      }

      // if get request goes thru set cookie / session as logged in return user to videoplayer else allow login requests

      axios.get('http://localhost:5000/users/verify', {
        params: { "username" : user.username, "password" : user.password}
      })
      .then((res) => {
        console.log(res.data)
        if(res.data !== null) {
          this.setState({ user: res.data})
          localStorage.setItem('username', JSON.stringify(res.data.username))
          localStorage.setItem('trueUID', JSON.stringify(res.data._id))
          window.location = '/'
        }
      })
    }

    handleChange = (event) => {
      event.persist()
      this.setState({
        [event.target.name]: event.target.value
      })

      setTimeout(() => {
        const emailRegex = new RegExp(/^\S+@\S+\.\S+$/)

        if(event.target.name === "email" && !emailRegex.test(event.target.value)) {
          event.target.className = "form-control form-control-user invalid-form"
        } else {
          event.target.className = "form-control form-control-user"
        }
      }, 500)
    }

    validateForm =() => {
      return this.state.email.length > 0 && this.state.password.length > 0;
    }


    render() {
      return (
        <div className="container">
          <h1 className="w-100 text-center my-5">VideoSaver</h1>

          <div className="row justify-content-center">

            <div className="col-xl-10 col-lg-12 col-md-9">

              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                          <p className="text-muted my-4">you should be watching!</p>
                        </div>
                        <form onSubmit={this.handleSubmit} className="user">
                          <div className="form-group">
                            <input
                            autoFocus 
                            type="email" 
                            className="form-control form-control-user" 
                            name="email" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter Email Address..." 
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                            />
                          </div>
                          <div className="form-group">
                            <input 
                            type="password" 
                            className="form-control form-control-user" 
                            name="password" 
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                            />
                          </div>
                          <button disabled={!this.validateForm()} className="btn btn-primary btn-user btn-block">
                            Login
                          </button>
                          <Link to="/" className="btn btn-block">Continue without logging in</Link>
                          <hr/>
                        </form>
                        <hr/>
                        <div className="text-center">
                          {/* <Link className="small">Forgot Password?</Link> */}
                        </div>
                        <div className="text-center">
                          <Link to="/create" className="small">Create an Account!</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )
    }
}

export default LoginScreen;