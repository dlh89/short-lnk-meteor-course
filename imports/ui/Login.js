import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }
  onSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    Meteor.loginWithPassword({ email }, password, (err) => {
      this.setState({ error: 'Unable to login. Check email and password.' });
    });
  }
  componentWillMount() {
    /*
        redirect to links if logged in
        react router 4 alternative to onEnter
        */
    if (Meteor.userId()) {
      this.props.history.replace('/links');
    }
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk Login</h1>

          {this.state.error && <p>{this.state.error}</p>}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Login</button>
          </form>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    );
  }
}
