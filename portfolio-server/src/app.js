const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');
const { exec } = require('child_process');
const util = require('util');

// Promisify exec to use async/await
const execAsync = util.promisify(exec);

const configureRoutes = require('./routes');
const KintoneService = require('./services/kintoneService');

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

// Serve static files (e.g., React frontend)
app.use(express.static(path.resolve(__dirname, "../../portfolio-client/dist")));

// Configure application routes
configureRoutes(app);

// Define an async function to sync with GitHub
async function syncWithGitHub() {
  try {
    console.log('Checking for updates from GitHub...');
    
    // Pull the latest changes
    const { stdout, stderr } = await execAsync('git reset --hard HEAD && git pull', {
      cwd: process.cwd(),
    });

    if (stderr) {
      console.error(`Git pull error: ${stderr}`);
    }

    console.log(`Git pull output: ${stdout}`);
    console.log('Successfully pulled the latest code.');
  } catch (error) {
    console.error(`Error during GitHub sync: ${error.message}`);
  }
}

// Define an async function to push changes to GitHub
async function pushToGitHub() {
  try {
    console.log('Pushing changes to GitHub...');
    const commitMessage = `Auto-update via /aws-prod API: ${new Date().toISOString()}`;
    const { stdout, stderr } = await execAsync(`git add . && git commit -m "${commitMessage}" && git push origin aws-prod`, {
      cwd: process.cwd(),
    });

    if (stderr) {
      console.error(`Git push error: ${stderr}`);
    }

    console.log(`Git push output: ${stdout}`);
    console.log('Changes pushed to GitHub successfully.');
  } catch (error) {
    console.error(`Error during GitHub push: ${error.message}`);
  }
}

// Add webhook listener for GitHub push events
app.post('/github-webhook', async (req, res) => {
  if (req.headers['x-github-event'] === 'push') {
    console.log('GitHub push event detected. Pulling latest code...');
    await syncWithGitHub();
    res.status(200).send('Code updated successfully.');
  } else {
    console.error('Invalid GitHub event type.');
    res.status(400).send('Invalid event type.');
  }
});

// Add endpoint to manually push changes to GitHub
app.post('/aws-prod', async (req, res) => {
  console.log('Received request to push changes to GitHub...');
  await pushToGitHub();
  res.status(200).send('Changes pushed to GitHub successfully.');
});

// Schedule a cron job to sync with GitHub every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log('Running scheduled GitHub sync...');
  await syncWithGitHub();
});

// Kintone cron job example
cron.schedule('0 4 * * *', async () => {
  console.log('Syncing with Kintone...');
  try {
    await KintoneService.syncData();
    console.log('Successfully synced with Kintone.');
  } catch (error) {
    console.error(`Error syncing with Kintone: ${error.message}`);
  }
});

// Test endpoint
app.get('/test', (req, res) => {
  res.status(200).json({ message: "aji buju" });
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../portfolio-client/dist/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
