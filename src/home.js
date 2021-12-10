import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

const Currency = (props) => {
  const {
    Amount,
    Base,
    Date,
    Rates,

  } = props.currency;

  return (
    <div className="row">
      <div className="col-4 col-md-2 col-lg-1 mb-3">
        <h4>{Amount}</h4>
        <h4>{Base}</h4>
        <h4>{Date}</h4>
      </div>
      <div className="col-8 col-md-10 col-lg-11 mb-3">
      </div>
    </div>
  )
}

class CurrencyFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { searchTerm } = this.state;
    searchTerm = searchTerm.trim();
    if (!searchTerm) {
      return;
    }




    fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${searchTerm}`).then((response) => {
        if (response.ok) {
    // .ok returns true if response status is 200-299
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then((data) => {
      console.log('json data', data);
  // do what you need to do with the data returned
  }).catch((error) => {
    console.log(error);
    // deal with the error
  })
}

  render() {
    const { searchTerm, results, error } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.handleSubmit} className="form-inline my-4">
              <input
                type="text"
                className="form-control mr-sm-2"
                placeholder="Currency"
                value={searchTerm}
                onChange={this.handleChange}
              />
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {(() => {
              if (error) {
                return error;
              }
              return results.map((currency) => {
                return <Currency key={currency.Base} currency={currency} />;
              })
            })()}
          </div>
        </div>
      </div>
    )
  }
}

export default CurrencyFinder;
