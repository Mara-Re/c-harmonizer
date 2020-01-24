import {
    inputHandling, 
    isSeqInputEmpty,
    cleanSeqFromFastaFormat,
    removeInvalidCharacters,
    handleLowerCaseAndRnaInput,
    handleSeqNotDivisibleBy3,
    createUserInputWarning
} from './input-handling';
import * as ex from './input-handling-test-examples';

test('correctly determined whether sequence is empty', () => {
    const seq1InputIsEmpty = isSeqInputEmpty(ex.seq1);
    const seq2InputIsEmpty = isSeqInputEmpty(ex.seq2);
    const seq3InputIsEmpty = isSeqInputEmpty(ex.seq3);
    const seq4InputIsEmpty = isSeqInputEmpty(ex.seq4);

    expect(seq1InputIsEmpty).toStrictEqual(ex.seq1InputIsEmpty);
    expect(seq2InputIsEmpty).toStrictEqual(ex.seq2InputIsEmpty);
    expect(seq3InputIsEmpty).toStrictEqual(ex.seq3InputIsEmpty);
    expect(seq4InputIsEmpty).toStrictEqual(ex.seq4InputIsEmpty);
});

test('sequence is correctly cleaned from fasta headers if present', () => {
    const seq1WithoutFastaNotation = cleanSeqFromFastaFormat(ex.seqFastaTest1);
    const seq2WithoutFastaNotation = cleanSeqFromFastaFormat(ex.seqFastaTest2);
    const seq3WithoutFastaNotation = cleanSeqFromFastaFormat(ex.seqFastaTest3);
    const seq4WithoutFastaNotation = cleanSeqFromFastaFormat(ex.seqFastaTest4);
    const seq5WithoutFastaNotation = cleanSeqFromFastaFormat(ex.seqFastaTest5);

    expect(seq1WithoutFastaNotation).toStrictEqual(ex.seq1WithoutFastaNotation);
    expect(seq2WithoutFastaNotation).toStrictEqual(ex.seq2WithoutFastaNotation);
    expect(seq3WithoutFastaNotation).toStrictEqual(ex.seq3WithoutFastaNotation);
    expect(seq4WithoutFastaNotation).toStrictEqual(ex.seq4WithoutFastaNotation);
    expect(seq5WithoutFastaNotation).toStrictEqual(ex.seq5WithoutFastaNotation);
});

test('invalid characters and white spaces are correctly removed', () => {
    const seq1Result = removeInvalidCharacters(ex.seq1TestInvalicCharacters);
    const seq2Result = removeInvalidCharacters(ex.seq2TestInvalicCharacters);
    const seq3Result = removeInvalidCharacters(ex.seq3TestInvalicCharacters);

    expect(seq1Result.seqContainsInvalidCharacters).toStrictEqual(ex.seq1ContainsInvalidCharacters);
    expect(seq1Result.seqWithoutInvalidCharacters).toStrictEqual(ex.seq1WithoutInvalidCharacters);
    expect(seq2Result.seqContainsInvalidCharacters).toStrictEqual(ex.seq2ContainsInvalidCharacters);
    expect(seq2Result.seqWithoutInvalidCharacters).toStrictEqual(ex.seq2WithoutInvalidCharacters);
    expect(seq3Result.seqContainsInvalidCharacters).toStrictEqual(ex.seq3ContainsInvalidCharacters);
    expect(seq3Result.seqWithoutInvalidCharacters).toStrictEqual(ex.seq3WithoutInvalidCharacters);
});

test('lower case letters are converted to upper case letters', () => {
    const seq1UpperCase = handleLowerCaseAndRnaInput(ex.seq1TestLowerCase);
    const seq2UpperCase = handleLowerCaseAndRnaInput(ex.seq2TestLowerCase);
    const seq3UpperCase = handleLowerCaseAndRnaInput(ex.seq3TestLowerCase);

    expect(seq1UpperCase).toStrictEqual(ex.seq1UpperCase);
    expect(seq2UpperCase).toStrictEqual(ex.seq2UpperCase);
    expect(seq3UpperCase).toStrictEqual(ex.seq3UpperCase);
});

test('rna sequence containing letters AUGC is converted to DNA sequence containing letters ATGC', () => {
    const seq4DnaOnly = handleLowerCaseAndRnaInput(ex.seq4TestRna);
    const seq5DnaOnly = handleLowerCaseAndRnaInput(ex.seq5TestRna);
    const seq6DnaOnly = handleLowerCaseAndRnaInput(ex.seq6TestRna);

    expect(seq4DnaOnly).toStrictEqual(ex.seq4DnaOnly);
    expect(seq5DnaOnly).toStrictEqual(ex.seq5DnaOnly);
    expect(seq6DnaOnly).toStrictEqual(ex.seq6DnaOnly);
});

test('correct amount of characters are removed from sequences not divisible by 3', () => {
    const seq1Results = handleSeqNotDivisibleBy3(ex.seq1TestDivBy3);
    const seq2Results = handleSeqNotDivisibleBy3(ex.seq2TestDivBy3);
    const seq3Results = handleSeqNotDivisibleBy3(ex.seq3TestDivBy3);

    expect(seq1Results.amountOfCharactersToBeRemoved).toStrictEqual(ex.seq1AmountOfCharactersToBeRemoved);
    expect(seq1Results.sequenceDivisibleBy3).toStrictEqual(ex.seq1DivisibleBy3);
    expect(seq2Results.amountOfCharactersToBeRemoved).toStrictEqual(ex.seq2AmountOfCharactersToBeRemoved);
    expect(seq2Results.sequenceDivisibleBy3).toStrictEqual(ex.seq2DivisibleBy3);
    expect(seq3Results.amountOfCharactersToBeRemoved).toStrictEqual(ex.seq3AmountOfCharactersToBeRemoved);
    expect(seq3Results.sequenceDivisibleBy3).toStrictEqual(ex.seq3DivisibleBy3);
});

test('sequence is cleaned and user warnings given correctly', () => {
    const seq1Results = inputHandling(ex.seq1TestInputHandling);
    const seq2Results = inputHandling(ex.seq2TestInputHandling);
    const seq3Results = inputHandling(ex.seq3TestInputHandling);
    const seq4Results = inputHandling(ex.seq4TestInputHandling);
    const seq5Results = inputHandling(ex.seq5TestInputHandling);

    expect(seq1Results.cleanedSeq).toStrictEqual(ex.seq1Cleaned);
    expect(seq1Results.userInputWarning).toStrictEqual(ex.seq1UserInputWarning);
    
    expect(seq2Results.cleanedSeq).toStrictEqual(ex.seq2Cleaned);
    expect(seq2Results.userInputWarning).toStrictEqual(ex.seq2UserInputWarning);
    
    expect(seq3Results.cleanedSeq).toStrictEqual(ex.seq3Cleaned); 
    expect(seq3Results.userInputWarning).toStrictEqual(ex.seq3UserInputWarning); 
    
    expect(seq4Results.cleanedSeq).toStrictEqual(ex.seq4Cleaned);
    expect(seq4Results.userInputWarning).toStrictEqual(ex.seq4UserInputWarning);
    
    expect(seq5Results.cleanedSeq).toStrictEqual(ex.seq5Cleaned);
    expect(seq5Results.userInputWarning).toStrictEqual(ex.seq5UserInputWarning);
    
});

