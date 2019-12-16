 
const sourceCodonScoresEx = { 
    A: 
    { GCA: 0.2857142857142857,
      GCC: 0.14285714285714285,
      GCG: 0.14285714285714285,
      GCT: 0.42857142857142855 },
   C: { TGC: 0, TGT: 0 },
   D: { GAC: 1, GAT: 0 },
   E: { GAA: 0.5, GAG: 0.5 },
   F: { TTC: 0.6666666666666666, TTT: 0.3333333333333333 },
   G:
    { GGA: 0.6666666666666666,
      GGC: 0.3333333333333333,
      GGG: 0,
      GGT: 0 },
   H: { CAC: 0.5, CAT: 0.5 },
   I: { ATA: 0.5, ATC: 0, ATT: 0.5 },
   K: { AAA: 0.6666666666666666, AAG: 0.3333333333333333 },
   L:
    { CTA: 0.06666666666666667,
      CTC: 0.06666666666666667,
      CTG: 0.4,
      CTT: 0.13333333333333333,
      TTA: 0.06666666666666667,
      TTG: 0.26666666666666666 },
   M: { ATG: 1 },
   N: { AAC: 1, AAT: 0 },
   P:
    { CCA: 0.2727272727272727,
      CCC: 0.2727272727272727,
      CCG: 0.18181818181818182,
      CCT: 0.2727272727272727 },
   Q: { CAA: 0.16666666666666666, CAG: 0.8333333333333334 },
   R: { AGA: 0.25, AGG: 0.25, CGA: 0, CGC: 0.25, CGG: 0.125, CGT: 0.125 },
   S:
    { AGC: 0.5,
      AGT: 0,
      TCA: 0.07142857142857142,
      TCC: 0.21428571428571427,
      TCG: 0,
      TCT: 0.21428571428571427 },
   T: { ACA: 0.625, ACC: 0.125, ACG: 0.125, ACT: 0.125 },
   V: { GTA: 0.2, GTC: 0.2, GTG: 0.4, GTT: 0.2 },
   W: { TGG: 1 },
   Y: { TAC: 0.6666666666666666, TAT: 0.3333333333333333 },
   _: { TAG: 0, TAA: 0.3333333333333333, TGA: 0.6666666666666666 } 
}

const targetCodonScoresEx = { 
    A:
    { GCA: 0.18181818181818182,
      GCC: 0.45454545454545453,
      GCG: 0.09090909090909091,
      GCT: 0.2727272727272727 },
   C: { TGC: 0.7777777777777778, TGT: 0.2222222222222222 },
   D: { GAC: 0.3333333333333333, GAT: 0.6666666666666666 },
   E: { GAA: 0, GAG: 1 },
   F: { TTC: 0.6, TTT: 0.4 },
   G: { GGA: 0.5, GGC: 0.25, GGG: 0.25, GGT: 0 },
   H: { CAC: 0.3333333333333333, CAT: 0.6666666666666666 },
   I: { ATA: 0, ATC: 0, ATT: 1 },
   K: { AAA: 0.6, AAG: 0.4 },
   L:
    { CTA: 0.14285714285714285,
      CTC: 0.14285714285714285,
      CTG: 0.14285714285714285,
      CTT: 0.21428571428571427,
      TTA: 0.14285714285714285,
      TTG: 0.21428571428571427 },
   M: { ATG: 1 },
   N: { AAC: 0.5, AAT: 0.5 },
   P: { CCA: 0.625, CCC: 0, CCG: 0, CCT: 0.375 },
   Q: { CAA: 0.4, CAG: 0.6 },
   R:
    { AGA: 0.14285714285714285,
      AGG: 0.2857142857142857,
      CGA: 0,
      CGC: 0.42857142857142855,
      CGG: 0,
      CGT: 0.14285714285714285 },
   S:
    { AGC: 0.2857142857142857,
      AGT: 0.14285714285714285,
      TCA: 0.21428571428571427,
      TCC: 0.07142857142857142,
      TCG: 0.07142857142857142,
      TCT: 0.21428571428571427 },
   T:
    { ACA: 0.42857142857142855,
      ACC: 0,
      ACG: 0.2857142857142857,
      ACT: 0.2857142857142857 },
   V: { GTA: 0, GTC: 0, GTG: 1, GTT: 0 },
   W: { TGG: 1 },
   Y: { TAC: 1, TAT: 0 },
   _: { TAG: 0.16666666666666666, TAA: 0.5, TGA: 0.3333333333333333 } 
}

