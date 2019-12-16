const allCodons = [    
    "AAA", "AAC", "AAG", "AAT", "ACA", "ACC", "ACG", "ACT", 
    "AGA", "AGC", "AGG", "AGT", "ATA", "ATC", "ATG", "ATT", 
    "CAA", "CAC", "CAG", "CAT", "CCA", "CCC", "CCG", "CCT", 
    "CGA", "CGC", "CGG", "CGT", "CTA", "CTC", "CTG", "CTT", 
    "GAA", "GAC", "GAG", "GAT", "GCA", "GCC", "GCG", "GCT", 
    "GGA", "GGC", "GGG", "GGT", "GTA", "GTC", "GTG", "GTT", 
    "TAA", "TAC", "TAG", "TAT", "TCA", "TCC", "TCG", "TCT", 
    "TGA", "TGC", "TGG", "TGT", "TTA", "TTC", "TTG", "TTT"
];

const aminoDict = {
    "A": ["GCA","GCC","GCG","GCT"],
    "C": ["TGC","TGT"],
    "D": ["GAC", "GAT"],
    "E": ["GAA","GAG"],
    "F": ["TTC","TTT"],
    "G": ["GGA","GGC","GGG","GGT"],
    "H": ["CAC","CAT"],
    "I": ["ATA","ATC","ATT"],
    "K": ["AAA","AAG"],
    "L": ["CTA","CTC","CTG","CTT","TTA","TTG"],
    "M": ["ATG"],
    "N": ["AAC","AAT"],
    "P": ["CCA","CCC","CCG","CCT"],
    "Q": ["CAA","CAG"],
    "R": ["AGA","AGG","CGA","CGC","CGG","CGT"],
    "S": ["AGC","AGT","TCA","TCC","TCG","TCT"],
    "T": ["ACA","ACC","ACG","ACT"],
    "V": ["GTA","GTC","GTG","GTT"],
    "W": ["TGG"],
    "Y": ["TAC","TAT"],

    // '_' REPRESENTS STOP CODON -> CONVENTION??
    "_": ["TAG", "TAA", "TGA"]      
};

const codonAaDict       = createCodonAminoDict(aminoDict);

function createCodonAminoDict(aminoDict) {
    let codonAaDict = {};
    let nrOfCodons = 0;
    for (aA in aminoDict) {
        for (let i = 0; i < aminoDict[aA].length; i++) {
            let codon = aminoDict[aA][i];
            codonAaDict[codon] = aA;
            nrOfCodons += 1;
        }
    }
    // console.log(codonAaDict);
    // console.log('nrOfCodons: ', nrOfCodons);
    return codonAaDict;
}


module.exports.allCodons = allCodons;
module.exports.aminoDict = aminoDict;
module.exports.codonAaDict = codonAaDict;