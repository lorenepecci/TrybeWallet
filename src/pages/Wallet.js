import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionEditData, actionWalletData, fetchAPI } from '../actions';
import Header from '../components/Header';
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
      btnTitle: 'Adicionar despesa',
      isEdit: false,
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

  onClick = () => {
    const { isEdit } = this.state;
    if (isEdit) {
      this.onClickEdit();
    } else {
      this.addExpense();
    }
  }

  btnEdit = (obj) => {
    this.setState(() => ({
      value: obj.value,
      description: obj.description,
      currency: obj.currency,
      method: obj.method,
      tag: obj.tag,
      btnTitle: 'Editar despesa',
      exchangeRates: obj.exchangeRates,
      isEdit: true,
      id: obj.id,
    }));
  }

  onClickEdit = () => {
    const { actionEdit } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
      id,
    } = this.state;
    const objDoEdit = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    actionEdit(objDoEdit, id);
    this.setState(() => (
      { value: '', description: '', btnTitle: 'Adicionar despesa', isEdit: false }
    ));
  }

  funcoesActionExpense = () => {
    const { value, description, method, currency, tag } = this.state;
    const { actionExpenses } = this.props;
    const objExpenses = {
      value, description, method, currency, tag,
    };
    this.setState({
      ...objExpenses,
      description: '',
      value: 0,
    });
    actionExpenses(objExpenses);
  }

  addExpense = () => {
   /*  const { buscaAPI } = this.props;
    buscaAPI(); */
    this.funcoesActionExpense();
  }

  render() {
    const { currencies } = this.props;
    const { value,
      description,
      listaPagamento,
      btnTitle,
      listaTag, currency } = this.state;

    return (
      <div>
        <Header />
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
            {btnTitle}
          </button>
        </form>
        <div>
          <WriteWallet edit={ this.btnEdit } />
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
  buscaAPI: propTypes.func.isRequired,
  actionEdit: propTypes.func.isRequired,
  actionExpenses: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
