const { Router, json } = require('express');
const router = Router();
const fs = require('fs');


const json_books = fs.readFileSync('src/books.json', 'utf-8')
const books = JSON.parse(json_books);

router.get('/', (req, res) => {
    res.render('index.ejs', {
        books
    })
})

router.get('/new-book', (req, res) =>{
    res.render('new-book');
})

router.post('/new-book', (req, res) => {
    const {tittle, autor, image, description} = req.body;
    if (!tittle || !autor || !image || !description ) {
        res.status(400).send('escribe todos los campos'); //debo quitar el required en el formulario
        return;
    }
    let newBook = {
        
        tittle,
        autor,
        image,
        description
    }

    books.push(newBook);

    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books, 'utf-8');

    res.redirect('/');
})

module.exports = router;