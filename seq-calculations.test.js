const {aminoDict, allCodons, codonAaDict} = require('./codons');
const {
    splitDnaIntoCodons,
    countAllCodons,
    calcRelCodonAdaptScores,
    calcCodonScoreDict,
    calcHarmonizedGeneSeq,
    calcGeneScore
} = require('./seq-calculations');

const ex = require('./seq-calculations-dna-test-examples');

test('input seqence is correctly split into codons, ignoring whitespaces', () => {
    const codonArr1 = splitDnaIntoCodons(ex.dna1);
    const codonArr2 = splitDnaIntoCodons(ex.dna2);
    const codonArr3 = splitDnaIntoCodons(ex.dna3);

    expect(codonArr1).toStrictEqual(ex.dna1SplitIntoCodons);
    expect(codonArr2).toStrictEqual(ex.dna2SplitIntoCodons);
    expect(codonArr3).toStrictEqual(ex.dna3SplitIntoCodons);
});

test('codons are correctly counted', () => {
    const countsObj1 = countAllCodons(ex.codonArr1);
    const countsObj2 = countAllCodons(ex.codonArr2);

    expect(countsObj1).toStrictEqual(ex.codonArr1CodonCounts);
    expect(countsObj2).toStrictEqual(ex.codonArr2CodonCounts);
    
    //Test: adding all codonCounts together should be equal the length of codonArr
});

test('codon scores are correctly calculated', () => {
    const scoreObj1 = calcRelCodonAdaptScores(ex.countObj1);
    const scoreObj2 = calcRelCodonAdaptScores(ex.countObj2);
    const scoreObj3 = calcRelCodonAdaptScores(ex.countObj3);

    expect(scoreObj1).toStrictEqual(ex.countObj1Scores);
    expect(scoreObj2).toStrictEqual(ex.countObj2Scores);
    expect(scoreObj3).toStrictEqual(ex.countObj3Scores);
});


test('gene score is correctly calculated', () => {
    const geneScorrArr1 = calcGeneScore(ex.gene1, ex.scoreDict1);
    expect(geneScorrArr1).toStrictEqual(ex.geneScore1);
});

test('codon score dictionary is calculated correctly', () => {
    const scoreDict1 = calcCodonScoreDict(ex.refGene1);
    const scoreDict2 = calcCodonScoreDict(ex.refGene2);
    
    expect(scoreDict1).toStrictEqual(ex.scoreDictRefGene1);
});

test('harmonized gene is correctly calculated', () => {
    const harmonizedGene1 = calcHarmonizedGeneSeq(ex.seqToHarmonize1, ex.geneScoreSource1, ex.targetCodonScores1);
    const harmonizedGene2 = calcHarmonizedGeneSeq(ex.seqToHarmonize2, ex.geneScoreSource2, ex.targetCodonScores2);
    expect(harmonizedGene1).toStrictEqual(ex.harmonizedGene1);
    expect(harmonizedGene2).toStrictEqual(ex.harmonizedGene2);
});








