import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { expenses, email } = this.props;
    const total = expenses.reduce((acc, item) => (
      acc + (item.value * item.exchangeRates[item.currency].ask)
    ), 0);
    return (
      <header className="wallet-header">
        <p data-testid="email-field">{ `Email: ${email} `}</p>
        <p data-testid="total-field">{`Despesa Total: R$ ${total}` }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
