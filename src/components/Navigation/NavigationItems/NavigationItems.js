import React from 'react';

import NavigationItem from './NavigationItem';
import Aux from '../../../higherOrderComponent/Aux/Aux'
// import Icon from '../../../shared/Icon/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { faReact, faNodeJs, faJsSquare, } from '@fortawesome/free-brands-svg-icons'


const navigationItems = (props) => {
    return (
        <Aux>
            <NavigationItem link="/algorithm">
                <FontAwesomeIcon icon={faRocket} size="1x" />
                {/* <Icon name="file-tray-full-outline"></Icon> */}
            </NavigationItem>
            <NavigationItem link="/javascript">
                <FontAwesomeIcon icon={faJsSquare} size="1x" />
                {/* <Icon name="layers-outline"></Icon> */}
            </NavigationItem>
            <NavigationItem link="/nodejs">
                <FontAwesomeIcon icon={faNodeJs} size="1x" />
                {/* <Icon name="layers-outline"></Icon> */}
            </NavigationItem>
            <NavigationItem link="/react">
                <FontAwesomeIcon icon={faReact} size="1x" />
                {/* <Icon name="layers-outline"></Icon> */}
            </NavigationItem>
            {props.isAdmin ? <NavigationItem link="/upload">
            <FontAwesomeIcon icon={faCloudUploadAlt} size="1x" />
                {/* <Icon name="cloud-upload-outline"></Icon> */}
            </NavigationItem> : null}
        </Aux>
    )

};

export default navigationItems;