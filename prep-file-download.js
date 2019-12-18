function createScoreDataStr(headerArr, data1, data2, data3) {
    const splitData1 = data1.split(',');
    const splitData2 = data2.split(',');
    const splitData3 = data3.split(',');
    
    const dataArr =  splitData1.map((value, i) => {
        return [value, splitData2[i], splitData3[i]].join('\t');
    });
    return [headerArr.join('\t'), ...dataArr].join('\n');
}

function createCodonScoreStr(headerArr, codonScoreArr) {
    const dataArr = codonScoreArr.map(obj => {
        return [obj.aA, obj.codon, obj.scoreSource, obj.scoreTarget].join('\t')
    });
    console.log('dataArr: ', dataArr);
    return [headerArr.join('\t'), ...dataArr].join('\n');
}

module.exports.createScoreDataStr = createScoreDataStr;
module.exports.createCodonScoreStr = createCodonScoreStr;