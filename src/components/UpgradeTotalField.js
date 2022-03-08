import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// import { actionChangeTotal } from '../actions';

class UpgradeTotalField extends React.Component {
  onClick = () => {
    const { itemID, expenses } = this.props;
    const finded = expenses.find((obj) => obj.id === itemID);
    console.log(finded);
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={ this.onClick }
        >
          Editar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

UpgradeTotalField.propTypes = {
  itemID: propTypes.number.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,

};

export default connect(mapStateToProps, null)(UpgradeTotalField);
