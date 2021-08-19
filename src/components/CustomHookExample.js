import { useState, Fragment } from 'react';
import React from 'react';
import Button from './Button';
import useDataApi from '../customHooks/useDataApi';
import { Link } from 'react-router-dom'

import { CurrencyProvider, useCurrency, CURRENCIES } from '../context/contextCurrency';


const CustomHookExample = () => {

    // example of useContext 
    const DATA = [
        {
          id: '1',
          title: 'The Road to React',
          price: 19.99,
        },
        {
          id: '2',
          title: 'The Road to GraphQL',
          price: 29.99,
        },
      ];

    const [currency, setCurrency] = React.useState(CURRENCIES.Euro);



    const [query, setQuery] = useState('redux597')
    const [{ data, isLoading, isError }, doFetch] = useDataApi('https://hn.algolia.com/api/v1/search?query=redux', { hits: [] })

    let htmlContent = ''
    if (isLoading) {
        htmlContent = <div>Loading data... Please wait</div>
    }
    else if (isError && !isLoading) {
        htmlContent = <div style={{ color: 'red' }}>Something went wrong. Please try again latter.</div>
    } else {
        htmlContent = <ul>
            {data.hits.map(item => (
                <li key={item.objectID}>
                    <a href={item.url}>{item.title}</a>
                </li>
            ))}
        </ul>
    }

    return (
        <Fragment>
            <Link to='/'>GO BACK</Link>
            <br/><br/>
            <CurrencyProvider>
                <CurrencyButtons />

                <Books list={DATA} />
            </CurrencyProvider>
            <br/>
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`)
                }}>
                <input
                    type='text'
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <Button text={'Search'} onClick={() => doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`)} />
            </form>
            {htmlContent}
        </Fragment>
    )
};

const CurrencyButtons = () => {
    const { onChange } = useCurrency();
   
    return Object.values(CURRENCIES).map((item) => (
      <CurrencyButton key={item.label} onClick={() => onChange(item)}>
        {item.label}
      </CurrencyButton>
    ));
  };

const CurrencyButton = ({ onClick, children }) => {
    return (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    );
};

const Books = ({ list }) => {
    return (
        <ul>
            {list.map((item) => (
                <Book key={item.id} item={item} />
            ))}
        </ul>
    );
};

const Book = ({ item }) => {  
    const { value } = useCurrency();

    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: value.code,
    }).format(item.price * value.conversionRate);

    return (
        <li>
            {item.title} - {price}
        </li>
    );
};

export default CustomHookExample