const geneScoreSourceEx = [ 1,
    0.5,
    0.21428571428571427,
    0.42857142857142855,
    0.2857142857142857,
    0.125,
    0.21428571428571427,
    0.625,
    0.6666666666666666,
    0.2727272727272727,
    0.21428571428571427,
    0,
    0.6666666666666666,
    0.625,
    0.21428571428571427,
    0.2727272727272727,
    0.2857142857142857,
    0.2727272727272727,
    0.2,
    0.6666666666666666,
    0.125,
    0.2727272727272727,
    0,
    0.125,
    0.5,
    0.6666666666666666,
    0,
    0.5,
    0.3333333333333333,
    0.5,
    0.6666666666666666,
    0.21428571428571427,
    1,
    0,
    0.4,
    0.14285714285714285,
    0.2,
    0.4,
    0.6666666666666666,
    1,
    0.14285714285714285,
    0,
    0.25,
    0.2,
    0.14285714285714285,
    0.6666666666666666,
    0,
    1,
    0.5,
    1,
    0.2727272727272727,
    0.5,
    0.13333333333333333,
    0.06666666666666667,
    1,
    0.16666666666666666,
    0,
    0.06666666666666667,
    0.06666666666666667,
    0.5,
    0.8333333333333334,
    0.3333333333333333,
    0,
    0.2857142857142857,
    1,
    0,
    0.5,
    0.5,
    0.2727272727272727,
    0.2727272727272727,
    1,
    0.125,
    1,
    0.5,
    0.2727272727272727,
    0.3333333333333333,
    0.3333333333333333,
    0.125,
    0.125,
    0,
    0.2857142857142857,
    0,
    0,
    0.5,
    0.6666666666666666,
    0.6666666666666666,
    0.06666666666666667,
    0.3333333333333333,
    1,
    0.625,
    0.125,
    0,
    0.125,
    0.3333333333333333,
    0.3333333333333333,
    0.6666666666666666,
    0.06666666666666667,
    0,
    0.25,
    0.26666666666666666
]

const geneScoreTargetEx = [ 
    1,
    0.6666666666666666,
    0.07142857142857142,
    0.2727272727272727,
    0.18181818181818182,
    0.2857142857142857,
    0.21428571428571427,
    0.42857142857142855,
    1,
    0,
    0.21428571428571427,
    0.25,
    0.6,
    0.42857142857142855,
    0.07142857142857142,
    0.625,
    0.18181818181818182,
    0.625,
    0,
    0.5,
    0,
    0.375,
    0.25,
    0.2857142857142857,
    1,
    1,
    0.14285714285714285,
    0,
    0,
    0,
    0.6,
    0.07142857142857142,
    0.5,
    0.6666666666666666,
    1,
    0.09090909090909091,
    0,
    1,
    0.5,
    1,
    0.45454545454545453,
    0.7777777777777778,
    0.42857142857142855,
    0,
    0.09090909090909091,
    0.5,
    0,
    0.5,
    0.3333333333333333,
    0.5,
    0.375,
    0,
    0.21428571428571427,
    0.14285714285714285,
    1,
    0.4,
    0.07142857142857142,
    0.14285714285714285,
    0.14285714285714285,
    0.2857142857142857,
    0.6,
    0.4,
    0.14285714285714285,
    0.18181818181818182,
    1,
    0,
    1,
    1,
    0.625,
    0,
    1,
    0,
    1,
    1,
    0.375,
    0,
    0,
    0.14285714285714285,
    0,
    0.6666666666666666,
    0.18181818181818182,
    0,
    0.5,
    1,
    0.6,
    0.6,
    0.14285714285714285,
    0.4,
    0.5,
    0.42857142857142855,
    0.2857142857142857,
    0.07142857142857142,
    0.14285714285714285,
    0.25,
    0,
    0.6,
    0.14285714285714285,
    0.6666666666666666,
    0.42857142857142855,
    0.21428571428571427
]

