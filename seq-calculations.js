const {aminoDict, allCodons, codonAaDict} = require('./codons');


//----------------FOR TESTING------------------------------
const {
    FASwoIntrons, 
    MSASwoIntrons,
    exDNA1WoAtgStartWStopCodons
}                       = require('./dna-examples');
//------------^^^^FOR TESTING------------------------------


function calcCodonScoreDict(refGene) {
    console.log('refGene: ', refGene);
    const codonArr = splitDnaIntoCodons(refGene);
    const codonCounts = countAllCodons(codonArr);
    const codonScores = calcCodonScores(codonCounts);

    let scoreDict = {};
    for (aA in aminoDict) {             //also requires aminoDict
        let obj = {};
        for (let i = 0; i < aminoDict[aA].length; i++) {
            let codon = aminoDict[aA][i];
            obj[codon] = codonScores[codon];
        }
        scoreDict[aA] = obj;
    }
    console.log('scoreDict: ', scoreDict);
    return scoreDict;
}

function calcGeneScore(gene, sourceCodonScores) {
    const codonArr = splitDnaIntoCodons(gene);

    const geneScoreArray = codonArr.map(codon => {
        const aA = codonAaDict[codon];
        return sourceCodonScores[aA][codon];
    });
    console.log('geneScoreArray: ', geneScoreArray);
    return geneScoreArray;
}

function calcHarmonizedGeneSeq(gene, geneScoreSource, targetCodonScores) {
    const codonArr = splitDnaIntoCodons(gene);    
    
    const harmonizedSeqArr = codonArr.map((codon, i) => {
        let bestCodon;
        let bestCodonDiff = 1;
        const aA = codonAaDict[codon];  //also requires codonAaDict
        for (codonKey in targetCodonScores[aA]) {
            if (Math.abs(targetCodonScores[aA][codonKey] - geneScoreSource[i]) < bestCodonDiff) {
                bestCodonDiff = Math.abs(targetCodonScores[aA][codonKey] - geneScoreSource[i]);
                bestCodon = codonKey;
                console.log('bestCodonDiff: ', bestCodonDiff);
                console.log('bestCodon: ', bestCodon);
            }
        }
        return bestCodon;
    });

    return harmonizedSeqArr.join('');
}

module.exports.calcCodonScoreDict = calcCodonScoreDict;
module.exports.calcHarmonizedGeneSeq = calcHarmonizedGeneSeq;
module.exports.calcGeneScore = calcGeneScore;



function splitDnaIntoCodons(dnaStr) {      
    const codonArr = dnaStr.replace(/\s/g,"").match(/.{1,3}/g); //ignore white spaces & split into blocks of 3 characters
    
    // console.log('codonArr: ', codonArr);
    // ["ATG", "TCT", "ACT", "GTA", ...]
    //Test: length of codonArr should be length of input after removing white spaces devided by 3
    
    return codonArr;
}

