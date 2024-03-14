import React from 'react';
import ConfirmModal from './popupModal/ConfirmModal';
import Submit from './popupModal/Submit';
import { useSelector } from 'react-redux';

const PopupModal = () => {
    const { popupModal } = useSelector((state: any) => {
        return {
            popupModal: state.menu.popupModal,
        };
    });
    return (
        <>
            <div
                className={`background ${popupModal.open ? 'active' : 'inactive'}`}
            />
            <div
                className={`popup-modal ${popupModal.open ? 'active' : 'inactive'}`}
            >
                {popupModal.content === 'confirm' && <ConfirmModal />}
                {popupModal.content === 'submit' && <Submit />}
            </div>
        </>
    );
};

export default PopupModal;
