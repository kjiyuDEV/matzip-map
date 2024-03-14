import { NaverMap } from '@/types/map';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export type ImageIcon = {
    url: string;
    size: naver.maps.Size;
    origin: naver.maps.Point;
    scaledSize?: naver.maps.Size;
};

const Marker = () => {
    const { zoom, markerList, search } = useSelector((state: any) => {
        return {
            zoom: state.search.zoom,
            markerList: state.marker.list,
            search: state.search,
        };
    });

    console.log(search, '??');

    const markerRef = useRef<NaverMap | null>(null);
    const mapRef = useRef<NaverMap | null>(null);
    console.log(mapRef);
    useEffect(() => {
        const map = mapRef.current;
        if (map && search.list.length > 0) {
            console.log(zoom, '<<');
            const point = new window.naver.maps.Point(zoom.x, zoom.y - 0.001); // 지도에서 이동할 좌표
            var marker = new window.naver.maps.Marker({
                map,
                position: new window.naver.maps.LatLng(zoom.y, zoom.x),
                icon: {
                    content: `<p></p><img src="/img/marker_active.png" style=width:30px />`,
                    size: new naver.maps.Size(22, 36), //아이콘 크기
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(11, 35),
                },
            });
            mapRef.current = map;
            markerRef.current = marker;

            // map.setCenter(point)
            marker.setPosition(new window.naver.maps.LatLng(zoom.y, zoom.x));
        }
    }, [zoom, search.list, mapRef]);

    return <></>;
};
export default Marker;
