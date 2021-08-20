import React from 'react';
 
const CurrencyContext = React.createContext(null);

// custom context hook for accessing this CurrencyContext
const useCurrency = () => {
    const [currency, setCurrency] = React.useContext(CurrencyContext);
   
    const handleCurrency = (value) => {
      setCurrency(value);
    };
   
    return { value: currency, onChange: handleCurrency };
  };

// if I have to use context in third-parties like Styled Components:
const withCurrency = (Component) => (props) => {
    const currency = useCurrency();
   
    return <Component {...props} currency={currency} />;
  };
   
  // if ref is used
  //
  // const withCurrency = (Component) =>
  //   React.forwardRef((props, ref) => {
  //     const currency = useCurrency();
   
  //     return <Component {...props} ref={ref} currency={currency} />;
  //   });
   

  const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = React.useState(CURRENCIES.Euro);
   
    return (
      <CurrencyContext.Provider value={[currency, setCurrency]}>
        {children}
      </CurrencyContext.Provider>
    );
  };


  // example of useContext 
const CURRENCIES = {
    Euro: {
        code: 'EUR',
        label: 'Euro',
        conversionRate: 1, // base conversion rate
    },
    Usd: {
        code: 'USD',
        label: 'US Dollar',
        conversionRate: 1.19,
    },
};


 
export { CurrencyProvider, useCurrency, CURRENCIES };