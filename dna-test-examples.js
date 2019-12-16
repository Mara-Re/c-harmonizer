
const dna1 = 'ATGATCCACACAGCCCTGGAGGATTTGCTCAGCTCCCCACCCCATCCCCCAGACGACTTACAGTGA';
const dna2 = `ATGCGTCCG   GAAGTTGAACAAGAGCTT      GCTCACACCTTGTT
 GGTGGAGCTG`;


//All codons once:
const dna3 = `AAA AACAAG AAT ACA ACC ACG ACT 
AGA AGC AGG AGT ATA ATC ATG ATT 
CAA CAC CAG CAT CCA CCC CCG CCT 
CGA CGC CGGCGT CTA CTC CTG CTT 
GAA GAC GAG GAT GCA GCC GCG GCT 
GGA GGC GGG GGT GTA GTC GTG GTT 
TAA TAC TAG TAT TCA TCC TCG TCT 
TGA TGC TGG TGT TTATTC TTG TTT`


module.exports.dna1 = dna1;
module.exports.dna2 = dna2;
module.exports.dna3 = dna3;



//CODON ARRAYS:

const codonArr1 = ['ATG','ATC','GGT','GGT', 'GGT', 'GGT', 'GGT' ];
//ALL codons once: 
const codonArr2 = [    
    "AAA", "AAC", "AAG", "AAT", "ACA", "ACC", "ACG", "ACT", 
    "AGA", "AGC", "AGG", "AGT", "ATA", "ATC", "ATG", "ATT", 
    "CAA", "CAC", "CAG", "CAT", "CCA", "CCC", "CCG", "CCT", 
    "CGA", "CGC", "CGG", "CGT", "CTA", "CTC", "CTG", "CTT", 
    "GAA", "GAC", "GAG", "GAT", "GCA", "GCC", "GCG", "GCT", 
    "GGA", "GGC", "GGG", "GGT", "GTA", "GTC", "GTG", "GTT", 
    "TAA", "TAC", "TAG", "TAT", "TCA", "TCC", "TCG", "TCT", 
    "TGA", "TGC", "TGG", "TGT", "TTA", "TTC", "TTG", "TTT"
]

module.exports.codonArr1 = codonArr1;
module.exports.codonArr2 = codonArr2;


//CODON COUNT Objects
//      COUNT   SCORE
//AGA:  2       0.1
//AGG:  3       0.15
//CGA:  7       0.35
//CGC:  1       0.05
//CGG:  2       0.1
//CGT:  5       0.25

//GGA:  2       0.2
//GGC:  0       0
//GGG:  3       0.3
//GGT:  5       0.5
const countObj1 = { 
    AAA: 0,
    AAC: 0,
    AAG: 0,
    AAT: 0,
    ACA: 0,
    ACC: 0,
    ACG: 0,
    ACT: 0,
    AGA: 2,
    AGC: 0,
    AGG: 3,
    AGT: 0,
    ATA: 0,
    ATC: 0,
    ATG: 0,
    ATT: 0,
    CAA: 0,
    CAC: 0,
    CAG: 0,
    CAT: 0,
    CCA: 0,
    CCC: 0,
    CCG: 0,
    CCT: 0,
    CGA: 7,
    CGC: 1,
    CGG: 2,
    CGT: 5,
    CTA: 0,
    CTC: 0,
    CTG: 0,
    CTT: 0,
    GAA: 0,
    GAC: 0,
    GAG: 0,
    GAT: 0,
    GCA: 0,
    GCC: 0,
    GCG: 0,
    GCT: 0,
    GGA: 2,
    GGC: 0,
    GGG: 3,
    GGT: 5,
    GTA: 0,
    GTC: 0,
    GTG: 0,
    GTT: 0,
    TAA: 0,
    TAC: 0,
    TAG: 0,
    TAT: 0,
    TCA: 0,
    TCC: 0,
    TCG: 0,
    TCT: 0,
    TGA: 0,
    TGC: 0,
    TGG: 0,
    TGT: 0,
    TTA: 0,
    TTC: 0,
    TTG: 0,
    TTT: 0 
};

