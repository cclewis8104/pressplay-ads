const express = require('express');
const app = express();
const port = 3001;
const path = require('path');

// Allow Unity's web requests
app.use('/assets', express.static(path.join(__dirname, 'public')));

// Serve a static ad image
// app.get('/v1/ad', (req, res) => {
//     const placementId = req.query.placementId;
    
//     let imageFile;
  
//     switch (placementId) {
//       case 'downtown':
//         imageFile = 'ad1.png';
//         break;
//       case 'stadium':
//         imageFile = 'ad2.png';
//         break;
//       default:
//         imageFile = 'fallback.png';
//         break;
//     }
    
//     const imagePath = path.join(__dirname, 'ad-assets', imageFile);
//     console.log(`Serving ad for placement: ${placementId} -> ${imageFile}`);
//     res.sendFile(imagePath);
//   });

// Serve ad image v2
app.get('/v1/ad', (req, res) => {
    const placementId = req.query.placementId;
  
    let metadata = {
      placementId,
      campaign: "Default Campaign",
      imageUrl: "http://localhost:3001/assets/fallback.png",
      creativeId: "fallback",
      clickUrl: "https://default-landing-page.com"
    };
  
    switch (placementId) {
      case 'downtown':
        metadata = {
          placementId,
          campaign: "SneakerDrop2025",
          imageUrl: "http://localhost:3001/assets/ad1.png",
          creativeId: "ad1",
          clickUrl: "https://sneakerstore.com"
        };
        break;
      case 'stadium':
        metadata = {
          placementId,
          campaign: "EnergyBlast",
          imageUrl: "http://localhost:3001/assets/ad2.png",
          creativeId: "ad2",
          clickUrl: "https://energyblast.gg"
        };
        break;
    }
  
    res.json(metadata);
  });



app.listen(port, () => {
  console.log(`Mock ad server running at http://localhost:${port}`);
});
