import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import SearchList from './slideModal/SearchList';
import PlaceDetail from './slideModal/PlaceDetail';
interface SearchState {
    list: any[];
    zoom: number;
    index: number;
}

interface SlideModalState {
    open: true;
    content: string;
}

interface MenuState {
    slideModal: SlideModalState;
}

interface RootState {
    search: SearchState;
    menu: MenuState;
}

const SlideModal = () => {
    const { search, slideModal } = useSelector((state: RootState) => {
        return {
            search: state.search,
            slideModal: state.menu.slideModal,
        };
    });

    return (
        <div
            className={`slide-modal ${slideModal.open ? 'active' : 'inactive'}`}
        >
            {slideModal.content === 'searchList' && <SearchList />}
            {slideModal.content === 'placeDetail' && <PlaceDetail />}
        </div>
    );
};

export default SlideModal;
