import React from 'react';
import '../App.css';

function SignIn() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sign In</h1>
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <button className="App-button" type="submit">Sign In</button>
        </form>
      </header>
    </div>
  );
}

export default SignIn;