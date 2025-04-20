const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json()); // middleware to parse JSON bodies


// Log all incoming post requests
app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.url}`);
    next();
  });

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




  //Routes for telemetry (imp tracking)

  app.post('/v1/impression', async (req, res) => {
    const { placementId, creativeId, timestamp } = req.body;
  
    try {
      await prisma.impression.create({
        data: {
          placementId,
          creativeId,
          timestamp: new Date(timestamp)
        }
      });
  
      console.log(`📊 Logged impression: ${placementId} / ${creativeId}`);
      res.sendStatus(200);
    } catch (error) {
      console.error('❌ Failed to save impression:', error);
      res.sendStatus(500);
    }
  });


  app.get('/v1/impression', async (req, res) => {
    try {
      const impressions = await prisma.impression.findMany({
        orderBy: { timestamp: 'desc' }
      });
      res.json(impressions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch impressions' });
    }
  });

  //Routes for creative, placement, campaign

  app.get('/v1/creatives', async (req, res) => {
    const creatives = await prisma.creative.findMany();
    res.json(creatives);
  });

  app.post('/v1/creatives', async (req, res) => {
    const { id, name, imageUrl, clickUrl } = req.body;
    const newCreative = await prisma.creative.create({ data: { id, name, imageUrl, clickUrl } });
    res.status(201).json(newCreative);
  });

  app.get('/v1/placements', async (req, res) => {
    const placements = await prisma.placement.findMany();
    res.json(placements);
  });

  app.post('/v1/placements', async (req, res) => {
    const { id, name, description } = req.body;
    const newPlacement = await prisma.creative.create({ data: { id, name, description } });
    res.status(201).json(newPlacement);
  });


  app.get('/v1/campaigns', async (req, res) => {
    const campaigns = await prisma.campaign.findMany();
    res.json(campaigns);
  });

  app.post('/v1/campaigns', async (req, res) => {
    const { id, name, status } = req.body;
    const newCampaign = await prisma.campaign.create({ data: { id, name, status } });
    res.status(201).json(newCampaign);
  });

  app.get('/v1/assignments', async (req, res) => {
    const assignments = await prisma.assignment.findMany();
    res.json(assignments);
  });
  
  // POST a new assignment
  app.post('/v1/assignments', async (req, res) => {
    const { creativeId, placementId, campaignId } = req.body;
    const assignment = await prisma.assignment.create({
      data: { creativeId, placementId, campaignId },
    });
    res.status(201).json(assignment);
  });



app.listen(port, () => {
  console.log(`Mock ad server running at http://localhost:${port}`);
});
