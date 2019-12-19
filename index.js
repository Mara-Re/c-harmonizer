const express = require('express');
const app = express();
const compression = require('compression');
const seq = require('./seq-calculations');
const prepForFile = require('./prep-file-download');


//----------------FOR TESTING------------------------------
const {
    sourceCodonScoresEx,
    targetCodonScoresEx,
    geneScoreSourceEx,
    geneScoreTargetEx,
    harmonizedSeqEx,
    harmonizedGeneScoreTargetEx
} = require('./hardcoded-examples');
//------------^^^^FOR TESTING------------------------------


//----------------MIDDLEWARE----------------
app.use(compression());
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false, limit: '200kb'}));

//SETUP FOR BUNDLE-SERVER
if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//----------------ROUTES----------------

//----------------SEQ INPUT----------------
app.post('/seq-input.json', async (req, res) => {    
    try {
        //ALL CALCULATIONS
        const {gene, refSource, refTarget} = req.body;
        const sourceCodonScores = seq.calcCodonScoreDict(refSource);
        const targetCodonScores = seq.calcCodonScoreDict(refTarget);
        const geneScoreSource = seq.calcGeneScore(gene, sourceCodonScores);
        const geneScoreTarget  = seq.calcGeneScore(gene, targetCodonScores);
        const harmonizedGeneSeq = seq.calcHarmonizedGeneSeq(gene, geneScoreSource, targetCodonScores);
        const harmonizedGeneScoreTarget = seq.calcGeneScore(harmonizedGeneSeq, targetCodonScores);
        
        const geneScoreSourceSmooth = seq.calcSmoothedScore(geneScoreSource);
        const geneScoreTargetSmooth = seq.calcSmoothedScore(geneScoreTarget);
        const harmonizedGeneScoreTargetSmooth = seq.calcSmoothedScore(harmonizedGeneScoreTarget);
        res.json({
            success: true,
            sourceCodonScores,
            targetCodonScores,
            harmonizedGeneSeq,
            geneScoreSource,
            geneScoreTarget,
            harmonizedGeneScoreTarget,
            geneScoreSourceSmooth,
            geneScoreTargetSmooth,
            harmonizedGeneScoreTargetSmooth
        });
    } catch (err) {
        console.log('err in saveSeqInput: ', err);
        res.json({
            error: true,
            // sourceCodonScores,
            // targetCodonScores,
            // harmonizedGeneSeq,
            // geneScoreSource,
            // geneScoreTarget,
            // harmonizedGeneScoreTarget
        });
    }
});

app.post('/api/results/:data', (req, res) => {
    res.setHeader('Content-Disposition', `attachment;filename=${req.params.data}.txt`);
    let headerArr;
    let dataStr;
    if (req.params.data == 'codon-scores') {
        const codonScores = JSON.parse(`${req.body.codonScores}`);
        headerArr = ['amino acid', 'codon', 'score source', 'score target'];
        dataStr = prepForFile.createCodonScoreStr(headerArr, codonScores);
    }
    if (req.params.data == 'gene-scores') {
        headerArr = ['gene score source', 'gene score target', 'score harmonized gene'];
        dataStr = prepForFile.createScoreDataStr(headerArr, req.body.geneScoreSource, req.body.geneScoreTarget, req.body.harmonizedGeneScoreTarget);
    } 
    if (req.params.data == 'gene-scores-smoothed') {
        headerArr = ['smoothed gene score source', 'smoothed gene score target', 'smoothed score harmonized gene'];
        dataStr = prepForFile.createScoreDataStr(headerArr, req.body.geneScoreSourceSmooth, req.body.geneScoreTargetSmooth, req.body.harmonizedGeneScoreTargetSmooth);
    }
    res.send(dataStr);
});

//----------------* ROUTE----------------
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 8080, function() {
    console.log("I'm listening.");
});
