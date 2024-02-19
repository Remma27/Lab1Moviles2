/* eslint-disable prettier/prettier */
// index.mjs
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import multer from 'multer';

const app = express();
const PORT = 3000;

// Configure multer for file uploads
const upload = multer({
    limits: {
        files: 10, // Allow up to 2 files per request
    },
});

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/volcanoes')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    });

// Create a mongoose schema for the Volcano model
const volcanoSchema = new mongoose.Schema({
    name: String,
    information: String,
    // eslint-disable-next-line no-undef
    images: [Buffer], // Use Buffer type for images
});

// Create a mongoose schema for the comments model
const commentsSchema = new mongoose.Schema({
    name: String,
    comment: String,
});

// Create a mongoose model for the Volcano collection
const Volcano = mongoose.model('Volcano', volcanoSchema);

// Create a mongoose model for the Comments collection
const Comments = mongoose.model('Comments', commentsSchema);


app.get('/volcanoes', async (_, res) => {
    try {
        // Retrieve all volcanoes from the database
        const volcanoes = await Volcano.find({});

        // Check if there are no volcanoes
        if (volcanoes.length === 0) {
            return res.status(404).json({ error: 'No volcanoes found' });
        }

        // Convert Buffer images to base64 encoded strings
        const volcanoesWithImages = volcanoes.map(volcano => ({
            ...volcano._doc,
            images: volcano.images.map(imageBuffer => imageBuffer.toString('base64')),
        }));

        res.json(volcanoesWithImages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/volcanoes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid volcano ID' });
        }

        // Find a volcano by its id in the database
        const volcano = await Volcano.findById(id);

        // Check if the volcano is not found
        if (!volcano) {
            return res.status(404).json({ error: 'Volcano not found' });
        }

        // Convert Buffer images to base64 encoded strings
        const volcanoWithImages = {
            ...volcano._doc,
            images: volcano.images.map(imageBuffer => imageBuffer.toString('base64')),
        };

        res.json(volcanoWithImages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/volcanoes', upload.array('images', 10), async (req, res) => {
    try {
        // Extract data from the request body
        const { name, information } = req.body;
        const images = req.files.map(file => file.buffer);

        // Validate required fields
        if (!name || !information || !images || images.length === 0) {
            return res.status(400).json({ error: 'Please provide name, location, elevation, and at least one image' });
        }

        // Validate the data types
        if (name && typeof name !== 'string') {
            return res.status(400).json({ error: 'Invalid data type for name' });
        }
        if (information && typeof information !== 'string') {
            return res.status(400).json({ error: 'Invalid data type for location' });
        }
        if (images && !Array.isArray(images)) {
            return res.status(400).json({ error: 'Invalid data type for images' });
        }


        // Validate the number of images
        if (images.length > 10) {
            return res.status(400).json({ error: 'Exceeded the maximum allowed number of images (10)' });
        }

        // Create a new volcano in the database
        const newVolcano = await Volcano.create({ name, information, images });

        // Respond with the created volcano
        res.status(201).json({ message: 'Volcano created successfully', volcano: newVolcano });
    } catch (error) {
        console.error(error);

        // Handle specific MongoDB validation error
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
});



app.patch('/volcanoes/:id', upload.array('images', 10), async (req, res) => {
    const id = req.params.id;
    const { name, information, images } = req.body;

    try {
        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid volcano ID' });
        }

        // Validate required fields
        if (!name && !information && !images) {
            return res.status(400).json({ error: 'Please provide at least one field to update' });
        }

        // Validate the data types
        if (name && typeof name !== 'string') {
            return res.status(400).json({ error: 'Invalid data type for name' });
        }
        if (information && typeof information !== 'string') {
            return res.status(400).json({ error: 'Invalid data type for location' });
        }
        if (images && !Array.isArray(images)) {
            return res.status(400).json({ error: 'Invalid data type for images' });
        }

        // Validate the number of images
        if (images && images.length > 10) {
            return res.status(400).json({ error: 'Exceeded the maximum allowed number of images (10)' });
        }

        // Find a volcano by its id in the database and update its fields
        const updatedVolcano = await Volcano.findByIdAndUpdate(id, { name, information, images }, { new: true });
        if (updatedVolcano) {
            res.json({ message: 'Volcano updated successfully', volcano: updatedVolcano });
        } else {
            res.status(404).json({ error: 'Volcano not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.delete('/volcanoes/:id', async (req, res) => {
    const id = req.params.id;

    try {
        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid volcano ID' });
        }

        // Find a volcano by its id in the database and remove it
        const deletedVolcano = await Volcano.findOneAndDelete({ _id: id });

        if (deletedVolcano) {
            res.json({ message: 'Volcano deleted successfully', volcano: deletedVolcano });
        } else {
            res.status(404).json({ error: 'Volcano not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Comments CRUD operations
app.get('/comments', async (_, res) => {
    try {
        // Retrieve all comments from the database
        const comments = await Comments.find({});

        // Check if there are no comments
        if (comments.length === 0) {
            return res.status(404).json({ error: 'No comments found' });
        }

        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/comments/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid comment ID' });
        }

        // Find a comment by its id in the database
        const comment = await Comments.findById(id);

        // Check if the comment is not found
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/comments', async (req, res) => {
    try {
        // Extract data from the request body
        const { name, comment } = req.body;

        // Validate required fields
        if (!name || !comment) {
            return res.status(400).json({ error: 'Please provide name and comment' });
        }

        // Validate the data types
        if (name && typeof name !== 'string') {
            return res.status(400).json({ error: 'Invalid data type for name' });
        }
        if (comment && typeof comment !== 'string') {
            return res.status(400).json({ error: 'Invalid data type for comment' });
        }

        // Create a new comment in the database
        const newComment = await Comments.create({ name, comment });

        // Respond with the created comment
        res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (error) {
        console.error(error);

        // Handle specific MongoDB validation error
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
});



app.patch('/comments/:id', async (req, res) => {
    const id = req.params.id;
    const { name, comment } = req.body;

    try {
        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid comment ID' });
        }

        // Validate required fields
        if (!name && !comment) {
            return res.status(400).json({ error: 'Please provide at least one field to update' });
        }

        // Validate the data types
        if (name && typeof name !== 'string') {
            return res.status(400).json({ error: 'Invalid data type for name' });
        }
        if (comment && typeof comment !== 'string') {
            return res.status(400).json({ error: 'Invalid data type for comment' });
        }

        // Find a comment by its id in the database and update its fields
        const updatedComment = await Comments.findByIdAndUpdate(id, { name, comment }, { new: true });
        if (updatedComment) {
            res.json({ message: 'Comment updated successfully', comment: updatedComment });
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.delete('/comments/:id', async (req, res) => {
    const id = req.params.id;

    try {
        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid comment ID' });
        }

        // Find a comment by its id in the database and remove it
        const deletedComment = await Comments.findOneAndDelete({ _id: id });

        if (deletedComment) {
            res.json({ message: 'Comment deleted successfully', comment: deletedComment });
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
