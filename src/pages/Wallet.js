import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const totalField = 0;
    const { email } = this.props;
    console.log(email);
    return (
      <div>
        TrybeWallet
        <header>
          <p data-testid="email-field">
            { `Email: ${email} `}
          </p>
          <p data-testid="total-field">
            { `Despesa Total: RS:${totalField}` }
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>
        <form>
          <label>
            <input />
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: propTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
