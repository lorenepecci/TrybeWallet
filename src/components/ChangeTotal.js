import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionChangeTotal } from '../actions';

class ChangeTotal extends React.Component {
  counter = (item, changeTotal) => {
    const {
      objAPI,
      currencies,
    } = this.props;

    // ['USD', 'EUR']
    // ['5.15','5.57']
    const listASK = Object.values(objAPI);// lista de objetos
    const listASKs = listASK.map((i) => Number(i.ask)); // lista de asks
    const listRespostaAsk = [];
    currencies.forEach((name, index) => {
      if (name === item.codeIn) {
        listRespostaAsk.push(listASKs[index]);
      }
    });
    const resp = item.exchangeRates[`${item.currency}`]
      .ask * item.value * (1 / listRespostaAsk[0]);
    changeTotal(resp);
    return resp;
  }

  render() {
    const { expenses, changeTotal } = this.props;
    return (
      <div>

        { expenses.map((item) => (

          <div key={ item.id }>

            { () => this.counter(item, changeTotal) }

          </div>
        )) }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  objAPI: state.wallet.objAPI,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  changeTotal: (add) => dispatch(actionChangeTotal(add)),
});

ChangeTotal.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  objAPI: propTypes.objectOf(propTypes.object).isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  changeTotal: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeTotal);
