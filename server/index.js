const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./connection');
const urlRoutes = require('./routes/url');
const URL = require('./models/url');

app.use(cors());
app.use(express.json());
app.use('/url', urlRoutes);

app.get('/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId: shortId,
        },
        {
            $push: {
                visitHistory: { timestamp: Date.now() }
            }
        }
    );
    
    if (!entry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }
    
    res.redirect(entry.redirectUrl);
})

const PORT = 3000;

connectDB('mongodb://localhost:27017/urlshortner').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)}); 