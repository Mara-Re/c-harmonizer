export default function reducer (state = {}, action) {
    console.log('reducer runs!');

    if (action.type == 'INPUT_CHANGE') {
        console.log('INPUT_CHANGE');
        state = {
            ...state,
            [action.inputName]: action.inputValue
        };
    }

    if (action.type == 'SUBMIT_INPUT') {
        console.log('SUBMIT_INPUT');
        state = {
            ...state,
            data: action.data
        };
    }

    console.log(' new state: ', state);
    return state;
};