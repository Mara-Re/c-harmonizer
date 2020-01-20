const {aminoDict, allCodons, codonAaDict, emptyCodonCountObj} = require('./codons');

function calcCodonScoreDict(refGene) {
    const codonArr = splitDnaIntoCodons(refGene);
    const codonCounts = countAllCodons(codonArr);
    const rcaScores = calcRelCodonAdaptScores(codonCounts);

    let scoreDict = {};
    for (const aA in aminoDict) {             
        let codonScoresForAa = aminoDict[aA].reduce((codonScoresForAa, codon) => {
            return {...codonScoresForAa, [codon]: rcaScores[codon]};
        }, {});

        scoreDict[aA] = codonScoresForAa;
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
    return scoreDict;
}

function calcGeneScore(gene, refCodonScoresDict) {
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
        const aA = codonAaDict[codon]; 
        for (const codonKey in targetCodonScores[aA]) {
            if (Math.abs(targetCodonScores[aA][codonKey] - geneScoreSource[i]) < bestCodonDiff) {
                bestCodonDiff = Math.abs(targetCodonScores[aA][codonKey] - geneScoreSource[i]);
                bestCodon = codonKey;
            }
        }
        return bestCodon;
    });

    return harmonizedSeqArr.join('');
}

//SMOOTHED SCORE ARRAY
function calcSmoothedScore(geneScoreArray) {
    let plusMinus = (19 - 1) / 2;  //calculate mean score for 19 codons (9 codons upstream and 9 downstream)

    let smoothedScoreArr = geneScoreArray.map((score, codonPosition) => {
        if (codonPosition < plusMinus || codonPosition >= geneScoreArray.length - plusMinus) {
            return null;
        } else {
            const partialArrOfScores = geneScoreArray.slice(codonPosition - plusMinus, codonPosition + plusMinus + 1); 
            const sumOfScores = partialArrOfScores.reduce((sum, score) => {
                return sum + score;
            });                      
            const meanOfScores = sumOfScores / 19;
            return meanOfScores;
        }
    });
    // console.log('smoothedScoreArr: ', smoothedScoreArr);
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
    let codonCounts = {...emptyCodonCountObj}; 
    
    for (let codonPosition = 0; codonPosition < codonArr.length; codonPosition++) {
        codonCounts[codonArr[codonPosition]] += 1;
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

function calcRelCodonAdaptScores (codonCounts) { //also requires aminoDict
    let rcaScores; 
    for (const aA in aminoDict) {     //looping through all amino acids
       
        const countOfMostFrequentCodon = aminoDict[aA].reduce((countMostFrequent, codon) => {
            if (codonCounts[codon] > countMostFrequent) {
                return codonCounts[codon];
            } else {
                return countMostFrequent;
            }
        }, 0);

        rcaScores = aminoDict[aA].reduce((rcaScores, codon) => {
            if (countOfMostFrequentCodon == 0) {
                return {...rcaScores, [codon] : 1};
            } else {
                const rcaScore = codonCounts[codon] / countOfMostFrequentCodon;
                return {...rcaScores, [codon] : rcaScore};
            }
        }, {...rcaScores});
    }
    
    return rcaScores;
}


//---------------EXPORTS FOR TESTING---------------
module.exports.splitDnaIntoCodons = splitDnaIntoCodons;
module.exports.countAllCodons = countAllCodons;
module.exports.calcRelCodonAdaptScores = calcRelCodonAdaptScores;
