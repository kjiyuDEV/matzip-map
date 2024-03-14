import Image from 'next/image';
import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { TYPE } from '@/redux/types';

interface HeaderProps {
    setSearchInput: (input: string) => void;
    searchInput: string;
}

const Header: React.FC<HeaderProps> = ({ setSearchInput, searchInput }) => {
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        if (!searchInput || searchInput.trim() === '')
            return alert('검색이 유효하지 않아요');
        const {
            data: { items },
        } = await axios.get('/v1/search/local.json', {
            params: {
                query: searchInput,
                display: 5,
            },
            headers: {
                'Content-Type': 'application/json',
                'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NAVER_SECRET,
            },
        });

        dispatch({
            type: TYPE.SET_SEARCH_LIST,
            list: items,
        });
        dispatch({
            type: TYPE.SLIDE_MODAL_OPEN,
            content: 'searchList',
        });
        if (items.length === 0) return alert('검색이 유효하지 않아요');
        naver.maps.Service.geocode(
            {
                query: items[0].roadAddress,
            },
            (status, response) => {
                if (status !== naver.maps.Service.Status.OK) {
                    return alert('Something wrong!');
                }
                const zoom = response.v2.addresses;
                console.log(zoom, '<zoom');
                console.log(Number(zoom[0].y) - 0.5);
                dispatch({
                    type: TYPE.SET_ADDRESS_ZOOM,
                    zoom: { x: Number(zoom[0].x), y: Number(zoom[0].y) },
                });
            }
        );
    };

    return (
        <>
            <div className="header">
                <Image
                    src={'/img/logo.png'}
                    alt="logo image"
                    className="logo"
                    width={100}
                    height={100}
                />
                <div className="input-wrap">
                    <input
                        className="search-input"
                        placeholder="상호명을 검색해주세요"
                        onChange={(e) => setSearchInput(e.target.value)}
                        // onChange={handleChange}
                        value={searchInput}
                    />
                    <button className="search-button" onClick={handleSubmit}>
                        검색
                    </button>
                </div>
            </div>
        </>
    );
};

export default Header;
