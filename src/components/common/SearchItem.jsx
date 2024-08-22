import { Link } from 'react-router-dom';
import '../../styles/SearchItem.scss';
import PropTypes from 'prop-types';

function SearchItem({ data, ...props }) {
    return (
        <Link to={`/products/${data.id}`} className="wrapper" {...props}>
            <img className="avatar" src={data.thumbnail} alt="avatar" />
            <div className="info">
                <h4 className="name">{data.title}</h4>
                <p className="username">{data.price}</p>
            </div>
        </Link>
    );
}
SearchItem.propTypes = {
    data: PropTypes.object.isRequired, // eslint-disable-line
};

export default SearchItem;
