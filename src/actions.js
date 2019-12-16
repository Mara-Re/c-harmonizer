//import axios from './axios';
import axios from 'axios';

export function inputChange(inputName, inputValue) {
    console.log('action creator inputChange runs');
    return {
        type: 'INPUT_CHANGE',
        inputValue,
        inputName
    };
};

export async function submitInput(gene, refSource, refTarget) {
    console.log('action creator submitInput runs');
    const {data} = await axios.post('/seq-input.json', {
        gene,
        refSource,
        refTarget
    });
    console.log('data from axios post /seq-input.json: ', data);
    return {
        type: 'SUBMIT_INPUT',
        data: data
    };
};