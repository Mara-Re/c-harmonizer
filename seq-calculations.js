const {aminoDict, allCodons, codonAaDict, emptyCodonCountObj} = require('./codons');


//----------------FOR TESTING------------------------------

const {
    FASwoIntrons, 
    MSASwoIntrons,
    exDNA1WoAtgStartWStopCodons
}                       = require('./dna-examples');
//------------^^^^FOR TESTING------------------------------


function calcCodonScoreDict(refGene) {
    // console.log('refGene: ', refGene);
    const codonArr = splitDnaIntoCodons(refGene);
    const codonCounts = countAllCodons(codonArr);
    const rcaScores = calcRelCodonAdaptScores(codonCounts);

    let scoreDict = {};
    for (const aA in aminoDict) {             //also requires aminoDict
        let obj = {};
        for (let i = 0; i < aminoDict[aA].length; i++) {
            let codon = aminoDict[aA][i];
            obj[codon] = rcaScores[codon];
        }
        scoreDict[aA] = obj;
    }
    // console.log('scoreDict: ', scoreDict);

    // { A: {  GCA: 0.07647058823529412,
    //         GCC: 0.48823529411764705,
    //         GCG: 0.041176470588235294,
    //         GCT: 0.3941176470588235 },
    //   C: { TGC: 0.7058823529411765, 
    //         TGT: 0.29411764705882354 },
    //   D: { GAC: 0.49, GAT: 0.51 },
    //    ...
    // }
    console.log('scoreDict: ', scoreDict);
    return scoreDict;
}

function calcGeneScore(gene, refCodonScoresDict) {
    // console.log('codon scores: ', refCodonScoresDict);
    const codonArr = splitDnaIntoCodons(gene);

    const geneScoreArray = codonArr.map(codon => {
        const aA = codonAaDict[codon];
        return refCodonScoresDict[aA][codon];
    });
    // console.log('geneScoreArray: ', geneScoreArray);
    return geneScoreArray;
}

function calcHarmonizedGeneSeq(gene, geneScoreSource, targetCodonScores) {
    const codonArr = splitDnaIntoCodons(gene);    
    
    const harmonizedSeqArr = codonArr.map((codon, i) => {
        let bestCodon;
        let bestCodonDiff = 1;
        const aA = codonAaDict[codon];  //also requires codonAaDict
        for (const codonKey in targetCodonScores[aA]) {
            if (Math.abs(targetCodonScores[aA][codonKey] - geneScoreSource[i]) < bestCodonDiff) {
                bestCodonDiff = Math.abs(targetCodonScores[aA][codonKey] - geneScoreSource[i]);
                bestCodon = codonKey;
                // console.log('bestCodonDiff: ', bestCodonDiff);
                // console.log('bestCodon: ', bestCodon);
            }
        }
        return bestCodon;
    });

    return harmonizedSeqArr.join('');
}

//SMOOTHED SCORE ARRAY
function calcSmoothedScore(geneScoreArray) {
    let smoothedScoreArr = [];
    let plusMinus = (19 - 1) / 2;
    for (let i = 0; i < geneScoreArray.length; i++) {
        if (i < plusMinus|| i >= geneScoreArray.length - plusMinus) {
            smoothedScoreArr.push(null);
        } else {
            let partialArrOfScores = geneScoreArray.slice(i - plusMinus, i + plusMinus + 1);
            //partialArrOfScores.length should always equal 19!
            let sumOfScores = partialArrOfScores.reduce((mean, score) => {
                return mean + score;
            });          
            
            smoothedScoreArr.push(sumOfScores / 19);
        }
    }
    // console.log('smoothedScoreArr: ', smoothedScoreArr);
    // console.log('joined smoothedScoreArr: ', smoothedScoreArr.join(' '));
    return smoothedScoreArr;
}

module.exports.calcCodonScoreDict = calcCodonScoreDict;
module.exports.calcHarmonizedGeneSeq = calcHarmonizedGeneSeq;
module.exports.calcGeneScore = calcGeneScore;
module.exports.calcSmoothedScore = calcSmoothedScore;


function splitDnaIntoCodons(dnaStr) {      
    const codonArr = dnaStr.replace(/\s/g,"").match(/.{1,3}/g); //ignore white spaces & split into blocks of 3 characters
    // console.log('codonArr: ', codonArr);
    // ["ATG", "TCT", "ACT", "GTA", ...]    
    return codonArr;
}

