import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export type NaverMap = naver.maps.Map;

export type ImageIcon = {
    url: string;
    size: naver.maps.Size;
    origin: naver.maps.Point;
    scaledSize?: naver.maps.Size;
};

const Marker = () => {
    const { zoom } = useSelector((state) => {
        return {
            zoom: state.search.zoom
        };
    });


    const markerRef = useRef<NaverMap | null>(null);
    const mapRef = useRef<NaverMap | null>(null);
    useEffect(() => {
        const mapOptions = {
            center: new window.naver.maps.LatLng([zoom.x, zoom.y]),
            zoom: 15,
            minZoom: 9,
            scaleControl: false,
            mapDataControl: false,
            logoControlOptions: {
                position: naver.maps.Position.BOTTOM_LEFT,
            },
        };

        /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html */
        const map = new window.naver.maps.Map('map', mapOptions);



        console.log('!!!')
        console.log({
            map: map,
            position: new window.naver.maps.LatLng(zoom.x, zoom.y),

        })
        /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Marker.html */
        markerRef.current = new window.naver.maps.Marker({
            map: map,
            position: new window.naver.maps.LatLng(zoom.x, zoom.y),
        });


        // if (onClick) {
        //     naver.maps.Event.addListener(marker, 'click', onClick);
        // }

        // return () => {
        //     marker?.setMap(null);
        // };
    }, [zoom]); // eslint-disable-line react-hooks/exhaustive-deps

    return null;
};
export default Marker;
