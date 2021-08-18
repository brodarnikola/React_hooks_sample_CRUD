import { useState, Fragment } from 'react'; 
import Button from './Button';
import useCustomReducerDataApi from '../customHooks/useCustomReducerDataApi';
import {Link} from 'react-router-dom'

const ReducerExample = () => {

    const baseUrl = 'https://hn.algolia.com/api/v1/search?query='

    const [query, setQuery] = useState('redux')
    const [{data, isLoading, isError}, doFetch] = useCustomReducerDataApi( baseUrl+'redux', { hits: [] })
   
    let htmlContent = ''
    if (isLoading) {
        htmlContent = <div>Loading data... Please wait</div>
    }
    else if (isError && !isLoading) {
        htmlContent = <div style={{ color: 'red' }}>Something went wrong. Please try again latter.</div>
    } else {
        if( data.hits.length > 0) { 
            htmlContent = <ul> {data.hits.map(item => (
                <li key={item.objectID}>
                    <a href={item.url}>{item.title}</a>
                </li>
            ))}
        </ul>
        }
        else {
            htmlContent = <div>There is nothing that macthes this {query} filter. </div>
        }
    }

    return (
        <Fragment>
            <Link to='/'>GO BACK</Link>
            <form
                onSubmit={(event) => {
                    doFetch( baseUrl+ `${query}`)
                    event.preventDefault() }}>
                <input
                    type='text'
                    value={query}
                    onChange={(event) => {
                        console.log("hoce li uci sim");
                        setQuery(event.target.value) }}
                />
                <Button text={'Search'} onClick={() => doFetch(baseUrl+ `${query}`)} />
            </form>
            {htmlContent}
        </Fragment>
    )
}

export default ReducerExample
