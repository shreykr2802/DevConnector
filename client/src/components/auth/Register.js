import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alert';
import { register } from '../../store/actions/auth';

import propTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChangeHandler = event => setFormData({ ...formData, [event.target.name]: event.target.value });
    const onSubmitHandler = async event => {
        event.preventDefault();
        if (password !== password2) {
            setAlert('Password do not match', 'danger');
        } else {
            // const newUser ={
            //     name,
            //     email,
            //     password
            // }

            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }

            //     const body = JSON.stringify(newUser);
            //     const res = await axios.post('/api/users', body, config);
            //     console.log(res.data);
            // } catch (error) {
            //     console.error(error.response.data);
            // }
            register({ name, email, password });
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={event => onSubmitHandler(event)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        required
                        value={name}
                        onChange={event => onChangeHandler(event)} />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={event => onChangeHandler(event)}
                        required />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        required
                        onChange={event => onChangeHandler(event)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        value={password2}
                        required
                        onChange={event => onChangeHandler(event)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: propTypes.func.isRequired,
    register: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);