const harmonizedSeqEx = 'ATGCATTCAGCCGCTACCTCAACATACCCTTCAGGTAAAACATCACCTGCTCCTGTAGGAACCCCTGGTACCGAATACTCCGAATATGAATTCTCAAACGACGTAGCAGTAGTAGGAATGGCATGTAGGGTAGCAGGAGGTAACCATAACCCTGAACTACTATGGCAATCCCTACTAAGCCAGAAGTCCGCTATGGGTGAAATACCTCCTATGAGATGGGAACCTTATTATAGAAGAGACGCTCGAAACGAAAAATTCCTAAAGAACACAACCTCCAGAGGCTATTTCCTAGACAGGCTTGAAGATTTTGATTGTCAGTTCTTTGGCATATCACCTAAGGAAGCAGAACAGATGGATCCTCAACAGCGAGTATCACTTGAAGTAGCTTCCGAAGCACTTGAAGACGCAGGTATACCTGCAAAGTCCCTTTCAGGTTCCGATACAGCTGTATTCTGGGGTGTAAACTCCGATGATTACTCAAAGCTAGTACTAGAAGACCTTCCTAACGTAGAAGCATGGATGGGCATAGGCACCGCTTACTGTGGCGTACCTAACAGGATATCCTATCATCTAAACCTTATGGGTCCTAGCACCGCAGTAGACGCAGCATGTGCCTCCTCACTAGTAGCAATACATCATGGAGTACAGGCAATACGACTTGGAGAATCCAAGGTAGCCATAGTAGGAGGTGTAAACGCACTATGTGGCCCTGGACTTACCAGGGTACTAGATAAAGCAGGCGCAATATCCTCAGATGGATCATGTAAGTCATTCGACGACGATGCACATGGTTACGCCAGGGGTGAAGGTGCAGGCGCACTAGTACTAAAATCCCTTCATAGAGCTCTTCTAGATCATGACAACGTACTTGCTGTAATAAAGGGCTCCGCAGTATGTCAGGACGGCAAGACCAACGGCATAATGGCACCTAACTCAGTAGCACAACAGCTAGCTGCTAACAACGCCCTATCAGCCGCTAACATAGATCCTCATACCGTAAGGTATGTAGAAGCTCATGCAACATCAACCCCTCTTGGCGATCCTACCGAAATATCAGCAATAGCTTCCGTATACGGCGCAGATAGGCCTGCAGACGACCCTTGTTACATAGGTTCAATAAAGCCTAACATAGGTCATCTTGAAGCCGGTGCAGGAGTAATGGGCTTCATAAAAGCTGTACTTGCAATACAAAAGGGCGTACTTCCTCCCCAGGCAAACCTTACAAAGCTAAACAGCAGAATAGATTGGAAGACAGCAGGTGTAAAGGTAGTACAAGAAGCAACCCCCTGGCCTGAATCCGATCCTATAAGAAGGGCTGGTGTATGTTCCTATGGTTACGGAGGTACCGTATCACATGCAGTAATAGAAGAATTCAGCCCTATACTTCAGCCTGATCCTCTAGGTAACGGAGCTGTAAGCGGACCTGGCCTACTACTACTTTCAGGACCTCAGGAAAAAAGACTAGCACTTCAGGCAAAAACACTTAGGGATTGGATGACCGCAGAAGGAAAGGACCATAACCTTTCCGACATACTAACCACCCTAGCCACCCGACGAGACCATCATGATTACCGAGCAGCACTAGTAGTAGACGATTACAGAGACGCCGAACAAGTACTTCAATCCCTTGCAAACGGTGTAGATCATACATTCACCACCCAGAGCAGAGTACTTGGCTCCGATATAAGCAAGGATGTAGTATGGGTATTCTCAGGTCATGGTGCACAGTGGCCCGATATGGGCAAACAACTAATACATAACCCCGTATTCTTCGCTGCAATACAGCCTCTAGACGAACTTATACAAGCAGAAATAGGTCTTTCACCTATAGAACTACTACGAACCGGTGATTTTGAATCCTCAGACAGAGTACAGATACTAACCTATGTAATGCAAATAGGTCTAAGCGCACTTCTACAAAGCAACGGCATAACCCCTCAGGCAGTAATAGGACATTCAGTAGGCGAAATAGCAGCATCCGTAGTAGCCGGAGCTCTATCACCTGCTGAAGGTGCACTAATAGTAACCAGGAGGGCACTTCTTTACAGGCAGGTAATGGGCAAGGGCGGCATGATACTAGTAAACCTACCTTCCTCAGAAACCGAAGAAATACTAGGTTCACGATCCGATCTTGTAGTAGCAATAGATTCCTCCCCTTCATCATGTGTAGTAGCCGGAGACAAGGAACTAGTAGCAGAAACAGCTGAAGCCCTAAAGGCACGAGGCGTAAAGACATTCACCGTAAAGTCCGACATAGCATTCCATAGCCCTACCCTTAACGGTCTTGTAGACCCTCTAAGAGACGTACTAGCTGAAACCCTTTCACCTGTATCCCCTAACGTAAAGCTTTATTCAACCGCTCTTGCTGATCCTAGGGGCCAGGATCTTAGGGATGTAGAATACTGGGCAGGCAACATGGTAAACAGGGTAAGACTAACCTCCGCCGTAAAGGCAGCCGTAGAAGATGGATATAGACTATTCCTAGAAGTATCCACCCATCCTGTAGTATCACATTCAATAAACGAAACACTAATGGACGCTGGCATGGAAGATTTTGCAGTAATACCTACCCTACTAAGAAAAAAGCCTACCGAAAAGCATATACTTCATAGCATAGCTCAGCTACATTGTAGGGGTGCAGAAGTAAACTGGGCTGCTCAGATGCCTGGAAGGTGGGCAACCGGAGTACCTACCACCACCTGGATGCATAAGCCTATATGGAGGAAGATAGAAACCGCACCCCTACATACCGGTCTAACCCATGACGTAGAAAAGCATACACTACTTGGACAGAGAATACCTGTACCTGGCACCGATACCTATGTATACACAACCAGACTTGACAACGATACAAAGCCTTTCCCCGGCAGCCATCCTCTTCATGGCACCGAAATAGTACCCGCCGCTGGTCTTATAAACACCTTCCTTAAGGGCACAGGCGGCCAGATGCTTCAGAACGTAGTACTAAGGGTACCTGTAGCAATAAACGCTCCTCGATCAGTACAGGTAGTAGTACAGCAGGACCAGGTAAAGGTAGTATCACGACTTATACCTTCCGAACCTTCCCAGCTTGACGATGACGCATCATGGGTAACCCATACCACCGCTTACTGGGACAGAAAGGTAGCCGGTTCAGAAGACAGGATAGATTTCGCCGCAGTAAAATCCCGACTAGTAACCAAACTAGCTGATAACTTTTCCATAGATTACCTTGATAAGGTAGGTGTATCAGCAATGGGATTCCCTTGGGCAGTAACAGAACATTACAGGAACGATAAGGAAATGCTTGCTAGAGTAGACGTAAACCCTGCAATATCAGGAGACGCACCTCTTCCTTGGGACTCATCCTCATGGGCACCTGTACTAGATGCCGCAACCTCAGTAGGTTCCACCATATTCCCCACACCTGCTCTAAGAATGCCTGCACAGATAGAAAGAGTAGAAGTATTCACCTCCCAGGACCCCCCTAAGATAAGCTGGCTATACGTACAGGAAGCATCAGACTCCGTACCTACCTCACATGTAAGCGTAGTAAGCGAAGCAGGTGAAGTACTAGCAAAATTCACAGCAATGAGATTCTCAGAAATAGAAGGCACCCCTGGCGTATCCGGCAGCATGGAATCCCTAGTACATCAGATAGCCTGGCCTCCTGCAACCCCCGCAGAAGAACCTCTTTCAATAGAAACAGTAATACTTGTATCCCCTGATGCCACCACCAGGGCACTTTATGCAGCTTCCCTTCCCACCAGAGTAAACTCATTCCAGTTCTCATCAACACAAGAATTCTTCAGCAACGCCTCCTCACTACCTCTTGAAAAGGGAACCGTAGTAACCTACATACCTGGTGAAGTAGCATCCCTTGCAGAAGTACCTGCAGCTTCAGAATCCTTCACCTGGAACCTTCTAGAACTTATAAAATTCACCGTAAACGGCTCCCTTCCTATAAAAGTATTCACCCTAACCGCAAACATAGGCGAAGGTCAAACACCTACCGCCCTAGCACAGTCACCTCTTTACGGCCTTGCTCGAGTAATAGCATCCGAACATCCTGACCTAGGAACCCTAATAGATGTAGAAGAACCTGTAATACCTCTTTCCACCATGCGATACATACAGGGTGCTGATATAATACGAATAAACGATGGAATAGCCAGGACCTCAAGATTCAGGAGCCTTCCCAGGAACAAGCTTCTACCTGCAAGCGAAGGTCCTAGGCTTCTACCTAGGCCTGAAGGCACATACCTTATAACCGGTGGTCTAGGCGTACTAGGTCTAGAAGTAGCCGATTTCCTTGTAGAAAAGGGTGCAAGGAGACTTCTTCTAATATCCCGAAGGGCACTACCTCCTAGGCGAACCTGGGATCAGGTAAGCGAAGACCTACAGCCCACCATAGCAAAGATAAGGCTACTTGAATCCAGGGGCGCATCCGTACATGTACTTCCTCTTGATATAACCAAACCCGACGCAGTAGAACAGCTAACCACCGCACTTGATCGACTATCACTTCCTTCCGTACAGGGTGTAGTACATGCCGCAGGTGTACTTGATAACGAACTAGTAATGCAGACCACCAGGGATGCATTCAACAGAGTACTAGCTCCTAAGATAGCAGGCGCACTAGCACTTCATGAAGTATTTCCTCCTAAGAGCGTAGATTTCTTCGTAATGTTCTCATCATGTGGAAACCTAGTAGGTTTCACCGGTCAAGCCTCATACGGCTCCGGTAACGCATTCCTTGACACACTAGCAACCCATAGAGCAAGGCTAGGTGATGCTGCAGTATCATTCCAGTGGACATCCTGGAGAGGCCTAGGCATGGGTGCAAGCACAGATTTTATAAACGCCGAACTTGAATCAAAAGGAATAACCGATGTAACCAGGGACGAAGCATTTGCCGCTTGGCAGCATCTAGCAAAGTATGACATGGATCATGGAGTAGTACTTCGAAGCAGAGCATTTGAAGATGGTGAACCCATACCTGTATCAATACTAAACGACATAGCAGTACGAAGGGTAGGCACCGTATCAAGCACCTCCCCCGCAGCCGCAGGTTCAAGCGATGCAGTACCTACCTCAGGACCCGAACTAAAGACCTATCTTGATGAAAAGATAAGGGGCTGTGTAGCAAAGGTACTACAGATGACCGCCGAAGACGTAGACTCCAAGGCTGCCCTTGCAGACCTTGGTGTAGATTCCGTAATGACAGTAACCCTTAGAAGGCAGCTTCAGCTAACACTTAAGATAGCAGTACCTCCTACACTTACCTGGTCCCATCCCACCGTAAGCCATCTTGCAGTATGGTTTGCCGAAAAGCTAGCAAAATAG'

