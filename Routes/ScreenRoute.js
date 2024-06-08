const express = require('express');
const Screen = require('../Models/ScreenModel');
const router = express.Router();

router.post('/', async (req, res) => {
  const { screenName, orgNumber } = req.body;

  try {
    const newScreen = new Screen({ screenName, orgNumber });
    await newScreen.save();
    res.status(201).json(newScreen);
  } catch (error) {
    res.status(400).json({ success: "fail", error: error.message });
  }
});

router.post('/findorgcodeonly', async (req, res) => {
  const { orgnumber } = req.body;
  try {
    if (orgnumber !== process.env.ORG_CODE) {    
      return res.status(400).json({ success: false, message: "Organisation code not found", data: null });
    }
    const newScreen = {}; // Assuming you have some logic to define `newScreen`
    return res.status(200).json({ data: newScreen, success: true, message: "Organisation code verification successful" });
  } catch (error) {
    console.log("Internal server error:", error);
    return res.status(500).json({ success: false, error: "Internal server error", data: null });
  }
});

router.post('/findscreenonly', async (req, res) => {
  const { screenName } = req.body;
  const orgcode = process.env.ORG_CODE;
  try {
    const origScreen = await Screen.findOne({ screenName });
    if (origScreen !== null) {
      return res.status(400).json({ success: false, message: "Screen name is already taken!", data: null });
    }
    const newScreen = new Screen({ screenName, orgNumber: orgcode });
    await newScreen.save();
    return res.status(200).json({ data: newScreen, success: true, message : "Request sent successfully" });
  } catch (error) {
    console.log("Internal server error:", error);
    return res.status(500).json({ success: false, error: "Internal server error", data: null });
  }
});

router.post('/findscreenorgcode', async (req, res) => {
  const { orgcode, screenname } = req.body;
  console.log(process.env.ORG_CODE)
  console.log(orgcode)
  console.log(screenname)
  try {
    const origScreen = await Screen.findOne({ screenName : screenname });
    if (origScreen !== null) {
      return res.status(400).json({ success: false, message: "Please fill the credentials carefully", data: null });
    }
    if (orgcode !== process.env.ORG_CODE) {    
      return res.status(400).json({ success: false, message: "Please fill the credentials carefully", data: null });
    }
    const newScreen = new Screen({ screenName : screenname, orgNumber: orgcode });
    await newScreen.save();
    res.status(201).json({newScreen : newScreen, success: true, message : "Request sent successfully"});
  } catch (error) {
    console.log("Internal server error:", error);
    return res.status(500).json({ success: false, error: "Internal server error", data: null });
  }
});

module.exports = router;
