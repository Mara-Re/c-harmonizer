# c.Harmonizer

c.Harmonizer is a codon harmonization tool. It optimizes codons in a gene of interest depending on source and target organism codon usages. 

**To use the tool online go to:**
https://c-harmonizer.herokuapp.com

## Calculations

**Input of DNA/mRNA sequences**

The tool uses an input of three sequences/set of sequences:

1. Gene of interest (to be harmonized for a desired target host)
2. A set of reference genes for the source organism
3. A set of reference genes for the target organism


**Calculating the Relative Codon Adaptiveness**

The tool splits the sequences into codons and counts all codons in the reference genes. From these counts it calculates the relative codon adaptiveness (RCA) for all codons for both the source and the target organism.


**Determining the best matching codons**

For each codon in the gene of interest the tool searches for the best matching codon for the target organism. c.Harmonizer chooses the codon with the lowest difference in the rcaScore.


**Input formats**

- The sequences can be entered as DNA (ATGC) or mRNA (AUGC) sequences (case insensitive).
- The sequences can be entered as pure sequences or in fasta format (or multi fasta for the set of reference genes).
- Characters in the sequences other than A T/U C G are ignored (warning will be displayed).
- For sequences that are not devisible by 3, the respective amount of characters at the end will be ignored (warning will be displayed).

## Participate

Feel free to comment, fork, and submit pull requests.

## License

The c.Harmonizer project is released under the [GNU General Public License v3.0](https://github.com/Mara-Re/charmonizer/blob/master/LICENSE.md).