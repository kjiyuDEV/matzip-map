import { TYPE } from '@/redux/types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const ConfirmModal = () => {
    const dispatch = useDispatch();
    const { popupModal } = useSelector((state) => {
        return {
            popupModal: state.menu.popupModal,
        };
    });
    return (
        <div className="confirm-wrap">
            <p
                className="text"
                dangerouslySetInnerHTML={{ __html: popupModal.text }}
            />
            <span></span>
            {/* 선택지 두개일때만 노출 */}
            {popupModal.negative && (
                <div className="btn-wrap">
                    <button
                        onClick={() => {
                            popupModal.positiveFn();
                        }}
                    >
                        {popupModal.positive || '네'}
                    </button>
                    <button
                        onClick={() => {
                            dispatch({
                                type: TYPE.POPUP_MODAL_CLOSE,
                            });
                        }}
                    >
                        {popupModal.negative}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConfirmModal;
