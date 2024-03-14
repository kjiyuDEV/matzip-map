import { TYPE } from '../types';

export interface Action {
    type: string;
    list?: any;
    searchMarker: any;
    image: string;
}

const initialState = {
    list: [],
    searchMarker: {},
    image: '',
};

export const markerReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case TYPE.SET_MARKER:
            return {
                ...state,
                list: action.list,
            };
        case TYPE.SET_SEARCH_MARKER:
            return {
                ...state,
                searchMarker: action.searchMarker,
            };
        case TYPE.SET_IMAGE:
            return {
                ...state,
                image: action.image,
            };
        default:
            return state;
    }
};

export default markerReducer;
