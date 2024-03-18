import { TYPE } from '@/redux/types';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

interface SearchState {
    list: any[];
    zoom: number;
    index: number;
}

interface SlideModalState {
    slideModal: any;
}

interface markerState {
    image: any[];
}

interface RootState {
    search: SearchState;
    menu: SlideModalState;
    marker: markerState;
}

const PlaceDetail = () => {
    const dispatch = useDispatch();
    const { search, slideModal, image } = useSelector((state: RootState) => {
        return {
            search: state.search,
            slideModal: state.menu.slideModal,
            image: state.marker.image,
        };
    });

    const handleIndex = (i: number, address: string) => {
        dispatch({
            type: TYPE.SET_INDEX,
            index: i,
        });
        if (!address) return alert('이 주소는 등록되어 있지 않아요');
        if (address)
            naver.maps.Service.geocode(
                {
                    query: address,
                },
                (status, response) => {
                    if (status !== naver.maps.Service.Status.OK) {
                        return alert('Something wrong!');
                    }
                    const zoom = response.v2.addresses;
                    dispatch({
                        type: TYPE.SET_ADDRESS_ZOOM,
                        zoom: { x: Number(zoom[0].x), y: Number(zoom[0].y) },
                    });
                }
            );
    };

    return (
        <div className="marker-wrapper">
            <div
                className="close-btn"
                onClick={() => {
                    dispatch({
                        type: TYPE.SLIDE_MODAL_CLOSE,
                    });
                }}
            >
                <FontAwesomeIcon icon={faXmark} fontSize={'20px'} />
            </div>
            <div className="album">
                {image.map((v, i) => (
                    <div className="img-wrap">
                        <Image
                            src={`${v.link}`}
                            width={100}
                            height={100}
                            alt="이미지 사진"
                            quality={100}
                            loading="eager"
                        />
                    </div>
                ))}
                <div className="marker-info">
                    <p className="title">
                        {slideModal.data.name.replace('&amp;', '&')}
                    </p>
                    <p>{slideModal.data.category}</p>
                    <p>{slideModal.data.address}</p>
                    <br />
                    <div className="comment">
                        <p>{slideModal.data.comment}</p>
                        <p>작성자: {slideModal.data.writer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceDetail;
