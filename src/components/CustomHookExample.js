import { useState, Fragment } from 'react'; 
import Button from './Button';
import useDataApi from '../customHooks/useDataApi';
import {Link} from 'react-router-dom'

const CustomHookExample = () => {

    const [query, setQuery] = useState('redux597')
    const [{data, isLoading, isError}, doFetch] = useDataApi( 'https://hn.algolia.com/api/v1/search?query=redux', { hits: [] })
   
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
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`) }}>
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
}

export default CustomHookExample
