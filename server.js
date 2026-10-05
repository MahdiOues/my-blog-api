const express = require ('express') ; // 1. load the Express framework module
const app = express () ; // 2. instantiate the server application
const PORT = 3000;
app.use( express .json () ) ;
const articles = [
{ id: 1 , title : 'Welcome to the blog ', author : 'Admin ' } ,
{ id: 2 , title : 'My first Express server ', author : 'Aya' } ,
{ id: 3 , title : 'Testing an API with Postman ', author : 'Aya ' }
];
const users = [
{ id: 1 , name : 'Muzan ', email : 'muzan@gmail.com ' } ,
{ id: 2 , name : 'Naomi ', email : 'naomi@gmail.com' } ,

];
let nextId = 4;
// app.get('/', (req,res) => {
// res.json({total: articles.length, articles: articles}) ;
// }) ;
app.get('api/articles',(req,res) =>{
    const {author} =req.query;
    let result=articles;
    if (author){
        result=articles.filter(a => a.author ===author);
    }
    res.json({total : result.length, articles: result});
});
app.post ('/api/articles ', (req , res) => {
const{ title , author } = req.body ; // destructuring ( Step 5)
if (!title || !author ) { // validation : both fields are strictly required
return res.status (400).json ({ error : "Title and author are required " }) ;
}
const newArticle = { id: nextId , title : title , author : author };
nextId = nextId + 1;
articles.push ( newArticle ) ;
res.status(201).json ({ message : 'Article created', article : newArticle }) ;
}) ;

app.get('/api/articles/:id', (req,res) => {
    const id = Number ( req.params.id) ;
    const article = articles . find (a => a.id === id) ;
    if (! article ) {
return res.status (404).json ({ error : 'Article ${id} not found ' }) ;
}

res.json (article) ;
}) ;

//Exercice1 get returning an api containing name, app, verion
app.get('/about', (req,res) => {
    res.json({
        application: "Maktba API",
        user: "Mahdi Oueslati",
        version: "1.0"
    })
}) ;
//Exercice2 get returning an api containing users
app.get('/api/users', (req,res) => {
 const {name} =req.query;
    let result=users;
    if (name){
        result=users.filter(a => a.name ===name);
    }
    res.json({total : result.length, users: result});
}) ;


//Exercice3 get returning an api containing user by ID
app.get('/api/users/:id', (req,res) => {
    const id = Number ( req.params.id) ;
    const user = users. find (a => a.id === id) ;
    if (! user ) {
return res.status (404).json ({ error : 'User ${id} not found ' }) ;
}
res.json (user) ;
}) ;


//Exercice 4 add /contact with email and message
app.post ('/contact', (req , res) => {
const{ email , message } = req.body ;   
if (!email || !message ) { 
    return res.status(400).json({ error : "Email and message are required " }) ;
}
res.status(201).json({ message : 'Thank you, your message has been received'
}) 
})

// 4. bind and listen : await incoming HTTP requests on port 3000
app.listen (PORT , () => {
console.log(`Server running at http://localhost:${PORT}`);
}) ;