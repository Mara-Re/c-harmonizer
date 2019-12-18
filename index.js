const express = require('express');
const app = express();
const compression = require('compression');
const seq = require('./seq-calculations');


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
   
    try {
        // db.saveSeqInput(req.body.gene, req.body.refSource, req.body.refTarget);
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
        // res.json({
        //     hardCoded: true,
        //     sourceCodonScores: sourceCodonScoresEx,
        //     targetCodonScores:targetCodonScoresEx,
        //     harmonizedGeneSeq: harmonizedSeqEx,
        //     geneScoreSource: geneScoreSourceEx,
        //     geneScoreTarget: geneScoreTargetEx,
        //     harmonizedGeneScoreTarget: harmonizedGeneScoreTargetEx
        // });
        


    } catch (err) {
        console.log('err in saveSeqInput: ', err);
        res.json({
            error: true,
            sourceCodonScores,
            targetCodonScores,
            harmonizedGeneSeq,
            geneScoreSource,
            geneScoreTarget,
            harmonizedGeneScoreTarget
        });
    }
});



//----------------* ROUTE----------------
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 8080, function() {
    console.log("I'm listening.");
});
