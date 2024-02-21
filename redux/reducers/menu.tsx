import { TYPE } from "../types";

export interface Action {
    type: string;
    list?: any;
    zoom: { x: string, y: string };
}

const initialState = {
    slideModal: false,
}

export const menuReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case TYPE.SLIDE_MODAL_OPEN:
            return {
                ...state,
                slideModal: true,
            }
        case TYPE.SLIDE_MODAL_CLOSE:
            return {
                ...state,
                slideModal: false,
            }
        default:
            return state;
    }
}

export default menuReducer