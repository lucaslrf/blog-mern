import React from 'react';
import { Link } from 'react-router-dom';
import ToText from '../../../utils/ToText';
import './ShowUser.css';

const ShowUser = (props) => {
    return (
        <div className="featured-user">
            <ul className="list-unstyled">
                <li>
                    <div className="podcaster">
                        <Link to={'/public/' + props.username}>
                            <span className="d-block username">{props.username}</span>
                            <span className="small">
                                {`${ToText(
                                    props.bio.substring(0, 80)
                                )}...`}
                            </span>
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default ShowUser