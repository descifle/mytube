import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './createaccount.css';
import '../sb.css';
import '../../assets/backdrop.jpg';

class CreateAccount extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  }
    

    handleSubmit = (e) => {
      e.preventDefault()

      const user = {
        username: this.state.email,
        password: this.state.password
      }

      axios.post('http://localhost:5000/users/add', user)
      .then((res) => {console.log(res.data)})
      .catch((err) => {console.log(err.response)})

      window.location = '/login'
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
      const {email, password} = this.state
      const emailRegex = new RegExp(/^\S+@\S+\.\S+$/)

      return email.length > 0 && password.length > 0 && emailRegex.test(email);
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
                    <div className="col-lg-6 d-none d-lg-block bg-login-image_create"></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">Create A New Acccount</h1>
                          <p className="text-muted my-4">Join us!</p>
                        </div>
                        <form onSubmit={this.handleSubmit} className="user">
                          <div className="form-group">
                            <input
                            autoFocus 
                            type="email" 
                            className="form-control form-control-user" 
                            name="email" 
                            aria-describedby="email address" 
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
                            Create Account
                          </button>
                          <Link to="/" className="btn btn-block">Continue without logging in</Link>
                          <hr/>
                        </form>
                        <hr/>
                        <div className="text-center">
                          {/* <Link className="small">Forgot Password?</Link> */}
                        </div>
                        <div className="text-center">
                          <Link className="small" to="/login">Already have an Account | Login</Link>
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

export default CreateAccount;