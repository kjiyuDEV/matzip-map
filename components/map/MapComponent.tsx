import React, { useEffect, useState } from 'react';
import Map from './Map';
import Marker from './Marker';
import { useSelector } from 'react-redux';
import SearchList from '../common/slideModal/SearchList';
import { useRouter } from 'next/router';
import dbConnect from '@/lib/dbConnect';
import { useDispatch } from 'react-redux';
import { TYPE } from '@/redux/types';
import axios from 'axios';
import Markers from './Markers';
import SlideModal from '../common/SlideModal';
import PopupModal from '../common/PopupModal';

const MapCompoent = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [hideMenu, setHideMenu] = useState(true);

    const { slideModal, popupModal } = useSelector((state) => state.menu);

    useEffect(() => {
        if (!slideModal) {
            setTimeout(() => {
                setHideMenu(true);
            }, 1000);
        } else {
            setHideMenu(false);
        }
    }, [slideModal]);

    const fetchMarker = async () => {
        try {
            const res = await axios.get(`/api/insertPlace`);
            console.log(res);
            dispatch({
                type: TYPE.SET_MARKER,
                list: res.data,
            });
            console.log(' ???');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMarker();
    }, []);

    console.log(slideModal.content);

    return (
        <>
            <Map />
            <Markers />
            {/* <Marker /> */}
            {slideModal.open && <SlideModal />}
            {popupModal.open && <PopupModal />}
        </>
    );
};

export default MapCompoent;
