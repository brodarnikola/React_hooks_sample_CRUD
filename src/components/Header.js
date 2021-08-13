import PropTips from 'prop-types'
import Button from './Button' 
import { useLocation } from 'react-router'

const Header = ({title, onAdd, showAdd}) => {
 
    const locationName = useLocation()

    return (
        <header className="header">
            <h1 >{title}</h1>
            {  locationName.pathname === '/' &&
                <Button color={showAdd ? 'green' : 'blue'} 
            text={showAdd ? 'Close' : 'Add'} onClick={onAdd} /> 
            }
        </header>
    )
}

Header.defaultProps = {
    title: 'Task tracker 55'
}

Header.propTypes = {
    title: PropTips.string.isRequired
}

// CSS in JS
// const headingStyle = {
//     color: 'blue', backgroundColor: 'yellow'
// }

export default Header
