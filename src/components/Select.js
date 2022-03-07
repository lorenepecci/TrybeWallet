import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionSelectData, fetchAPI } from '../actions';

class Select extends React.Component {
  constructor() {
    super();
    this.state = {
      
      
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
    const { method, currency, tag } = this.state;
    const { actionExpenses } = this.props;
    actionExpenses(method, currency, tag);
  }

  render() {
    const { listaPagamento, listaTag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  buscaAPI: () => dispatch(fetchAPI()),
  actionExpenses: (method, currency, tag) => (
    dispatch(actionSelectData(method, currency, tag))
  ),
});

Select.propTypes = {
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  actionExpenses: propTypes.func.isRequired,
  buscaAPI: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);
