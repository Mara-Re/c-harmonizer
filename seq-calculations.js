const {aminoDict, allCodons, codonAaDict, emptyCodonCountObj} = require('./codons');


//----------------FOR TESTING------------------------------

const {
    FASwoIntrons, 
    MSASwoIntrons,
    exDNA1WoAtgStartWStopCodons
}                       = require('./dna-examples');
//------------^^^^FOR TESTING------------------------------


function calcCodonScoreDict(refGene) {
    const codonArr = splitDnaIntoCodons(refGene);
    const codonCounts = countAllCodons(codonArr);
    const rcaScores = calcRelCodonAdaptScores(codonCounts);

    let scoreDict = {};
    for (const aA in aminoDict) {             
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
        const aA = codonAaDict[codon]; 
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
    let codonCounts = {...emptyCodonCountObj}; 
    
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

        rcaScores = aminoDict[aA].reduce((acc, el) => {
            if (countOfMostFrequentCodon == 0) {
                return {...acc, [el] : 1};
            } else {
                const rcaScore = codonCounts[el] / countOfMostFrequentCodon;
                return {...acc, [el] : rcaScore};
            }
        }, {...rcaScores});
    }
    
    return rcaScores;
}


//---------------EXPORTS FOR TESTING---------------
// module.exports.splitDnaIntoCodons = splitDnaIntoCodons;
// module.exports.countAllCodons = countAllCodons;
// module.exports.calcRelCodonAdaptScores = calcRelCodonAdaptScores;
// module.exports.translateDna = translateDna;
