const gene = sessionStorage.getItem('gene');
const refSource = sessionStorage.getItem('refSource');
const refTarget = sessionStorage.getItem('refTarget');
const sourceOrganism = sessionStorage.getItem('sourceOrganism');
const targetOrganism = sessionStorage.getItem('targetOrganism');
const results = sessionStorage.getItem('results') && JSON.parse(`${sessionStorage.getItem('results')}`)

export default function reducer (state = {
    gene,
    refSource,
    refTarget,
    sourceOrganism,
    targetOrganism,
    results
}, action) {

    if (action.type == 'INPUT_CHANGE') {
        state = {
            ...state,
            [action.inputName]: action.inputValue
        };
    }

    if (action.type == 'SUBMIT_INPUT') {
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

    return state;
};