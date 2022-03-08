import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionEditData, actionWalletData, fetchAPI } from '../actions';
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
      tag: 'Lazer',
      objexpenses: {},
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

  onClickEdit = (obj) => {
    const { actionEdit, actionExpenses, objAPI } = this.props;
    const { objexpenses } = this.state;

    const objDoEdit = {
      id: obj.id,
      objexpenses,
      exchangeRates: objAPI,
    };
    console.log(obj);
    actionExpenses(objDoEdit);
    actionEdit(objDoEdit, obj.id);
  }

  funcoesActionExpense = () => {
    const { value, description, method, currency, tag } = this.state;
    const { actionExpenses } = this.props;
    const objExpenses = {
      value, description, method, currency, tag,
    };

    this.setState({
      objexpenses: objExpenses,
    });
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
    const { email, currencies, expenses } = this.props;
    const { value,
      description,
      listaPagamento,
      listaTag, currency } = this.state;

    const total = expenses.reduce((acc, item) => (
      acc + (item.value * item.exchangeRates[item.currency].ask)
    ), 0);
    return (
      <div>
        <header className="wallet-header">
          <p data-testid="email-field">
            { `Email: ${email} `}
          </p>
          <p data-testid="total-field">
            {`Despesa Total: R$ ${total}` }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>

        <form className="wallet-form">
          <div>
            <label htmlFor="value">
              Valor:
              <input
                data-testid="value-input"
                type="number"
                id="value"
                value={ value }
                onChange={ this.onInputChange }
              />
            </label>
          </div>

          <div>
            <label htmlFor="currency">
              Moeda:
              <select
                data-testid="currency-input"
                name="select"
                id="currency"
                value={ currency }
                onChange={ this.onInputChange }
              >
                { currencies.map((item, index) => (
                  <option key={ index } value={ item }>{item}</option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="method">
              Método Pagamento:
              <select
                data-testid="method-input"
                name="select"
                id="method"
                onChange={ this.onInputChange }
              >
                { listaPagamento.map((item, index) => (
                  <option key={ index } value={ item }>{item}</option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="tag">
              Tag:
              <select
                data-testid="tag-input"
                name="select"
                id="tag"
                onChange={ this.onInputChange }
              >
                { listaTag.map((item, index) => (
                  <option key={ index } value={ item }>{item}</option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label htmlFor="description">
              Descrição:
              <input
                data-testid="description-input"
                type="text"
                id="description"
                value={ description }
                onChange={ this.onInputChange }
              />
            </label>
          </div>
          <button
            type="button"
            onClick={ this.onClick }
          >
            Adicionar despesa
          </button>
        </form>
        <div>
          { (expenses) ? <WriteWallet edit={ this.onClickEdit } /> : null }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  objAPI: state.wallet.objAPI,
});

const mapDispatchToProps = (dispatch) => ({
  buscaAPI: () => dispatch(fetchAPI()),
  actionExpenses: (obj) => dispatch(actionWalletData(obj)),
  actionEdit: (obj, id) => dispatch(actionEditData(obj, id)),
});

Wallet.propTypes = {
  email: propTypes.string.isRequired,
  buscaAPI: propTypes.func.isRequired,
  actionEdit: propTypes.func.isRequired,
  actionExpenses: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  objAPI: propTypes.objectOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
