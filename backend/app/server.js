import express from 'express';
import cors from 'cors';
import { parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Helper function to read CSV data
async function readCSV(filename) {
  const filePath = path.join(__dirname, '../data', filename);
  
  return new Promise((resolve, reject) => {
    const records = [];
    
    if (!fs.existsSync(filePath)) {
      resolve([]);
      return;
    }
    
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on('data', (record) => records.push(record))
      .on('end', () => resolve(records))
      .on('error', (error) => reject(error));
  });
}

// API Routes

// Get all awards
app.get('/api/awards', async (req, res) => {
  try {
    const awards = await readCSV('awards.csv');
    res.json({ data: awards, count: awards.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch awards data' });
  }
});

// Get dashboard statistics
app.get('/api/stats', async (req, res) => {
  try {
    const awards = await readCSV('awards.csv');
    
    const stats = {
      totalBids: awards.length,
      totalContractValue: awards.reduce((sum, award) => sum + (parseFloat(award.contract_value) || 0), 0),
      activeVendors: new Set(awards.map(a => a.vendor_name)).size,
      awardsThisYear: awards.filter(a => {
        const year = new Date(a.award_date).getFullYear();
        return year === new Date().getFullYear();
      }).length
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get vendors
app.get('/api/vendors', async (req, res) => {
  try {
    const awards = await readCSV('awards.csv');
    
    const vendorMap = new Map();
    awards.forEach(award => {
      const vendor = vendorMap.get(award.vendor_name) || {
        name: award.vendor_name,
        totalContracts: 0,
        totalValue: 0
      };
      vendor.totalContracts++;
      vendor.totalValue += parseFloat(award.contract_value) || 0;
      vendorMap.set(award.vendor_name, vendor);
    });
    
    const vendors = Array.from(vendorMap.values());
    res.json({ data: vendors, count: vendors.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vendors data' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
