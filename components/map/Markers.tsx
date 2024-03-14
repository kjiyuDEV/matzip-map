import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Marker from './Marker';
import ReactDOMServer from 'react-dom/server';

const Markers = () => {
    return ReactDOMServer.renderToStaticMarkup(
        <>
            <p></p>
            <img src="/img/marker_active.png" style={{ width: '20px' }} />
        </>
    );
};

export default Markers;