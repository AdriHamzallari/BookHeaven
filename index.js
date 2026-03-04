const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;
let books = [
    { id: 1, title: "The Silent Echo", author: "Jane Harper" },
    { id: 2, title: "Midnight Horizon", author: "Elena Voss" },
    { id: 3, title: "Fragments of Time", author: "Adrian Cole" }
];
//GET
app.get('/api/books', (req, res) => {
    res.json(books);
});
app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});
