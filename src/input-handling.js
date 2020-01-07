export function cleanSequence(userInput) {
    if (!userInput || userInput == '' || userInput.trim() == '') {
        return undefined;
    }
    //if input is not empty:    
    //-----FASTA handling--------- 
    let seqArr = userInput.trim().split('\n'); //split on new lines -> to check for fasta
    let geneArr;
    let joinedGenes;
    let errors = [];
    if (seqArr[0].startsWith('>')) {        //if gene or ref genes are entered in fasta format
        geneArr = seqArr.reduce((acc, el) => {
            if (el.startsWith('>')) {
                return [...acc, []];
            } else {                //returns an array of all the genes
                return [...acc.splice(0, acc.length -1), acc[acc.length -1] + el];
            }
        }, []);           
        joinedGenes = geneArr.join('');
    } else {    
        joinedGenes = userInput;
    }
    //replace whitespace characters, convert to upper case and replace rna (U) to dna (T)
    joinedGenes = joinedGenes.replace(/\s/g,"").toUpperCase().replace(/U/g, 'T');

    
    //------USER DNA INPUT WARNINGS

    //WARNING if input contains characters other than ATCG (U)
    if ((/[^atgcu]/i).test(joinedGenes)) {
        errors.push('Your sequence contains characters other than ATGC/AUGC which will be ignored.')
        //REMOVE CHARACTERS
        joinedGenes = joinedGenes.replace(/[^atgcu]/ig, '');
    }

    //WARNING: input DNA sequence is not divisible by 3
    if (joinedGenes.length % 3 != 0) {
        //REMOVE x characters at the end of the sequence
        const x = joinedGenes.length % 3;
        errors.push('Your gene sequence is not divisible by 3. Therefore, the last ' + x + ' bases will be ignored.');     
        joinedGenes = joinedGenes.slice(0, joinedGenes.length - x);
    }
    
    //WARNING: input DNA sequence does not start with A
    if (!joinedGenes.startsWith('ATG')) {
        errors.push('Your sequence does not start with a start codon. Are you sure you want to continue?');
    }
    return {
        cleanedSeq: joinedGenes,
        errors: errors
    };

    //FOR GENE, optional
    //if entered DNA contains stop codons -> warn user and ask whether they want to proceed
    //FOR REFS, optional
    //Checking for Start/Stop codons only if fasta format was entered!
}    
