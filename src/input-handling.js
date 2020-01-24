export function inputHandling(sequenceInput) {
    if (isSeqInputEmpty(sequenceInput)) {
        return {
            cleanedSeq: undefined,
            userInputWarning: undefined
        }; 
    }
    const seqWithoutFastaNotation = cleanSeqFromFastaFormat(sequenceInput);
    const { 
        seqWithoutInvalidCharacters, 
        seqContainsInvalidCharacters 
    } = removeInvalidCharacters(seqWithoutFastaNotation);
    const upperCaseDnaSeq = handleLowerCaseAndRnaInput(seqWithoutInvalidCharacters);
    
    const {
        sequenceDivisibleBy3,
        amountOfCharactersToBeRemoved
    } = handleSeqNotDivisibleBy3(upperCaseDnaSeq);

    const seqDoesNotStartWithStartCodon = !sequenceDivisibleBy3.startsWith('ATG');

    const seqCorrectionsAndWarnings = {
        seqContainsInvalidCharacters,
        amountOfCharactersToBeRemoved,
        seqDoesNotStartWithStartCodon
    };

    const cleanedSeq = sequenceDivisibleBy3;
    const userInputWarning = createUserInputWarning(seqCorrectionsAndWarnings);

    return {
        cleanedSeq,
        userInputWarning
    };    
}    

function isSeqInputEmpty(sequenceInput) {
    if (!sequenceInput || sequenceInput == '' || sequenceInput.trim() == '') {
        return true;
    }
    return false;
}

function cleanSeqFromFastaFormat(sequenceInput) {
    if (sequenceInput.trim().startsWith('>')) {     //if gene or ref genes are entered in fasta format
        let seqArr = sequenceInput.trim().split('\n'); //split on new lines -> to remove fasta headers
        const dnaSeqWithoutFastaNotation = seqArr.filter(fastaSeqInput => {
            if (fastaSeqInput.startsWith('>')) {
                return false;
            } else {               
                return true;
            }
        }, []).join('');                              //join sequences without fasta headers
        return dnaSeqWithoutFastaNotation;
    } else {
        return sequenceInput;
    }
}

function removeInvalidCharacters(sequence) {
    const seqWithoutWhiteSpaces = sequence.replace(/\s/g,""); 
    let seqContainsInvalidCharacters = false;
    if ((/[^atgcu]/i).test(seqWithoutWhiteSpaces)) {
        seqContainsInvalidCharacters = true;
    } 
    return {
        seqWithoutInvalidCharacters: seqWithoutWhiteSpaces.replace(/[^atgcu]/ig, ''), //replace any character other than atgcuATGCU
        seqContainsInvalidCharacters
    };
}

function handleLowerCaseAndRnaInput(sequence) {
    //convert to upper case and replace rna (U) to dna (T)
    return sequence.toUpperCase().replace(/U/g, 'T');
}

function handleSeqNotDivisibleBy3(sequence) {
    let sequenceDivisibleBy3 = sequence;
    let amountOfCharactersToBeRemoved;
    if (sequence % 3 != 0) {
        amountOfCharactersToBeRemoved = sequence.length % 3;     
        //REMOVE characters at the end of the sequence:
        sequenceDivisibleBy3 = sequence.slice(0, sequence.length - amountOfCharactersToBeRemoved);
    }
    return {
        sequenceDivisibleBy3,
        amountOfCharactersToBeRemoved
    };
}

function createUserInputWarning(seqCorrectionsAndWarnings) {
    const {
        seqContainsInvalidCharacters,
        amountOfCharactersToBeRemoved,
        seqDoesNotStartWithStartCodon
    } = seqCorrectionsAndWarnings;

    let userInputWarnings = [];

    if (seqContainsInvalidCharacters) {
        userInputWarnings.push('Your sequence contains characters other than ATGC/AUGC which will be ignored.');
    }
    if (amountOfCharactersToBeRemoved > 0) {
        userInputWarnings.push(`Your gene sequence is not divisible by 3. Therefore, the last ${amountOfCharactersToBeRemoved} bases will be ignored.`);
    }
    if (seqDoesNotStartWithStartCodon) {
        userInputWarnings.push('Your sequence does not start with a start codon. Are you sure you want to continue?');
    }
    return userInputWarnings.join(' ');
}

//EXPORT for TESTING:
export {
    isSeqInputEmpty,
    cleanSeqFromFastaFormat,
    removeInvalidCharacters,
    handleLowerCaseAndRnaInput,
    handleSeqNotDivisibleBy3,
    createUserInputWarning
};