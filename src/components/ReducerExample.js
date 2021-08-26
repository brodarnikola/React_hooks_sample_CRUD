import { useState, useRef, useCallback, useEffect, Fragment } from 'react';
import React from 'react';
import Button from './Button';
import useCustomReducerDataApi from '../customHooks/useCustomReducerDataApi';
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

const ReducerExample = () => {

    // example of useRef
    const inputRef = useRef()
    const focusInput = () => inputRef.current.focus()

    // example of useRef
    const [counter, setCounter] = useState(0);
    const counterRef = useRef(counter);
    const incrementCounter = () => {
        setCounter(c => c + 1) ;
        counterRef.current = counter + 1;
    }

    const decrementCounter = () => {
        setCounter(c => c - 1);
        counterRef.current = counter;
    }

    useEffect(() => {
        console.log("Will it enter here... 777")
            counterRef.current = counter
    }, [counter])

    const increaseByOne = useCallback(
        () => {
            setCounter(c => c + 1) ;
            console.log("Will it enter here... 55")
            counterRef.current = counter
        },
        [counter, setCounter],
    ) 


    // example of useCallback
    console.log('Render: App');
    const [users, setUsers] = useState([
        { id: 'a', name: 'Robin' },
        { id: 'b', name: 'Dennis' },
    ]);

    const [text, setText] = useState('');

    const handleText = (event) => {
        setText(event.target.value);
    };

    const handleAddUser = () => {
        setUsers(users.concat({ id: uuidv4(), name: text }));
        setText('')
    };

    const handleRemove = useCallback((id) => {
        console.log("Da li ces sada uci")
        setUsers(users.filter((user) => user.id !== id));
    },
        [users],
    )


    // example of custom reducer. 
    //this reducer is used to create a backend request to server 
    const baseUrl = 'https://hn.algolia.com/api/v1/search?query='
    const [query, setQuery] = useState('redux')
    const [{ data, isLoading, isError }, doFetch] = useCustomReducerDataApi(baseUrl + 'redux', { hits: [] })

    let htmlContent = ''
    if (isLoading) {
        htmlContent = <div>Loading data... Please wait</div>
    }
    else if (isError && !isLoading) {
        htmlContent = <div style={{ color: 'red' }}>Something went wrong. Please try again latter.</div>
    } else {
        if (data.hits.length > 0) {
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
            <div>
                <br/>
                Example of useCallback function
                <input type="text" value={text} onChange={handleText} />
                <button type="button" onClick={handleAddUser}>
                    Add User
                </button>

                <List list={users} onRemove={handleRemove} />
            </div>
            <div>
                <br/>
                Examples of useRef, to save state variable and html DOM, node object
                <input type="text" ref={inputRef} />
                <Button text={'Focus'} onClick={() => focusInput()} />
            </div>
            <div>
                Example of useRef
                <h1>Counter state: {counter}</h1>
                <h1 >Counter ref: {counterRef.current}</h1>
                <Button text={'+'} onClick={() => increaseByOne()} />
                <Button text={'-'} onClick={() => decrementCounter()} />
            </div> 
            <br/>
            <form
                onSubmit={(event) => {
                    doFetch(baseUrl + `${query}`)
                    event.preventDefault()
                }}>
                <input
                    type='text'
                    value={query}
                    onChange={(event) => {
                        console.log("hoce li uci sim");
                        setQuery(event.target.value)
                    }}
                />
                <Button text={'Search'} onClick={() => doFetch(baseUrl + `${query}`)} />
            </form>
            {htmlContent}
        </Fragment>
    )
};


const List = React.memo(({ list, onRemove }) => {
    console.log('Render: List');
    return (
        <ul>
            {list.map((item) => (
                <ListItem key={item.id} item={item} onRemove={onRemove} />
            ))}
        </ul>
    );
});

const ListItem = React.memo(({ item, onRemove }) => {
    console.log('Render: ListItem');
    return (
        <li>
            {item.name}
            <button type="button" onClick={() => onRemove(item.id)}>
                Remove
            </button>
        </li>
    );
});


export default ReducerExample
