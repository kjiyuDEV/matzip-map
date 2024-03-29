import { TYPE } from '@/redux/types';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

interface SearchState {
    list: any[];
    zoom: number;
    index: number;
}

interface SlideModalState {
    slideModal: boolean;
}

interface RootState {
    search: SearchState;
    menu: SlideModalState;
}

const SearchList = () => {
    const dispatch = useDispatch();
    const { search, slideModal } = useSelector((state: RootState) => {
        return {
            search: state.search,
            slideModal: state.menu.slideModal,
        };
    });

    const handleSubmitModal = (v: any) => {
        console.log(v, '<<v');
        dispatch({
            type: TYPE.POPUP_MODAL_OPEN,
            content: 'confirm',
            text: '이곳을 맛집으로 <br/> 등록하시겠습니까?',
            positive: '등록할래요',
            positiveFn: () => {
                return dispatch({
                    type: TYPE.POPUP_MODAL_OPEN,
                    data: v,
                    content: 'submit',
                });
            },
            negative: '아뇨',
        });
    };

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
        <div className="search-list-wrapper">
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
            <p className="modal-title">
                검색결과 (총 {search?.list?.length}건)
            </p>
            <div className="list-wrapper">
                {search?.list.map((v, i) => (
                    <div
                        className={`list ${i === search.index ? 'active' : 'inactive'}`}
                        onClick={() => handleIndex(i, v.roadAddress)}
                    >
                        <p className="title">
                            <p dangerouslySetInnerHTML={{ __html: v.title }} />
                        </p>
                        <p className="category">{v.category}</p>
                        <p className="address">{v.address}</p>
                        {v.link !== '' && (
                            <a
                                className="link"
                                href={`http://www.seoul.go.kr/`}
                            >
                                바로가기
                            </a>
                        )}
                        {i === search.index && (
                            <button
                                onClick={() => handleSubmitModal(v)}
                                className={'submit-button'}
                            >
                                맛집 등록하기
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchList;
