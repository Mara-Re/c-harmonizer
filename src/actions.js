import axios from 'axios';

export function inputChange(inputName, inputValue) {
    return {
        type: 'INPUT_CHANGE',
        inputValue,
        inputName
    };
};

export function removeResults() {
    return {
        type: 'REMOVE_RESULTS',
        results: {}
    };
};

export async function submitInput(gene, refSource, refTarget) {    
    try {
        const {data} = await axios.post('/seq-input.json', {
            gene,
            refSource,
            refTarget
        });
        return {
            type: 'SUBMIT_INPUT',
            results: data
        };
    } catch(err) {
        //HANDLE ERROR: REDIRECT TO '/' and display error message
    }
};