function countAllCodons(codonArr) {
    var codonCounts = {};  
    for (var j = 0; j < allCodons.length; j++) {     //also requires array const allCodons
        codonCounts[allCodons[j]] = 0;
    }
    for (var i = 0; i < codonArr.length; i++) {
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
    //Test: codonCounts should contain all 64 codons!
    //Test: adding all codonCounts together should be equal the length of codonArr

    return codonCounts;
}

// function addCodonScoresToAminoDict(codonScores) {
//     var aminoDictScore = {};
//     for (aA in aminoDict) {             //also requires aminoDict
//         var obj = {};
//         for (var i = 0; i < aminoDict[aA].length; i++) {
//             var codon = aminoDict[aA][i];
//             obj[codon] = codonScores[codon];
//         }
//         aminoDictScore[aA] = obj
//     }
//     // console.log('aminoDictScore: ', aminoDictScore);

        // { A: {  GCA: 0.07647058823529412,
        //         GCC: 0.48823529411764705,
        //         GCG: 0.041176470588235294,
        //         GCT: 0.3941176470588235 },
        //   C: { TGC: 0.7058823529411765, 
        //         TGT: 0.29411764705882354 },
        //   D: { GAC: 0.49, GAT: 0.51 },
        //    ...
        // }
        //Test: within one amino acid -> the sum of all values should be 1

//     return aminoDictScore;
// }

function calcCodonScores(codonCounts) {        //also requires aminoDict
    // console.log('codonCounts: ', codonCounts);
    var codonScores = {};
    for (aA in aminoDict) {     //looping through all amino acids
        var codonSumPerAa = 0
        for  (var i = 0; i < aminoDict[aA].length; i++) {      //first loop to determine amount of codons encoding one spedific amino acid
            codonSumPerAa += codonCounts[aminoDict[aA][i]];  //codonCounts of the current amino acid
        }
        // console.log('aA & codonSumPerAa: ', aA, codonSumPerAa);
        for  (var i = 0; i < aminoDict[aA].length; i++) {       //second loop to determine score of each of the codons
            codonScores[aminoDict[aA][i]] = codonCounts[aminoDict[aA][i]] / codonSumPerAa;
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

//TRANSLATE DNA
function translateDna(codonAaDict, codonArr) {
    const translatedDna = codonArr.reduce((translStr, codon) => {
        return translStr += codonAaDict[codon];
    }, '');
    // console.log('translatedDna: ', translatedDna);
    return translatedDna;
}

//SCORE ARRAY for geneOfInterest depending on the codonScores of SOURCE ORGANISM
function getGeneScoreArray(codonArr, codonScores) {
    var geneScoreArray = [];
    for (var i = 0; i < codonArr.length; i++) {
        geneScoreArray.push(codonScores[codonArr[i]]);
    }
    // console.log('geneScoreArray: ', geneScoreArray);
    return geneScoreArray;
}

//SMOOTHED SCORE ARRAY
// function getSmoothedScoreArray(geneScoreArray, oddNrOfCodonsForMean) {
//     var smoothedScoreArr = [];
//     var plusMinus = (oddNrOfCodonsForMean - 1) / 2;
//     for (var i = 0; i < geneScoreArray.length; i++) {
//         if (i < plusMinus|| i >= geneScoreArray.length - plusMinus) {
//             smoothedScoreArr.push('');
//         } else {
//             var partialArrOfScores = geneScoreArray.slice(i - plusMinus, i + plusMinus + 1);
//             //partialArrOfScores.length should always equal oddNrOfCodonsForMean!
//             var sumOfScores = partialArrOfScores.reduce((mean, score) => {
//                 return mean + score;
//             });          
            
//             smoothedScoreArr.push(sumOfScores / oddNrOfCodonsForMean);
//         }
//     }
//     // console.log('smoothedScoreArr: ', smoothedScoreArr);
//     // console.log('joined smoothedScoreArr: ', smoothedScoreArr.join(' '));
//     return smoothedScoreArr;
// }





//////////amino dict COUNTS
// console.log('aminoDictCounts: ', aminoDictCounts);  //COUNTS OR SCORES???
    // { A: { GCA: 13, GCC: 83, GCG: 7, GCT: 67 },
    //   C: { TGC: 12, TGT: 5 },
    //   D: { GAC: 49, GAT: 51 },
    //   E: { GAA: 37, GAG: 100 },
    //   ...
    // }
    //Test: aminoDictCounts should contain all amino acids
    //Test: aminoDictCounts should contain all codons
    //Test: adding all counts in aminoDictCounts together should be equal to length of codonArr


//---------------EXPORTS FOR TESTING---------------
module.exports.splitDnaIntoCodons = splitDnaIntoCodons;
module.exports.countAllCodons = countAllCodons;
module.exports.calcCodonScores = calcCodonScores;
module.exports.translateDna = translateDna;
module.exports.getGeneScoreArray = getGeneScoreArray;