//GCA   1       1
//TGC   1       1
//GAC   1       1
//GAA   1       1
//TTC   1       1
//GGA   1       1
//AAA   1       1
//ATG   1       1
//AAC   1       1
//CCA   1       1
//CAA   1       1
//AGC   1       1
//ACA   1       1
//GTA   1       1
//TAC   1       1

//TGG   0       0

//AGG   1       0.5
//CGA   1       0.5
//CAC   100     1
//ATT   900     1
//CTC   2       1

const countObj2 = { 
    AAA: 1,
    AAC: 1,
    AAG: 0,
    AAT: 0,
    ACA: 1,
    ACC: 0,
    ACG: 0,
    ACT: 0,
    AGA: 0,
    AGC: 1,
    AGG: 1,
    AGT: 0,
    ATA: 0,
    ATC: 0,
    ATG: 1,
    ATT: 900,
    CAA: 1,
    CAC: 100,
    CAG: 0,
    CAT: 0,
    CCA: 1,
    CCC: 0,
    CCG: 0,
    CCT: 0,
    CGA: 1,
    CGC: 0,
    CGG: 0,
    CGT: 0,
    CTA: 0,
    CTC: 2,
    CTG: 0,
    CTT: 0,
    GAA: 1,
    GAC: 1,
    GAG: 0,
    GAT: 0,
    GCA: 1,
    GCC: 0,
    GCG: 0,
    GCT: 0,
    GGA: 1,
    GGC: 0,
    GGG: 0,
    GGT: 0,
    GTA: 1,
    GTC: 0,
    GTG: 0,
    GTT: 0,
    TAA: 0,
    TAC: 1,
    TAG: 0,
    TAT: 0,
    TCA: 0,
    TCC: 0,
    TCG: 0,
    TCT: 0,
    TGA: 0,
    TGC: 1,
    TGG: 0,
    TGT: 0,
    TTA: 0,
    TTC: 1,
    TTG: 0,
    TTT: 0 
};

module.exports.countObj1 = countObj1;
module.exports.countObj2 = countObj2;


//TEST INPUTS FOR calcGeneScore

//AGA:  2       0.1
//AGG:  3       0.15
//CGA:  7       0.35
//CGC:  1       0.05
//CGG:  2       0.1
//CGT:  5       0.25

//GGA:  2       0.2
//GGC:  0       0
//GGG:  3       0.3
//GGT:  5       0.5

const gene1 = `AAAAACAAGAATACAACCACGACTAGA  AGCAGG   AGTATAATCATGATTCAACACCAGCATCCACCCCCGCCTCGA   CGC   CGG  CGT   CTACTCCTGCTTGAAGACGAGGATGCAGCCGCGGCTGGA  GGCGGG  GGT  GTAGTCGTGGTTTAATACTAGTATTCATCCTCGTCTTGATGCTGGTGTTTATTCTTGTTT`
const scoreDict1 = { 
    A: { GCA: 0, GCC: 0, GCG: 0, GCT: 0 },
    C: { TGC: 0, TGT: 0 },
    D: { GAC: 0, GAT: 0 },
    E: { GAA: 0, GAG: 0 },
    F: { TTC: 0, TTT: 0 },
    G: { GGA: 0.2, GGC: 0, GGG: 0.3, GGT: 0.5 },
    H: { CAC: 0, CAT: 0 },
    I: { ATA: 0, ATC: 0, ATT: 0 },
    K: { AAA: 0, AAG: 0 },
    L: { CTA: 0, CTC: 0, CTG: 0, CTT: 0, TTA: 0, TTG: 0 },
    M: { ATG: 0 },
    N: { AAC: 0, AAT: 0 },
    P: { CCA: 0, CCC: 0, CCG: 0, CCT: 0 },
    Q: { CAA: 0, CAG: 0 },
    R: { AGA: 0.1, AGG: 0.15, CGA: 0.35, CGC: 0.05, CGG: 0.1, CGT: 0.25 },
    S: { AGC: 0, AGT: 0, TCA: 0, TCC: 0, TCG: 0, TCT: 0 },
    T: { ACA: 0, ACC: 0, ACG: 0, ACT: 0 },
    V: { GTA: 0, GTC: 0, GTG: 0, GTT: 0 },
    W: { TGG: 0 },
    Y: { TAC: 0, TAT: 0 },
    _: { TAG: 0, TAA: 0, TGA: 0 } 
};

