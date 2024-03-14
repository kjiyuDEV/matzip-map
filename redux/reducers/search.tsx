import { TYPE } from "../types";

export interface Action {
    type: string;
    list?: any;
    zoom: { x: string, y: string };
    index: number
}

const initialState = {
    list: [],
    zoom: { x: "", y: "" },
    index: 0,
}

export const searchReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case TYPE.SET_SEARCH_LIST:
            return {
                ...state,
                list: action.list,
                index: 0,
            }
        case TYPE.SET_INDEX:
            return {
                ...state,
                index: action.index,
            }
        case TYPE.SET_ADDRESS_ZOOM:
            return {
                ...state,
                zoom: {
                    x: action.zoom.x,
                    y: action.zoom.y,
                }
            }
        case TYPE.SET_SEARCH_INIT:
            return {
               ...initialState
            }
        default:
            return state;
    }
}

export default searchReducer