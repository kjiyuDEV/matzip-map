import Script from 'next/script';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/map.module.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Markers from './Markers';
import { useDispatch } from 'react-redux';
import { TYPE } from '@/redux/types';
import { NaverMap, Marker } from '@/types/map';

type Props = {
    mapId?: string;
    initialCenter?: [number, number];
    initialZoom?: number;
    onLoad?: (map: naver.maps.Map) => void;
};
const Map = () => {
    const dispatch = useDispatch();
    const { zoom, searchList, markerList, slideModal } = useSelector(
        (state: any) => {
            console.log(state);
            return {
                zoom: state.search.zoom,
                searchList: state.search.list,
                markerList: state.marker.list,
                slideModal: state.menu.slideModal,
            };
        }
    );
    const mapRef = useRef<NaverMap | null>(null);
    const markerRef = useRef<NaverMap | null>(null);
    const [markers, setMarkers] = useState([]);
    const [originMarkers, setOriginMarkers] = useState([]);
    const [searchMarker, setSearchMarker] = useState(null);
    const [totalMarkers, setTotalMarkers] = useState([]);
    const selectedMarker = useRef<any | null>(null); // 선택된 마커를 구분하기 위해 useRef 추가

    const markerClickEvent = (marker: any, item: any) => {
        console.log(item, '<item~');
        console.log(item.x, '<<item.x');
        naver.maps.Event.addListener(marker, 'click', async (e: any) => {
            dispatch({
                type: TYPE.SET_ADDRESS_ZOOM,
                zoom: { x: Number(item.x), y: Number(item.y) - 0.01 },
            });
            const { data: image } = await axios.get('/v1/search/image.json', {
                params: {
                    query: item.name,
                    display: 5,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'X-Naver-Client-Id':
                        process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
                    'X-Naver-Client-Secret':
                        process.env.NEXT_PUBLIC_NAVER_SECRET,
                },
            });
            dispatch({
                type: TYPE.SET_IMAGE,
                image: image.items,
            });
            if (
                !selectedMarker.current ||
                (selectedMarker.current !== marker && name !== undefined)
            ) {
                marker.setIcon({
                    content: `<img src="/img/star.png" style=width:30px />`,
                    size: new naver.maps.Size(24, 36), //아이콘 크기
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(11, 35),
                });
                selectedMarker.current = marker;
                console.log(marker);
                dispatch({
                    type: TYPE.SET_PLACE_DETAIL,
                    list: item,
                });
                dispatch({
                    type: TYPE.SLIDE_MODAL_OPEN,
                    content: 'placeDetail',
                    data: item,
                });
            }
        });
    };

    const fetchImage = async () => {};

    useEffect(() => {
        fetchImage();
    }, []);

    const initMarker = () => {
        if (markerList.length > 0) {
            const mapOptions = {
                center: new window.naver.maps.LatLng(
                    ...[37.5262411, 126.99289439]
                ),
                zoom: 13,
                minZoom: 9,
                scaleControl: false,
                mapDataControl: false,
                logoControlOptions: {
                    position: naver.maps.Position.BOTTOM_LEFT,
                },
            };

            const map = new window.naver.maps.Map('map', mapOptions);
            const arr: any = [];
            mapRef.current = map;
            markerList?.map((item: any, i: any) => {
                console.log('gg');
                markerRef.current = new window.naver.maps.Marker({
                    map,
                    position: new window.naver.maps.LatLng(item.y, item.x),
                    icon: {
                        content: `<p></p>`,
                        size: new naver.maps.Size(24, 36), //아이콘 크기
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(11, 35),
                    },
                });
                arr.push(item);
                setTotalMarkers(arr);
                setOriginMarkers(arr);
                // markerClickEvent(markerRef.current, item);
            });
        }
    };

    useEffect(() => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(
                ...[zoom.y || 37.5262411, zoom.x || 126.99289439]
            ),
            zoom: 13,
            minZoom: 9,
            scaleControl: false,
            mapDataControl: false,
            logoControlOptions: {
                position: naver.maps.Position.BOTTOM_LEFT,
            },
        };
        const map = new window.naver.maps.Map('map', mapOptions);
        totalMarkers?.map((item, i) => {
            console.log('돈다?');
            markerRef.current = new window.naver.maps.Marker({
                map,
                position: new window.naver.maps.LatLng(
                    item.y || item.position.y,
                    item.x || item.position.x
                ),
                icon: {
                    content: `<img src="/img/${searchMarker && slideModal.open ? 'marker_active' : 'star'}.png" style=width:30px />`,
                    size: new naver.maps.Size(24, 36), //아이콘 크기
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(11, 35),
                },
            });
            markerClickEvent(markerRef.current, item);
        });
    }, [totalMarkers, selectedMarker.current]);

    useEffect(() => {
        if (!slideModal.open) {
            setTotalMarkers(originMarkers);
            setSearchMarker(null);
            dispatch({ type: TYPE.SET_SEARCH_INIT });
        } else {
            if (searchMarker) {
                setTotalMarkers([searchMarker]);
            }
        }
    }, [markers.length, searchMarker, slideModal]);

    useEffect(() => {
        initMarker();
    }, [markerList]);

    useEffect(() => {
        if (searchList.length > 0) {
            const mapOptions = {
                center: new window.naver.maps.LatLng(...[zoom.x, zoom.y]),
                zoom: 17,
                minZoom: 9,
                scaleControl: false,
                mapDataControl: false,
                logoControlOptions: {
                    position: naver.maps.Position.BOTTOM_LEFT,
                },
                zoomControlOptions: {
                    //줌 컨트롤의 옵션
                    position: naver.maps.Position.TOP_CENTER,
                },
            };
            const map = mapRef.current;
            var marker = new window.naver.maps.Marker({
                map,
                position: new window.naver.maps.LatLng(zoom.y, zoom.x),
                icon: {
                    content: `<img src="/img/marker_active.png" style=width:30px />`,
                    // content: `<p></p>`,
                    size: new naver.maps.Size(24, 36), //아이콘 크기
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(11, 35),
                },
            });
            markerRef.current = marker;
            setSearchMarker({
                ...markerRef.current,
                focus: true,
                ico: 'marker_active',
            });
            mapRef.current.setCenter(
                new window.naver.maps.Point(zoom.x, zoom.y - 0.001)
            );
            // markerClickEvent(markerRef.current, zoom);
        }
    }, [zoom, searchList]);

    console.log(searchMarker);

    return (
        <>
            <div id={'map'} className={styles.map} />
        </>
    );
};

export default Map;
