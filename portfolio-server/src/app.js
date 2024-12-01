const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');
const { exec } = require('child_process');

const configureRoutes = require('./routes');
const KintoneService = require('./services/kintoneService');
const { log } = require('console');

const PORT = process.env.PORT || 5000;

// Load environment variables from .env file
dotenv.config();

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, "../../portfolio-client/dist")));

app.use(cors({ origin: '*' }));

// Configure routes
configureRoutes(app);

// Schedule a cron job
cron.schedule('0 4 * * *', async () => {
  console.log('syncing with kintone');
  await KintoneService.syncData();
});

app.get('/test', (req, res)=>{
  res.status(200).json({message: "anime-1234"});
});

app.post('/aws-prod', (req, res) => {
  console.log('Received request to push changes to GitHub.');

  // Commit message with timestamp
  const commitMessage = `Auto-update via /aws-prod API: ${new Date().toISOString()}`;

  // Stage all changes, commit, and push
  exec(`git add . && git commit -m "${commitMessage}" && git push origin aws-prod`, { cwd: process.cwd() }, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error during git operations: ${stderr}`);
      res.status(500).send('Error committing and pushing changes to GitHub.');
      return;
    }

    console.log(`Git push output: ${stdout}`);
    res.status(200).send('Changes pushed to GitHub successfully.');
  });
});

// Add webhook listener for GitHub push events
app.post('/github-webhook', (req, res) => {
  if (req.headers['x-github-event'] === 'push') {
    console.log('GitHub push event detected. Pulling latest code...');
    // Pull the latest changes from the repository
    exec('git pull', { cwd: process.cwd() }, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error pulling code: ${stderr}`);
        res.status(500).send('Error pulling code.');
        return;
      }

      console.log(`Git pull output: ${stdout}`);
      console.log('Server code updated successfully.');
      res.status(200).send('Code updated successfully.');
    });
  } else {
    res.status(400).send('Invalid event type.');
  }
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../portfolio-client/dist/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
