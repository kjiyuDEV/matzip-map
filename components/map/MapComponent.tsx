import React, { useEffect, useState } from 'react';
import Map from './Map';
import Marker from './Marker';
import { useSelector } from 'react-redux';
import SearchList from '../common/slideModal/SearchList';

const MapCompoent = () => {
    const [hideMenu, setHideMenu] = useState(true);

    const { slideModal } = useSelector((state) => {
        return {
            slideModal: state.menu.slideModal
        };
    });

    useEffect(() => {
        if (!slideModal) {
            setTimeout(() => {
                setHideMenu(true);
            }, 1000);
        } else {
            setHideMenu(false)
        }
    }, [slideModal])


    return (
        <>
            <Map />
            {!hideMenu && <SearchList setHideMenu={setHideMenu} />}
        </>

    );
};

export default MapCompoent;