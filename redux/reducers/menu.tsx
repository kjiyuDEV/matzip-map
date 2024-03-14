import { TYPE } from '../types';

export interface Action {
    content: string;
    type: string;
    data: any;
    list?: any;
    zoom: { x: string; y: string };
    text: string;
    subText: string;
    positive: string;
    positiveFn: any;
    negative: string;
}

const initialState = {
    slideModal: {
        content: null,
        open: false,
        data: null,
    },
    popupModal: {
        content: null,
        text: null,
        subText: null,
        open: false,
        positive: '확인했어요',
        negative: null,
    },
};

export const menuReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case TYPE.SLIDE_MODAL_OPEN:
            return {
                ...state,
                slideModal: {
                    content: action.content,
                    open: true,
                    data: action.data || null,
                },
            };
        case TYPE.SLIDE_MODAL_CLOSE:
            return {
                ...state,
                slideModal: {
                    ...initialState.slideModal,
                    open: false,
                },
            };
        case TYPE.POPUP_MODAL_OPEN:
            return {
                ...state,
                popupModal: {
                    content: action.content,
                    text: action.text,
                    subText: action.subText,
                    open: true,
                    data: action.data || null,
                    positive: action.positive,
                    positiveFn: action.positiveFn,
                    negative: action.negative,
                },
            };
        case TYPE.POPUP_MODAL_CLOSE:
            return {
                ...state,
                popupModal: {
                    ...initialState.popupModal,
                    open: false,
                },
            };
        default:
            return state;
    }
};

export default menuReducer;
