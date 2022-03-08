import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionWalletData, fetchAPI } from '../actions';
import WriteWallet from '../components/WriteWallet';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      listaPagamento: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      listaTag: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      value: 0,
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: 'Alimentação',
      codeIn: 'BRL',
    };
  }

  componentDidMount() {
    const { buscaAPI } = this.props;
    buscaAPI();
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    });
  }

  onInputChangeBRL = ({ target }) => {
    this.setState({
      codeIn: target.value,
    });
  }

  funcoesActionExpense = () => {
    const { value, description, method, currency, tag, codeIn } = this.state;
    const { actionExpenses } = this.props;
    const objExpenses = {
      value, description, method, currency, tag,
    };
    actionExpenses(objExpenses);
  }

  onClick = () => {
    const { buscaAPI } = this.props;
    buscaAPI();
    this.funcoesActionExpense();
    this.setState({
      description: '',
      value: 0,
    });
  }

  render() {
    const { email, currencies, expenses, totalField} = this.props;
    const { value,
      codeIn,
      description,
      listaPagamento,
      listaTag } = this.state;
    return (
      <div>
        <header className="wallet-header">
          <p data-testid="email-field">
            { `Email: ${email} `}
          </p>
          <p data-testid="total-field">
            { `Despesa Total: R$ ${totalField}` }
          </p>

          <div data-testid="header-currency-field">
            <label htmlFor="currencymine">
              Moeda:
              <select name="select" id="currencymine" onChange={ this.onInputChangeBRL }>
                { currencies.map((item, index) => (
                  <option
                    data-testid={ `${item}` }
                    key={ index }
                    value={ item }
                  >
                    { item }
                  </option>
                ))}
              </select>
            </label>
          </div>

        </header>

        <form className="wallet-form">
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              id="value"
              value={ value }
              onChange={ this.onInputChange }
            />
          </label>
          {/* SELECT */ }
          <div data-testid="currency-input">
            <label htmlFor="currency">
              Moeda:
              <select name="select" id="currency" onChange={ this.onInputChange }>
                { currencies.map((item, index) => (
                  <option key={ index } value={ item }>{item}</option>
                ))}
              </select>
            </label>
          </div>
          <div data-testid="method-input">
            <label htmlFor="method">
              Método Pagamento:
              <select name="select" id="method" onChange={ this.onInputChange }>
                { listaPagamento.map((item, index) => (
                  <option key={ index } value={ item }>{item}</option>
                ))}
              </select>
            </label>
          </div>
          <div data-testid="tag-input">
            <label htmlFor="tag">
              Tag:
              <select name="select" id="tag" onChange={ this.onInputChange }>
                { listaTag.map((item, index) => (
                  <option key={ index } value={ item }>{item}</option>
                ))}
              </select>
            </label>
          </div>
          {/* SELECT ACABA */}
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              id="description"
              value={ description }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.onClick }
          >
            Adicionar despesa
          </button>
        </form>
        <div>
          { (expenses) ? <WriteWallet codeIn={ codeIn } /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  totalField: state.wallet.totalValue,
});

const mapDispatchToProps = (dispatch) => ({
  buscaAPI: () => dispatch(fetchAPI()),
  actionExpenses: (obj) => dispatch(actionWalletData(obj)),
});

Wallet.propTypes = {
  email: propTypes.string.isRequired,
  buscaAPI: propTypes.func.isRequired,
  actionExpenses: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
