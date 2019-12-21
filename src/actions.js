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
        console.log('error in action creator submitInput');
        //HANDLE ERROR: REDIRECT TO /
    }
};
