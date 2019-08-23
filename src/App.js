import React from 'react';
import './style.css'

class App extends React.Component {
  state= {
    value: '',
    emails: [],
    error: null
  }

  handleChange= (event) => {
        this.setState ({
        value: event.target.value,
          error: null
        })
  }

  handleDelete = (toBeRemoved) => {
    this.setState({
      emails: this.state.emails.filter(email => email !== toBeRemoved)
    });
  };

   handleKeyDown= (event) => {
       if (['Enter', 'Tab', ','].includes(event.key)) {
      event.preventDefault();

      var email = this.state.value.trim();

      if (email && this.isValid(email)) {
        this.setState({
          emails: [...this.state.emails, email],
          value: ''
        });
        // console.log(email)
       }
     }
   };

  isValid(email) {
    var error = null;

    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (error) {
      this.setState({ error });

      return false;
    }

    return true;
  }


  isInList(email) {
    return this.state.items.includes(email);
  }

  isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }


  handlePaste = (event) => {
    event.preventDefault();

    var paste = event.clipboardData.getData('text');
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter(email => !this.isInList(email));

      this.setState({
        emails: [...this.state.emails, ...toBeAdded]
      });
    }
  };

  render() {
    return (
      <main className={'wrapper'}>
          <React.Fragment>
            {this.state.emails.map(email =>
              <div className='tag-item' key={email}>{email}
                <button
                  type="button"
                  className={'button'}
                  onClick={() =>  this.handleDelete(email)}>
                  &times;
                </button>
              </div>
            )}

            <input
              className={'input' + (this.state.error && 'has-error')}
              placeholder="Email Address"
              value={this.state.value}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              onPaste={this.handlePaste}
            />
            {this.state.error &&
            <p className="error">{this.state.error}</p>}
          </React.Fragment>
       </main>
    );
  }
}

export default App