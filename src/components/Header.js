import PropTips from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router'
import { useHistory } from 'react-router-dom'

const Header = ({ title }) => {

    const locationName = useLocation()
    const history = useHistory();

    const routeChange = () => {
        let path = '/addNewTask';
        history.push(path);
    }

    return (
        <header className="header">
            {/* inline style example */}
            <h1 style={{ color: title.length > 5 ? 'green' : 'blue' }}  >{title}</h1>
            {locationName.pathname === '/' &&
                <Button color={title.length > 5 ? 'green' : 'blue'} text={'ADD'} onClick={routeChange} />
            }
            <br/>
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
