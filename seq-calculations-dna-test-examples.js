
//--------------------TEST splitDnaIntoCodons()--------------------
//String of different codons
module.exports.dna1 = 'ATGATCCACACAGCCCTGGAGGATTTGCTCAGCTCCCCACCCCATCCCCCAGACGACTTACAGTGA';
module.exports.dna1SplitIntoCodons = ['ATG','ATC','CAC','ACA','GCC','CTG','GAG','GAT','TTG','CTC','AGC','TCC','CCA','CCC','CAT','CCC','CCA','GAC','GAC','TTA','CAG','TGA'];

//String of codons containing white spaces
module.exports.dna2 = `ATGCGTCCG   GAAGTTGAACAAGAGCTT      GCTCACACCTTGTT
 GGTGGAGCTG`;
 module.exports.dna2SplitIntoCodons = ['ATG','CGT','CCG','GAA','GTT','GAA','CAA','GAG','CTT','GCT','CAC','ACC','TTG','TTG','GTG','GAG','CTG'];

//String containing all codons once:
module.exports.dna3 = `AAA AACAAG AAT ACA ACC ACG ACT 
AGA AGC AGG AGT ATA ATC ATG ATT 
CAA CAC CAG CAT CCA CCC CCG CCT 
CGA CGC CGGCGT CTA CTC CTG CTT 
GAA GAC GAG GAT GCA GCC GCG GCT 
GGA GGC GGG GGT GTA GTC GTG GTT 
TAA TAC TAG TAT TCA TCC TCG TCT 
TGA TGC TGG TGT TTATTC TTG TTT`;

module.exports.dna3SplitIntoCodons = [    
    "AAA", "AAC", "AAG", "AAT", "ACA", "ACC", "ACG", "ACT", 
    "AGA", "AGC", "AGG", "AGT", "ATA", "ATC", "ATG", "ATT", 
    "CAA", "CAC", "CAG", "CAT", "CCA", "CCC", "CCG", "CCT", 
    "CGA", "CGC", "CGG", "CGT", "CTA", "CTC", "CTG", "CTT", 
    "GAA", "GAC", "GAG", "GAT", "GCA", "GCC", "GCG", "GCT", 
    "GGA", "GGC", "GGG", "GGT", "GTA", "GTC", "GTG", "GTT", 
    "TAA", "TAC", "TAG", "TAT", "TCA", "TCC", "TCG", "TCT", 
    "TGA", "TGC", "TGG", "TGT", "TTA", "TTC", "TTG", "TTT"
];

