import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001; 


app.use(cors());

app.get('/api/suggestions', async (req, res) => {
  const query = req.query.q;
  const apiUrl = `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(query)}`;

  try {
    const fetch = (await import('node-fetch')).default; // Dynamic import
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).send('Error fetching suggestions');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
