const fs = require('fs');
const axios = require('axios');

const filePath = './driver_location_log.json';
const endpoint = 'http://localhost:3000/location';

async function run() {
  const raw = fs.readFileSync(filePath);
  const locations = JSON.parse(raw);

  // Sort updates by time_offset_sec
  locations.sort((a, b) => a.time_offset_sec - b.time_offset_sec);

  const startTime = Date.now(); // T₀

  for (const loc of locations) {
    const now = Date.now();
    const targetTime = startTime + loc.time_offset_sec * 1000;
    const waitTime = targetTime - now;

    if (waitTime > 0) {
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    const payload = {
      driver_id: loc.driver_id,
      latitude: loc.latitude,
      longitude: loc.longitude,
      timestamp: new Date().toISOString() // Client-side timestamp
    };

    try {
      const res = await axios.post(endpoint, payload);
      console.log(`[Sent @ ${new Date().toISOString()}] ${loc.driver_id} ->`, res.data.message || 'OK');
    } catch (err) {
      console.error(`[Error] Failed to send for ${loc.driver_id}:`, err.message);
    }
  }

  console.log('All location updates sent.');
}

run();