//--------------------TEST countAllCodons--------------------
module.exports.codonArr1 = ['ATG','ATC','GGT','GGT', 'GGT', 'GGT', 'GGT' ];
module.exports.codonArr1CodonCounts = { 
    AAA: 0,
    AAC: 0,
    AAG: 0,
    AAT: 0,
    ACA: 0,
    ACC: 0,
    ACG: 0,
    ACT: 0,
    AGA: 0,
    AGC: 0,
    AGG: 0,
    AGT: 0,
    ATA: 0,
    ATC: 1,
    ATG: 1,
    ATT: 0,
    CAA: 0,
    CAC: 0,
    CAG: 0,
    CAT: 0,
    CCA: 0,
    CCC: 0,
    CCG: 0,
    CCT: 0,
    CGA: 0,
    CGC: 0,
    CGG: 0,
    CGT: 0,
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
    GGA: 0,
    GGC: 0,
    GGG: 0,
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
//ALL codons once: 
module.exports.codonArr2 = [    
    "AAA", "AAC", "AAG", "AAT", "ACA", "ACC", "ACG", "ACT", 
    "AGA", "AGC", "AGG", "AGT", "ATA", "ATC", "ATG", "ATT", 
    "CAA", "CAC", "CAG", "CAT", "CCA", "CCC", "CCG", "CCT", 
    "CGA", "CGC", "CGG", "CGT", "CTA", "CTC", "CTG", "CTT", 
    "GAA", "GAC", "GAG", "GAT", "GCA", "GCC", "GCG", "GCT", 
    "GGA", "GGC", "GGG", "GGT", "GTA", "GTC", "GTG", "GTT", 
    "TAA", "TAC", "TAG", "TAT", "TCA", "TCC", "TCG", "TCT", 
    "TGA", "TGC", "TGG", "TGT", "TTA", "TTC", "TTG", "TTT"
];
module.exports.codonArr2CodonCounts = { AAA: 1,
    AAC: 1,
    AAG: 1,
    AAT: 1,
    ACA: 1,
    ACC: 1,
    ACG: 1,
    ACT: 1,
    AGA: 1,
    AGC: 1,
    AGG: 1,
    AGT: 1,
    ATA: 1,
    ATC: 1,
    ATG: 1,
    ATT: 1,
    CAA: 1,
    CAC: 1,
    CAG: 1,
    CAT: 1,
    CCA: 1,
    CCC: 1,
    CCG: 1,
    CCT: 1,
    CGA: 1,
    CGC: 1,
    CGG: 1,
    CGT: 1,
    CTA: 1,
    CTC: 1,
    CTG: 1,
    CTT: 1,
    GAA: 1,
    GAC: 1,
    GAG: 1,
    GAT: 1,
    GCA: 1,
    GCC: 1,
    GCG: 1,
    GCT: 1,
    GGA: 1,
    GGC: 1,
    GGG: 1,
    GGT: 1,
    GTA: 1,
    GTC: 1,
    GTG: 1,
    GTT: 1,
    TAA: 1,
    TAC: 1,
    TAG: 1,
    TAT: 1,
    TCA: 1,
    TCC: 1,
    TCG: 1,
    TCT: 1,
    TGA: 1,
    TGC: 1,
    TGG: 1,
    TGT: 1,
    TTA: 1,
    TTC: 1,
    TTG: 1,
    TTT: 1 
};

//--------------------TEST calcRelCodonAdaptScores--------------------
module.exports.countObj1 = { 
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
    ATG: 55,
    ATT: 0,
    CAA: 0,
    CAC: 0,
    CAG: 0,
    CAT: 0,
    CCA: 0,
    CCC: 0,
    CCG: 0,
    CCT: 0,
    CGA: 5,
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
    GGT: 10,
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
//CODON COUNT Objects 1
//          COUNT   RCA SCORE
//AGA:      2       0.4
//AGG:      3       0.6
//CGA:      5      1.0
//CGC:      1       0.2
//CGG:      2       0.4
//CGT:      5       1.0

//GGA:      2       0.2
//GGC:      0       0
//GGG:      3       0.3
//GGT:      10      1.0

//ATG:      55       1.0

//all others: 0     1.0
module.exports.countObj1Scores = { AAA: 1.0,
    AAC: 1.0,
    AAG: 1.0,
    AAT: 1.0,
    ACA: 1.0,
    ACC: 1.0,
    ACG: 1.0,
    ACT: 1.0,
    AGA: 0.4,
    AGC: 1.0,
    AGG: 0.6,
    AGT: 1.0,
    ATA: 1.0,
    ATC: 1.0,
    ATG: 1.0,
    ATT: 1.0,
    CAA: 1.0,
    CAC: 1.0,
    CAG: 1.0,
    CAT: 1.0,
    CCA: 1.0,
    CCC: 1.0,
    CCG: 1.0,
    CCT: 1.0,
    CGA: 1.0,
    CGC: 0.2,
    CGG: 0.4,
    CGT: 1.0,
    CTA: 1.0,
    CTC: 1.0,
    CTG: 1.0,
    CTT: 1.0,
    GAA: 1.0,
    GAC: 1.0,
    GAG: 1.0,
    GAT: 1.0,
    GCA: 1.0,
    GCC: 1.0,
    GCG: 1.0,
    GCT: 1.0,
    GGA: 0.2,
    GGC: 0,
    GGG: 0.3,
    GGT: 1.0,
    GTA: 1.0,
    GTC: 1.0,
    GTG: 1.0,
    GTT: 1.0,
    TAA: 1.0,
    TAC: 1.0,
    TAG: 1.0,
    TAT: 1.0,
    TCA: 1.0,
    TCC: 1.0,
    TCG: 1.0,
    TCT: 1.0,
    TGA: 1.0,
    TGC: 1.0,
    TGG: 1.0,
    TGT: 1.0,
    TTA: 1.0,
    TTC: 1.0,
    TTG: 1.0,
    TTT: 1.0 
};


module.exports.countObj2 = { 
    AAA: 1,
    AAC: 0,
    AAG: 0,
    AAT: 0,
    ACA: 0,
    ACC: 0,
    ACG: 0,
    ACT: 0,
    AGA: 0,
    AGC: 0,
    AGG: 0,
    AGT: 0,
    ATA: 0,
    ATC: 0,
    ATG: 1,
    ATT: 0,
    CAA: 0,
    CAC: 100,
    CAG: 0,
    CAT: 0,
    CCA: 0,
    CCC: 0,
    CCG: 0,
    CCT: 0,
    CGA: 0,
    CGC: 0,
    CGG: 0,
    CGT: 0,
    CTA: 0,
    CTC: 0,
    CTG: 0,
    CTT: 900,
    GAA: 0,
    GAC: 0,
    GAG: 0,
    GAT: 0,
    GCA: 1,
    GCC: 1,
    GCG: 0,
    GCT: 0,
    GGA: 0,
    GGC: 0,
    GGG: 0,
    GGT: 0,
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
//ATG   1       1

//GCA   1       1
//GCC   1       1
//GCG   0       0
//GCT   0       0

//AAA   1       1
//AAG   0       0

//CAC   100     1
//CAT   0       0

//CTT   900     1
//all 5 other codons encoding for "L" COUNT 0 and SCORE 0

//all other codons COUNT 0 and SCORE 1
module.exports.countObj2Scores = { 
    AAA: 1,
    AAC: 1,
    AAG: 0,
    AAT: 1,
    ACA: 1,
    ACC: 1,
    ACG: 1,
    ACT: 1,
    AGA: 1,
    AGC: 1,
    AGG: 1,
    AGT: 1,
    ATA: 1,
    ATC: 1,
    ATG: 1,
    ATT: 1,
    CAA: 1,
    CAC: 1,
    CAG: 1,
    CAT: 0,
    CCA: 1,
    CCC: 1,
    CCG: 1,
    CCT: 1,
    CGA: 1,
    CGC: 1,
    CGG: 1,
    CGT: 1,
    CTA: 0,
    CTC: 0,
    CTG: 0,
    CTT: 1,
    GAA: 1,
    GAC: 1,
    GAG: 1,
    GAT: 1,
    GCA: 1,
    GCC: 1,
    GCG: 0,
    GCT: 0,
    GGA: 1,
    GGC: 1,
    GGG: 1,
    GGT: 1,
    GTA: 1,
    GTC: 1,
    GTG: 1,
    GTT: 1,
    TAA: 1,
    TAC: 1,
    TAG: 1,
    TAT: 1,
    TCA: 1,
    TCC: 1,
    TCG: 1,
    TCT: 1,
    TGA: 1,
    TGC: 1,
    TGG: 1,
    TGT: 1,
    TTA: 0,
    TTC: 1,
    TTG: 0,
    TTT: 1 
};

//all codon counts equal 1
module.exports.countObj3 = { 
    AAA: 1,
    AAC: 1,
    AAG: 1,
    AAT: 1,
    ACA: 1,
    ACC: 1,
    ACG: 1,
    ACT: 1,
    AGA: 1,
    AGC: 1,
    AGG: 1,
    AGT: 1,
    ATA: 1,
    ATC: 1,
    ATG: 1,
    ATT: 1,
    CAA: 1,
    CAC: 1,
    CAG: 1,
    CAT: 1,
    CCA: 1,
    CCC: 1,
    CCG: 1,
    CCT: 1,
    CGA: 1,
    CGC: 1,
    CGG: 1,
    CGT: 1,
    CTA: 1,
    CTC: 1,
    CTG: 1,
    CTT: 1,
    GAA: 1,
    GAC: 1,
    GAG: 1,
    GAT: 1,
    GCA: 1,
    GCC: 1,
    GCG: 1,
    GCT: 1,
    GGA: 1,
    GGC: 1,
    GGG: 1,
    GGT: 1,
    GTA: 1,
    GTC: 1,
    GTG: 1,
    GTT: 1,
    TAA: 1,
    TAC: 1,
    TAG: 1,
    TAT: 1,
    TCA: 1,
    TCC: 1,
    TCG: 1,
    TCT: 1,
    TGA: 1,
    TGC: 1,
    TGG: 1,
    TGT: 1,
    TTA: 1,
    TTC: 1,
    TTG: 1,
    TTT: 1 
};
//--> all rcaScores equal 1
module.exports.countObj3Scores = { 
    AAA: 1,
    AAC: 1,
    AAG: 1,
    AAT: 1,
    ACA: 1,
    ACC: 1,
    ACG: 1,
    ACT: 1,
    AGA: 1,
    AGC: 1,
    AGG: 1,
    AGT: 1,
    ATA: 1,
    ATC: 1,
    ATG: 1,
    ATT: 1,
    CAA: 1,
    CAC: 1,
    CAG: 1,
    CAT: 1,
    CCA: 1,
    CCC: 1,
    CCG: 1,
    CCT: 1,
    CGA: 1,
    CGC: 1,
    CGG: 1,
    CGT: 1,
    CTA: 1,
    CTC: 1,
    CTG: 1,
    CTT: 1,
    GAA: 1,
    GAC: 1,
    GAG: 1,
    GAT: 1,
    GCA: 1,
    GCC: 1,
    GCG: 1,
    GCT: 1,
    GGA: 1,
    GGC: 1,
    GGG: 1,
    GGT: 1,
    GTA: 1,
    GTC: 1,
    GTG: 1,
    GTT: 1,
    TAA: 1,
    TAC: 1,
    TAG: 1,
    TAT: 1,
    TCA: 1,
    TCC: 1,
    TCG: 1,
    TCT: 1,
    TGA: 1,
    TGC: 1,
    TGG: 1,
    TGT: 1,
    TTA: 1,
    TTC: 1,
    TTG: 1,
    TTT: 1 
};

//--------------------TEST calcGeneScore--------------------
//TEST INPUT
//      SCORE
//AGA:  0.5
//AGG:  0.5
//CGA:  1
//CGC:  1
//CGG:  0.2
//CGT:  0

//GGA:  0.2
//GGC:  0
//GGG:  0.3
//GGT:  1
//all others: SCORE 1

module.exports.gene1 = `GGA GGC GGG GGT AAA AGA AACAAG CGT AAT AGA ACAACCATG  CGC   CGG  CGT`
module.exports.scoreDict1 = { 
    A: { GCA: 1, GCC: 1, GCG: 1, GCT: 1 },
    C: { TGC: 1, TGT: 1 },
    D: { GAC: 1, GAT: 1 },
    E: { GAA: 1, GAG: 1 },
    F: { TTC: 1, TTT: 1 },
    G: { GGA: 0.2, GGC: 0, GGG: 0.3, GGT: 1 },
    H: { CAC: 1, CAT: 1 },
    I: { ATA: 1, ATC: 1, ATT: 1 },
    K: { AAA: 1, AAG: 1 },
    L: { CTA: 1, CTC: 1, CTG: 1, CTT: 1, TTA: 1, TTG: 1 },
    M: { ATG: 1 },
    N: { AAC: 1, AAT: 1 },
    P: { CCA: 1, CCC: 1, CCG: 1, CCT: 1 },
    Q: { CAA: 1, CAG: 1 },
    R: { AGA: 0.5, AGG: 0.5, CGA: 1, CGC: 1, CGG: 0.2, CGT: 0 },
    S: { AGC: 1, AGT: 1, TCA: 1, TCC: 1, TCG: 1, TCT: 1 },
    T: { ACA: 1, ACC: 1, ACG: 1, ACT: 1 },
    V: { GTA: 1, GTC: 1, GTG: 1, GTT: 1 },
    W: { TGG: 1 },
    Y: { TAC: 1, TAT: 1 },
    '*': { TAG: 1, TAA: 1, TGA: 1 } 
};

module.exports.geneScore1 = [ 0.2, 0, 0.3, 1,
    1, 
    0.5, 
    1, 1,
    0,
    1,
    0.5,
    1, 1, 1,
    1,
    0.2,
    0
];

//--------------------TEST calcCodonScoreDict--------------------
//TEST REF GENES FOR calcCodonScoreDict
//AGA:  4       0.8
//AGG:  3       0.6
//CGA:  5       1
//CGC:  1       0.2
//CGG:  0       0
//CGT:  5       1

//GGA:  1       0.2
//GGC:  1       0.2
//GGG:  3       0.6
//GGT:  5       1

module.exports.refGene1 = 'AGA AGA AGA AGA AGG AGG AGG CGA CGA CGA CGA CGA CGC CGT CGT CGT CGT CGT GGA GGC GGG GGG GGG GGT GGT GGT GGT GGT';
module.exports.scoreDictRefGene1 = { 
    A: { GCA: 1, GCC: 1, GCG: 1, GCT: 1 },
    C: { TGC: 1, TGT: 1 },
    D: { GAC: 1, GAT: 1 },
    E: { GAA: 1, GAG: 1 },
    F: { TTC: 1, TTT: 1 },
    G: { GGA: 0.2, GGC: 0.2, GGG: 0.6, GGT: 1 },
    H: { CAC: 1, CAT: 1 },
    I: { ATA: 1, ATC: 1, ATT: 1 },
    K: { AAA: 1, AAG: 1 },
    L: { CTA: 1, CTC: 1, CTG: 1, CTT: 1, TTA: 1, TTG: 1 },
    M: { ATG: 1 },
    N: { AAC: 1, AAT: 1 },
    P: { CCA: 1, CCC: 1, CCG: 1, CCT: 1 },
    Q: { CAA: 1, CAG: 1 },
    R: { AGA: 0.8, AGG: 0.6, CGA: 1, CGC: 0.2, CGG: 0, CGT: 1 },
    S: { AGC: 1, AGT: 1, TCA: 1, TCC: 1, TCG: 1, TCT: 1 },
    T: { ACA: 1, ACC: 1, ACG: 1, ACT: 1 },
    V: { GTA: 1, GTC: 1, GTG: 1, GTT: 1 },
    W: { TGG: 1 },
    Y: { TAC: 1, TAT: 1 },
    '*': { TAG: 1, TAA: 1, TGA: 1 } 
};
module.exports.refGene2 = 'ATGATGATG'
//--> all codons have the score 1 (since "M" is only encoded by one codon 'ATG'):
module.exports.scoreDictRefGene2 = { 
    A: { GCA: 1, GCC: 1, GCG: 1, GCT: 1 },
    C: { TGC: 1, TGT: 1 },
    D: { GAC: 1, GAT: 1 },
    E: { GAA: 1, GAG: 1 },
    F: { TTC: 1, TTT: 1 },
    G: { GGA: 1, GGC: 1, GGG: 1, GGT: 1 },
    H: { CAC: 1, CAT: 1 },
    I: { ATA: 1, ATC: 1, ATT: 1 },
    K: { AAA: 1, AAG: 1 },
    L: { CTA: 1, CTC: 1, CTG: 1, CTT: 1, TTA: 1, TTG: 1 },
    M: { ATG: 1 },
    N: { AAC: 1, AAT: 1 },
    P: { CCA: 1, CCC: 1, CCG: 1, CCT: 1 },
    Q: { CAA: 1, CAG: 1 },
    R: { AGA: 1, AGG: 1, CGA: 1, CGC: 1, CGG: 1, CGT: 1 },
    S: { AGC: 1, AGT: 1, TCA: 1, TCC: 1, TCG: 1, TCT: 1 },
    T: { ACA: 1, ACC: 1, ACG: 1, ACT: 1 },
    V: { GTA: 1, GTC: 1, GTG: 1, GTT: 1 },
    W: { TGG: 1 },
    Y: { TAC: 1, TAT: 1 },
    '*': { TAG: 1, TAA: 1, TGA: 1 } 
};

//--------------------TEST calcCodonScoreDict--------------------
module.exports.seqToHarmonize1 = 'ATGATGATGATGATG'; // 5 times codon 'ATG'
module.exports.geneScoreSource1 = [1, 1, 1, 1, 1];
module.exports.targetCodonScores1 = { 
    A: { GCA: 1, GCC: 1, GCG: 1, GCT: 1 },
    C: { TGC: 1, TGT: 1 },
    D: { GAC: 1, GAT: 1 },
    E: { GAA: 1, GAG: 1 },
    F: { TTC: 1, TTT: 1 },
    G: { GGA: 0.2, GGC: 0.2, GGG: 0.6, GGT: 1 },
    H: { CAC: 1, CAT: 1 },
    I: { ATA: 1, ATC: 1, ATT: 1 },
    K: { AAA: 1, AAG: 1 },
    L: { CTA: 1, CTC: 1, CTG: 1, CTT: 1, TTA: 1, TTG: 1 },
    M: { ATG: 1 },
    N: { AAC: 1, AAT: 1 },
    P: { CCA: 1, CCC: 1, CCG: 1, CCT: 1 },
    Q: { CAA: 1, CAG: 1 },
    R: { AGA: 0.8, AGG: 0.6, CGA: 1, CGC: 0.2, CGG: 0, CGT: 1 },
    S: { AGC: 1, AGT: 1, TCA: 1, TCC: 1, TCG: 1, TCT: 1 },
    T: { ACA: 1, ACC: 1, ACG: 1, ACT: 1 },
    V: { GTA: 1, GTC: 1, GTG: 1, GTT: 1 },
    W: { TGG: 1 },
    Y: { TAC: 1, TAT: 1 },
    '*': { TAG: 1, TAA: 1, TGA: 1 } 
};
//independently of targetCodonScore, the harmonized sequence will equal the original sequence (amino acid 'M' is only encoded by one codon 'ATG')
module.exports.harmonizedGene1 = 'ATGATGATGATGATG';

module.exports.seqToHarmonize2 = 'AGA AGG CGA CGC CGG CGT';
module.exports.geneScoreSource2 = [1, 0.3, 0.05, 1, 1, 0.4]; //All 5 codons encode for 'R'
//scores for the codons are : R: { AGA: 0.8, AGG: 0.6, CGA: 1, CGC: 0.2, CGG: 0, CGT: 1 }
module.exports.targetCodonScores2 = { 
    A: { GCA: 1, GCC: 1, GCG: 1, GCT: 1 },
    C: { TGC: 1, TGT: 1 },
    D: { GAC: 1, GAT: 1 },
    E: { GAA: 1, GAG: 1 },
    F: { TTC: 1, TTT: 1 },
    G: { GGA: 0.2, GGC: 0.2, GGG: 0.6, GGT: 1 },
    H: { CAC: 1, CAT: 1 },
    I: { ATA: 1, ATC: 1, ATT: 1 },
    K: { AAA: 1, AAG: 1 },
    L: { CTA: 1, CTC: 1, CTG: 1, CTT: 1, TTA: 1, TTG: 1 },
    M: { ATG: 1 },
    N: { AAC: 1, AAT: 1 },
    P: { CCA: 1, CCC: 1, CCG: 1, CCT: 1 },
    Q: { CAA: 1, CAG: 1 },
    R: { AGA: 0.8, AGG: 0.6, CGA: 1, CGC: 0.2, CGG: 0, CGT: 1 },
    S: { AGC: 1, AGT: 1, TCA: 1, TCC: 1, TCG: 1, TCT: 1 },
    T: { ACA: 1, ACC: 1, ACG: 1, ACT: 1 },
    V: { GTA: 1, GTC: 1, GTG: 1, GTT: 1 },
    W: { TGG: 1 },
    Y: { TAC: 1, TAT: 1 },
    '*': { TAG: 1, TAA: 1, TGA: 1 } 
};
//the FIRST codon with the bestDiff is chosen (a second codon with the same score difference is ignored):
//i.e. AGA (source score 1) is harmonized to CGA (target score 1) and not to CGT (also target score 1)
//i.e. CGT (source score 0.4) is harmonized to AGG (target score 0.6) and not to CGC (target score 0.2, same difference)
module.exports.harmonizedGene2 = 'CGACGCCGGCGACGAAGG';