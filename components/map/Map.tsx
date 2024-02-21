import Script from 'next/script';
import React, { useEffect, useRef } from 'react';
import styles from '../../styles/map.module.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Marker } from 'react-naver-maps';

type Props = {
    mapId?: string;
    initialCenter?: [number, number];
    initialZoom?: number;
    onLoad?: (map: naver.maps.Map) => void;
};
const Map = ({
    mapId = 'map',
    initialCenter = [37.5262411, 126.99289439],
    initialZoom = 13,
    onLoad,
}: Props) => {

    const { zoom } = useSelector((state) => {
        console.log(state)
        return {
            zoom: state.search.zoom
        };
    });




    const mapRef = useRef<NaverMap | null>(null);
    const markerRef = useRef<NaverMap | null>(null);

    const mapOptions = {
        center: new window.naver.maps.LatLng(...initialCenter),
        zoom: initialZoom,
        minZoom: 9,
        scaleControl: false,
        mapDataControl: false,
        logoControlOptions: {
            position: naver.maps.Position.BOTTOM_LEFT,
        },
    };
    const initializeMap = () => {
        /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html */
        const map = new window.naver.maps.Map(mapId, mapOptions);

        mapRef.current = map;

        if (onLoad) {
            onLoad(map);
        }
    };


    useEffect(() => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(...[zoom.x, zoom.y]),
            zoom: 17,
            minZoom: 9,
            scaleControl: false,
            mapDataControl: false,
            logoControlOptions: {
                position: naver.maps.Position.BOTTOM_LEFT,
            },
        };
        const map = new window.naver.maps.Map(mapId, mapOptions);
        const point = new window.naver.maps.Point(zoom.x, zoom.y - 0.001); // 지도에서 이동할 좌표
        var marker = new window.naver.maps.Marker({
            map,
            position: new window.naver.maps.LatLng(...[zoom.y, zoom.x]),
        });
        mapRef.current = map;
        markerRef.current = marker;

        console.log(point)
        map.setCenter(point)
        marker.setPosition(new window.naver.maps.LatLng(zoom.y, zoom.x));
    }, [zoom])



    return (
        <>
            <Script
                type="text/javascript"
                src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
                onLoad={initializeMap}
            />
            {/* <Marker /> */}
            <div id={mapId} className={styles.map} />
        </>
    );
};

export default Map;