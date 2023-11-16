import { useReducer } from 'react';
import { resetCurrentVariables } from '../configs/FieldVariable';

// Define your initial state here
function initializeState(props) {
    return {
        fields: props.fields || [],
        addingFieldType: null,
        updatingIndex: null, // Add updatingIndex to initialState
        selectedArrayType: { label: 'String', value: 'string' }, // Add selectedArrayType to initialState
        objectMode: false,
        currentVariables: resetCurrentVariables,
    };
}

// Define your action types and cases here
const schemaReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELDS':
            return { ...state, fields: action.payload };
        case 'SET_CURRENT_VARIABLES':
            return { ...state, currentVariables: action.payload };
        case 'SET_ADDING_FIELD_TYPE':
            return { ...state, addingFieldType: action.payload };
        case 'SET_UPDATING_INDEX':
            return { ...state, updatingIndex: action.payload };
        case 'SET_SELECTED_ARRAY_TYPE':
            return { ...state, selectedArrayType: action.payload };
        case 'SET_OBJECT_MODE':
            return { ...state, objectMode: action.payload };
        default:
            return state;
    }
};

function useSchemaReducer(props) {
    const initialState = initializeState(props);
    const [state, dispatch] = useReducer(schemaReducer, initialState);
    return { state, dispatch };
}

export { useSchemaReducer };