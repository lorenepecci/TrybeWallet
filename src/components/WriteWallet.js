import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionDelete } from '../actions';

class WriteWallet extends React.Component {
  /* counter = (item) => {
    const {
      objAPI,
      currencies } = this.props;

      const objConversionCurrency = {
        [currencies] : [listASKs]
      }

    // ['USD', 'EUR']
    // ['5.15','5.57']
    const listASK = Object.values(objAPI);
    const listASKs = listASK.map((i) => Number(i.ask));
    const listRespostaAsk = [];
    currencies.forEach((name, index) => {
      if (name === item.codeIn) {
        listRespostaAsk.push(listASKs[index]);
      }
    });
    const resp = item.exchangeRates[`${item.currency}`]
      .ask * item.value * (1 / listRespostaAsk[0]);
    return resp;
  } */

  render() {
    const { expenses, actionDeletee, edit } = this.props;
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
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((item) => (

              <tr key={ item.id }>
                <td>{ item.description }</td>
                <td>{ item.tag }</td>
                <td>
                  { item.method}
                </td>
                <td>{ parseFloat(item.value).toFixed(2)}</td>
                <td>
                  { item.exchangeRates[`${item.currency}`].name.split('/')[0] }
                </td>
                <td>
                  { (Math.round(item.exchangeRates[`${item.currency}`].ask * 100) / 100).toFixed(2)}
                </td>
                <td>
                  { (item.exchangeRates[`${item.currency}`].ask * item.value).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => edit(item) }
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => actionDeletee(item.id) }
                  >
                    Excluir
                  </button>

                </td>
              </tr>
            )) }
          </tbody>
        </table>
        {/* < Counter /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  actionDeletee: (itemID) => dispatch(actionDelete(itemID)),
});

WriteWallet.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  actionDeletee: propTypes.func.isRequired,
  edit: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteWallet);
