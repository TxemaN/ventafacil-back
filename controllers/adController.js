const { getAllAds } = require('../models/adsModel');


const getAds = async (req, res) => {
    //   
    let data;
    try {
        const { } = req.body;
        
            data = await getAllAds();


        res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Contacte el adm'
        });

    }
};



module.exports = {
    getAds,
}