import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class WriteWallet extends React.Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
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
                    { item.exchangeRates[`${item.currency}`].ask * item.value }
                  </td>
                  <td>
                    { item.exchangeRates[`${item.currency}`].name.split('/')[1] }
                  </td>
                </tr>
              )) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

WriteWallet.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(WriteWallet);