module.exports.gene1 = gene1;
module.exports.scoreDict1 = scoreDict1;


//TEST REF GENES FOR calcCodonScoreDict
//AGA:  4       0.2
//AGG:  3       0.15
//CGA:  7       0.35
//CGC:  1       0.05
//CGG:  0       0
//CGT:  5       0.25

//GGA:  1       0.1
//GGC:  1       0.1
//GGG:  3       0.3
//GGT:  5       0.5

const refGene1 = 'AGA AGA AGA AGA AGG AGG AGG CGA CGA CGA CGA CGA CGA CGA CGC CGT CGT CGT CGT CGT GGA GGC GGG GGG GGG GGT GGT GGT GGT GGT';

module.exports.refGene1 = refGene1;




// const codonArr3 = [
//     'AAA','AAC','AAG','AAT','ACA','ACC','ACG','ACT','AGA',  
//     'AGC','AGG','AGT','ATA','ATC','ATG','ATT','CAA','CAC',
//     'CAG','CAT','CCA','CCC','CCG','CCT','CGA','CGC','CGG',
//     'CGT','CTA','CTC','CTG','CTT','GAA','GAC','GAG','GAT',
//     'GCA','GCC','GCG','GCT','GGA','GGC','GGG','GGT','GTA',
//     'GTC','GTG','GTT','TAA','TAC','TAG','TAT','TCA','TCC',
//     'TCG','TCT','TGA','TGC','TGG','TGT','TTA','TTC','TTG','TTT'];
// const scoreObj1 = { 
//     AAA: 0,
//     AAC: 0,
//     AAG: 0,
//     AAT: 0,
//     ACA: 0,
//     ACC: 0,
//     ACG: 0,
//     ACT: 0,
//     AGA: 0.1,
//     AGC: 0,
//     AGG: 0.15,
//     AGT: 0,
//     ATA: 0,
//     ATC: 0,
//     ATG: 0,
//     ATT: 0,
//     CAA: 0,
//     CAC: 0,
//     CAG: 0,
//     CAT: 0,
//     CCA: 0,
//     CCC: 0,
//     CCG: 0,
//     CCT: 0,
//     CGA: 0.35,
//     CGC: 0.05,
//     CGG: 0.1,
//     CGT: 0.25,
//     CTA: 0,
//     CTC: 0,
//     CTG: 0,
//     CTT: 0,
//     GAA: 0,
//     GAC: 0,
//     GAG: 0,
//     GAT: 0,
//     GCA: 0,
//     GCC: 0,
//     GCG: 0,
//     GCT: 0,
//     GGA: 0.2,
//     GGC: 0,
//     GGG: 0.3,
//     GGT: 0.5,
//     GTA: 0,
//     GTC: 0,
//     GTG: 0,
//     GTT: 0,
//     TAA: 0,
//     TAC: 0,
//     TAG: 0,
//     TAT: 0,
//     TCA: 0,
//     TCC: 0,
//     TCG: 0,
//     TCT: 0,
//     TGA: 0,
//     TGC: 0,
//     TGG: 0,
//     TGT: 0,
//     TTA: 0,
//     TTC: 0,
//     TTG: 0,
//     TTT: 0 
// };
