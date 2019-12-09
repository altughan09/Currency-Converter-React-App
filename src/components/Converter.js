import React, { Component } from 'react';

class Converter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: [
                'USD',
                'JPY',
                'BGN',
                'CZK',
                'DKK',
                'GBP',
                'HUF',
                'PLN',
                'RON',
                'SEK',
                'CHF',
                'ISK',
                'NOK',
                'HRK',
                'TRY',
                'AUD',
                'BRL',
                'CAD',
                'CNY',
                'HKD',
                'IDR',
                'ILS',
                'INR',
                'KRW',
                'MXN',
                'MYR',
                'NZD',
                'PHP',
                'SGD',
                'THB',
                'ZAR'
            ],
            base: 'USD',
            amount: '',
            convertTo: 'EUR',
            result: '',
            date: ''
        };
    }

    handleSelect = e => {
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            this.calculate
        );
    };

    handleInput = e => {
        this.setState(
            {
                amount: e.target.value
            },
            this.calculate
        );
    };

    calculate = () => {
        const amount = this.state.amount;
        if (amount === isNaN) {
            return;
        } else {
            fetch(
                `https://api.exchangeratesapi.io/latest?base=${this.state.base}`
            )
                .then(res => res.json())
                .then(data => {
                    const date = data.date;
                    const result = (
                        data.rates[this.state.convertTo] * amount
                    ).toFixed(4);
                    this.setState({ result, date });
                })
                .catch(err => console.log(err));
        }
    };

    handleSwap = e => {
        const base = this.state.base;
        const convertTo = this.state.convertTo;
        e.preventDefault();
        this.setState(
            {
                convertTo: base,
                base: convertTo,
                result: null
            },
            this.calculate
        );
    };

    render() {
        const {
            currencies,
            base,
            amount,
            convertTo,
            result,
            date
        } = this.state;
        return (
            <div className='col col-sm-12 col-md-12 col-lg-8 offset-lg-2'>
                <div className='card card-body bg-primary text-white'>
                    <h4>
                        {amount} {base} is equivalent to
                    </h4>
                    <h2>
                        {amount === ''
                            ? '0'
                            : result === null
                            ? 'Calculating...'
                            : result}{' '}
                        {convertTo}
                    </h2>
                    <p>As of {date}</p>
                    <form className='form-inline mb-4'>
                        <div className='row'>
                            <div className='col'>
                                <input
                                    type='number'
                                    value={amount}
                                    name='amount'
                                    onChange={this.handleInput}
                                    className='form-control form-control-lg mx-3'
                                />
                            </div>
                            <div className='col'>
                                <select
                                    className='form-control form-control-lg'
                                    name='base'
                                    value={base}
                                    onChange={this.handleSelect}
                                >
                                    {currencies.map(currency => (
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                    <form className='form-inline mb-4' autoComplete='off'>
                        <div className='row'>
                            <div className='col'>
                                <input
                                    disabled={true}
                                    value={
                                        amount === ''
                                            ? '0'
                                            : result === null
                                            ? 'Calculating...'
                                            : result
                                    }
                                    className='form-control form-control-lg mx-3'
                                />
                            </div>
                            <div className='col'>
                                <select
                                    className='form-control form-control-lg'
                                    name='convertTo'
                                    value={convertTo}
                                    onChange={this.handleSelect}
                                >
                                    {currencies.map(currency => (
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className='col-sm-2 col-md-2 col-lg-2'>
                        <h1 onClick={this.handleSwap} className='swap'>
                            &#8595;&#8593;
                        </h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Converter;
