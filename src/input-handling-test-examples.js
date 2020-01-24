//---------------TEST isSeqInputEmpty---------------
//TEST1: empty sequence
export const seq1 = '' 
export const seq1InputIsEmpty = true;

//TEST2: empty sequence with white spaces
export const seq2 = `  

  ` //containing spaces, tabs, new lines
export const seq2InputIsEmpty = true;

//TEST3: sequence not empty in fasta format
export const seq3 = `
>fasta format 
ATG
`       //sequence containing ATG -> not empty
export const seq3InputIsEmpty = false;

//TEST4: sequence not empty, no fasta format
export const seq4 = `AAATG`       //sequence not empty
export const seq4InputIsEmpty = false;

//---------------TEST cleanSeqFromFastaFormat---------------
//TEST1: no fasta with newlines
export const seqFastaTest1 = `
thisIsNOFasta
ATGGACT`;
export const seq1WithoutFastaNotation = `
thisIsNOFasta
ATGGACT`;

//TEST2: no fasta, pure DNA sequence
export const seqFastaTest2 = `ATGGACT`;
export const seq2WithoutFastaNotation = `ATGGACT`;

//TEST3: fasta, one sequence
export const seqFastaTest3 = `>this is a fasta
ATGAAAGACT`;
export const seq3WithoutFastaNotation = `ATGAAAGACT`;

//TEST4: fasta, one sequence, starting with newline
export const seqFastaTest4 = `
>this is a fasta starting with a newline
ATGAAAGGGT`;
export const seq4WithoutFastaNotation = `ATGAAAGGGT`;

//TEST5: multifasta
export const seqFastaTest5 = `>this is a multi fasta input
CCC
>this the header of the second sequence
ATG
AAA
>this the header of the third sequence
GGG
unvlid123`;
export const seq5WithoutFastaNotation = `CCCATGAAAGGGunvlid123`;

//---------------TEST removeInvalidCharacters---------------
//TEST1: no invalid characters
export const seq1TestInvalicCharacters = 'ATGACCatcg';
export const seq1ContainsInvalidCharacters = false;
export const seq1WithoutInvalidCharacters = 'ATGACCatcg';

//TEST2: white spaces and new lines
export const seq2TestInvalicCharacters =  `
ATGA    CCa
tcg`;
export const seq2ContainsInvalidCharacters = false; //white spaces are removed but no user warning for invalid characters
export const seq2WithoutInvalidCharacters = 'ATGACCatcg';

//TEST3: white spaces, new lines AND invalid characters
export const seq3TestInvalicCharacters =  `
ATGgggA    CCa3
tcbg`;
export const seq3ContainsInvalidCharacters = true;
export const seq3WithoutInvalidCharacters = 'ATGgggACCatcg';

//---------------TEST handleLowerCaseAndRnaInput---------------
//TEST1: only upper case DNA sequence
export const seq1TestLowerCase = 'ATGAAACCCCGG';
export const seq1UpperCase = 'ATGAAACCCCGG';

//TEST2: lower case DNA sequence
export const seq2TestLowerCase = 'gcgat';
export const seq2UpperCase = 'GCGAT';

//TEST3: lower and upper case DNA sequence
export const seq3TestLowerCase = 'GCAAgat';
export const seq3UpperCase = 'GCAAGAT';

//TEST4: DNA seq containing only letters ATGC
export const seq4TestRna = 'TACGTTAC';
export const seq4DnaOnly = 'TACGTTAC';

//TEST5: RNA seq containing only letters AUGC
export const seq5TestRna = 'UACGUAC';
export const seq5DnaOnly = 'TACGTAC';

//TEST6: seq containing letters ATGC AND U
//not handled as a special case -> All 'U's replaced by 'T's
export const seq6TestRna = 'TTTUUUACGUAC';
export const seq6DnaOnly = 'TTTTTTACGTAC';

//---------------TEST handleSeqNotDivisibleBy3---------------
//TEST1: sequence divisible by 3
export const seq1TestDivBy3 = 'ATGGAACCC';
export const seq1AmountOfCharactersToBeRemoved = 0;
export const seq1DivisibleBy3 = 'ATGGAACCC'; //no characters removed

//TEST2: sequence not divisible by 3
export const seq2TestDivBy3 = 'ATGGAACC';
export const seq2AmountOfCharactersToBeRemoved = 2;
export const seq2DivisibleBy3 = 'ATGGAA'; //2 characters removed at the end of the sequence

//TEST3: sequence not divisible by 3
export const seq3TestDivBy3 = 'GGGAAACCCTTTG';
export const seq3AmountOfCharactersToBeRemoved = 1;
export const seq3DivisibleBy3 = 'GGGAAACCCTTT'; //1 character removed at the end of the sequence

//---------------TEST handleInput---------------
//The ORDER of the different functions matters for cleaning the Sequence (covered by TEST3-6)
//TEST1: pure DNA upper case Seq, divisible by 3
export const seq1TestInputHandling = 'ATGCAAGATTACTTT';
export const seq1Cleaned = 'ATGCAAGATTACTTT';
export const seq1UserInputWarning = '';

//TEST2: DNA lower case Seq, multi fasta format
export const seq2TestInputHandling = `
>fasta header one
atg  
>fasta header two
tttccc
ggg
>fasta header three
aaa`;
export const seq2Cleaned = 'ATGTTTCCCGGGAAA';
export const seq2UserInputWarning = '';

//TEST3: empty input, only white spaces
export const seq3TestInputHandling = `
    
  
`;
export const seq3Cleaned = undefined;
export const seq3UserInputWarning = undefined;


//TEST4: DNA/RNA fasta 
//containing white spaces & invalid characters, upper&lower characters, 
//Seq not div by 3 + does not start with atg -> all 3 Warnings
export const seq4TestInputHandling = `
>2345
TttU
  uuAa5`;
export const seq4Cleaned = 'TTTTTT';
export const seq4UserInputWarning = 'Your sequence contains characters other than ATGC/AUGC which will be ignored. Your gene sequence is not divisible by 3. Therefore, the last 2 bases will be ignored. Your sequence does not start with a start codon. Are you sure you want to continue?';

//TEST5: RNA
//containing white spaces & invalid characters, upper&lower characters, 
//Seq div by 3 + starts with an AUG 
//-> 1 Warning (invalid characters)
export const seq5TestInputHandling = `
>234
AUG
  5aaa`;
export const seq5Cleaned = 'ATGAAA';
export const seq5UserInputWarning = 'Your sequence contains characters other than ATGC/AUGC which will be ignored.';