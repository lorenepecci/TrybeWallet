import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionChangeTotal, actionDelete } from '../actions';

class WriteWallet extends React.Component {
  counter = (item) => {
    const {
      codeIn,
      objAPI,
      currencies } = this.props;
    const listASK = Object.values(objAPI);
    const listASKs = listASK.map((item) => Number(item.ask));
    const listRespostaAsk = [];
    currencies.forEach((name, index) => {
      if (name === codeIn) {
        listRespostaAsk.push(listASKs[index]);
      }
    });
    return item.exchangeRates[`${item.currency}`]
      .ask * item.value * (1 / listRespostaAsk[0]);
  }

  render() {
    const { expenses, actionDeletee, changeTotal } = this.props;
    // pegando as ask e colocando em um array
    // codeIn é o nome da moeda q eu quero
    // item.currency é oq eu tenho
    // o ask é a proporção ( em reais) de ambos.
    // O ASKitem.currency/ASKcodeIN  é o fator divisao
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de Conversão</th>
            </tr>
          </thead>
          <tbody>
            { expenses.filter((item) => item.id >= 0)
              .map((item) => (

                <tr key={ item.id }>
                  <td>{ item.description }</td>
                  <td>{ item.tag }</td>
                  <td>
                    { item.method}
                  </td>
                  <td>{ item.value}</td>
                  <td>{ item.currency}</td>
                  <td>
                    { item.exchangeRates[`${item.currency}`].name.split('/')[0] }
                  </td>
                  <td>
                    { this.counter(item) }
                  </td>
                  <td>
                    { item.exchangeRates[`${item.currency}`].name.split('/')[1] }
                  </td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => actionDeletee(item.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
                /* {changeTotal(this.counter(item))}; */
              )) }
          </tbody>
        </table>
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
  actionDeletee: (itemID) => dispatch(actionDelete(itemID)),
  changeTotal: (add) => dispatch(actionChangeTotal(add)),
});

WriteWallet.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  codeIn: propTypes.string.isRequired,
  actionDeletee: propTypes.func.isRequired,
  changeTotal: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteWallet);