function countAllCodons(codonArr) {
    let codonCounts = {...emptyCodonCountObj};  //also requires emptyCodonCountObj
    
    for (let i = 0; i < codonArr.length; i++) {
        codonCounts[codonArr[i]] += 1;
    }
    // console.log("codonCounts Object: ", codonCounts);    
    // { 
    //     AAA: 6,
    //     AAC: 56,
    //     AAG: 119,
    //     AAT: 13,
    //     ACA: 10,
    //     ACC: 51,
    //     ...
    // } 

    return codonCounts;
}

function calcCodonScores(codonCounts) {        //also requires aminoDict
    // console.log('codonCounts: ', codonCounts);
    let codonScores = {};
    for (const aA in aminoDict) {     //looping through all amino acids
        let codonSumPerAa = 0
        for  (let i = 0; i < aminoDict[aA].length; i++) {      //first loop to determine amount of codons encoding one spedific amino acid
            codonSumPerAa += codonCounts[aminoDict[aA][i]];  //codonCounts of the current amino acid
        }
        // console.log('aA & codonSumPerAa: ', aA, codonSumPerAa);
        for  (let i = 0; i < aminoDict[aA].length; i++) {       //second loop to determine score of each of the codons
            if (codonSumPerAa == 0) {       //if the amino acid was never encoded
                codonScores[aminoDict[aA][i]] = 0;  //set all scores to 0 --
                //???? OR SET TO 1/(NR of CODONS)????
            } else {
                codonScores[aminoDict[aA][i]] = codonCounts[aminoDict[aA][i]] / codonSumPerAa;
            }
        }        
    }
    
    // console.log('codonScores: ', codonScores); //OK
    // {   GCA: 0.07647058823529412,
    //     GCC: 0.48823529411764705,
    //     GCG: 0.041176470588235294,
    //     GCT: 0.3941176470588235,
    //     ...
    // }

    return codonScores;
}

function calcRelCodonAdaptScores (codonCounts) { //also requires aminoDict
    let rcaScores; 
    for (const aA in aminoDict) {     //looping through all amino acids
       
        const countOfMostFrequentCodon = aminoDict[aA].reduce((acc, el) => {
            if (codonCounts[el] > acc) {
                return codonCounts[el];
            } else {
                return acc;
            }
        }, 0);

        console.log('countOfMostFrequentCodon: ', countOfMostFrequentCodon);

        rcaScores = aminoDict[aA].reduce((acc, el) => {
            if (countOfMostFrequentCodon == 0) {
                return {...acc, [el] : 1};
            } else {
                const rcaScore = codonCounts[el] / countOfMostFrequentCodon;
                return {...acc, [el] : rcaScore};
            }
        }, {...rcaScores});

        // for (let i = 0; i < aminoDict[aA].length; i++) {
        //     if (countOfMostFrequentCodon == 0) {       //if the amino acid was never encoded
        //         relCodonAdaptScores[aminoDict[aA][i]] = 1;  //set all scores to 1 
        //     } else {
        //         relCodonAdaptScores[aminoDict[aA][i]] = codonCounts[aminoDict[aA][i]] / countOfMostFrequentCodon;
        //     }

        // }

        // for  (let i = 0; i < aminoDict[aA].length; i++) {      //first loop to determine amount of codons encoding one spedific amino acid
        //     codonSumPerAa += codonCounts[aminoDict[aA][i]];  //codonCounts of the current amino acid
        // }
        // console.log('aA & codonSumPerAa: ', aA, codonSumPerAa);
        // for  (let i = 0; i < aminoDict[aA].length; i++) {       //second loop to determine score of each of the codons
        //     if (codonSumPerAa == 0) {       //if the amino acid was never encoded
        //         codonScores[aminoDict[aA][i]] = 0;  //set all scores to 0 --
        //         //???? OR SET TO 1/(NR of CODONS)????
        //     } else {
        //         codonScores[aminoDict[aA][i]] = codonCounts[aminoDict[aA][i]] / codonSumPerAa;
        //     }
        // }        
    }
    console.log('rcaScores: ', rcaScores);
    return rcaScores;
}

//TRANSLATE DNA
function translateDna(codonAaDict, codonArr) {
    const translatedDna = codonArr.reduce((translStr, codon) => {
        return translStr += codonAaDict[codon];
    }, '');
    // console.log('translatedDna: ', translatedDna);
    return translatedDna;
}




//---------------EXPORTS FOR TESTING---------------
module.exports.splitDnaIntoCodons = splitDnaIntoCodons;
module.exports.countAllCodons = countAllCodons;
// module.exports.calcCodonScores = calcCodonScores;
// module.exports.calcRelCodonAdaptScores = calcRelCodonAdaptScores;
// module.exports.translateDna = translateDna;