const harmonizedGeneScoreTargetEx = [ 
    1,
    0.6666666666666666,
    0.21428571428571427,
    0.45454545454545453,
    0.2727272727272727,
    0,
    0.21428571428571427,
    0.42857142857142855,
    1,
    0.375,
    0.21428571428571427,
    0,
    0.6,
    0.42857142857142855,
    0.21428571428571427,
    0.375,
    0.2727272727272727,
    0.375,
    0,
    0.5,
    0,
    0.375,
    0,
    0,
    0,
    1,
    0.07142857142857142,
    0,
    0,
    0,
    0.6,
    0.21428571428571427,
    0.5,
    0.3333333333333333,
    0,
    0.18181818181818182,
    0,
    0,
    0.5,
    1,
    0.18181818181818182,
    0.2222222222222222,
    0.2857142857142857,
    0,
    0.18181818181818182,
    0.5,
    0,
    0.5,
    0.6666666666666666,
    0.5,
    0.375,
    0,
    0.14285714285714285,
    0.14285714285714285,
    1,
    0.4,
    0.07142857142857142,
    0.14285714285714285,
    0.14285714285714285,
    0.2857142857142857,
    0.6,
    0.4,
    0.07142857142857142,
    0.2727272727272727,
    1,
    0,
    0,
    0,
    0.375,
    0.375,
    1,
    0.14285714285714285,
    1,
    0,
    0.375,
    0,
    0,
    0.14285714285714285,
    0.14285714285714285,
    0.3333333333333333,
    0.2727272727272727,
    0,
    0.5,
    0,
    0.6,
    0.6,
    0.14285714285714285,
    0.4,
    0.5,
    0.42857142857142855,
    0,
    0.07142857142857142,
    0.14285714285714285,
    0.25,
    0,
    0.6,
    0.14285714285714285,
    0.3333333333333333,
    0.2857142857142857,
    0.21428571428571427 
]


   module.exports.sourceCodonScoresEx = sourceCodonScoresEx;
   module.exports.targetCodonScoresEx = targetCodonScoresEx;
   module.exports.geneScoreSourceEx = geneScoreSourceEx;
   module.exports.geneScoreTargetEx = geneScoreTargetEx;
   module.exports.harmonizedSeqEx = harmonizedSeqEx;
   module.exports.harmonizedGeneScoreTargetEx = harmonizedGeneScoreTargetEx;