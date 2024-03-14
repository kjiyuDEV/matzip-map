import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TYPE } from '@/redux/types';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Submit = () => {
    const dispatch = useDispatch();
    const { popupModal, zoom } = useSelector((state) => {
        return {
            popupModal: state.menu.popupModal,
            zoom: state.search.zoom,
        };
    });
    const [form, setForm] = useState({
        writer: null,
        comment: null,
    });

    const handleForm = (e) => {
        const { value, id } = e.target;
        setForm({ ...form, [id]: value });
    };

    console.log(form);
    const handleSubmit = async () => {
        await axios.post(`/api/insertPlace`, {
            name: popupModal.data.title.replace('<b>', '').replace('</b>', ''),
            category: popupModal.data.category,
            writer: form.writer,
            comment: form.comment,
            address: popupModal.data.address,
            x: zoom.x,
            y: zoom.y,
        });
    };

    return (
        <div className="modal-wrap">
            <div
                className="close-btn"
                // onClick={() => {
                //     dispatch({
                //         type: TYPE.SLIDE_MODAL_CLOSE,
                //     });
                // }}
            >
                <FontAwesomeIcon
                    icon={faXmark}
                    fontSize={'20px'}
                    onClick={() => {
                        dispatch({
                            type: TYPE.POPUP_MODAL_CLOSE,
                        });
                    }}
                />
            </div>
            <div className="submit-wrap">
                <div className="form-wrap">
                    <label>작성자명</label>
                    <input
                        placeholder="ex) 지유"
                        id="writer"
                        onChange={handleForm}
                    />
                </div>
                <div className="form-wrap">
                    <label>설명</label>
                    <input
                        placeholder="ex) 깔끔하고 분위기 좋은 분식집"
                        id="comment"
                        onChange={handleForm}
                    />
                </div>
            </div>
            <div className="btn-wrap">
                <button onClick={handleSubmit}>등록하기</button>
            </div>
        </div>
    );
};

export default Submit;
