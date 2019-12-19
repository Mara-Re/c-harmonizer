const gene = sessionStorage.getItem('gene');
const refSource = sessionStorage.getItem('refSource');
const refTarget = sessionStorage.getItem('refTarget');
const sourceOrganism = sessionStorage.getItem('sourceOrganism');
const targetOranism = sessionStorage.getItem('targetOranism');
const results = sessionStorage.getItem('results') && JSON.parse(`${sessionStorage.getItem('results')}`)

export default function reducer (state = {
    gene,
    refSource,
    refTarget,
    sourceOrganism,
    targetOranism,
    results
}, action) {
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
            results: action.results
        };
    }

    if (action.type == 'REMOVE_RESULTS') {
        state = {
            ...state,
            results: action.results
        };
    }

    console.log(' new state: ', state);
    return state;
};