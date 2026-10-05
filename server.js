const express = require ('express') ; // 1. load the Express framework module
const articleRoutes = require ('./routes/articleRoutes') ;
const userRoutes = require ('./routes/userRoutes') ;
const app = express () ; // 2. instantiate the server application
const PORT = 3000;
app.use( express .json () ) ;


let nextId = 4;
// app.get('/', (req,res) => {
// res.json({total: articles.length, articles: articles}) ;
// }) ;
app.use('/api/articles',articleRoutes);

app.use('/api/users',userRoutes);
app.get('/', (req,res) => {
    res.json ({ message : " API du Blog - Serveur Modulaire Opé rationnel ( SoC)" }) ;

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
 
}) ;


//Exercice3 get returning an api containing user by ID
app.get('/api/users/:id', (req,res) => {
   
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


//Bonus Get api/user/user?name=Aya

app.get('/api/user', (req,res) =>{
 const {name} = req.query;
 let resultat = users;
 if (name) {
    resultat = users.filter(u => u.name === name);
 }
 res.json(resultat);
});



//Exercice 2: destrcution of a table objects
const products = [
{ name : 'Keyboard ', price : 45 } ,
{ name : 'Monitor' , price : 320 } ,
{ name: 'Mouse', price: 25 }
];

//extract name,price of the first table elements
const{name,price}=products[0];
console.log(name,price);
//find
const product_mouse = products.find(p => p.name ==="Mouse");
console.log(product_mouse.price);

//Filter
const priceInfo= products.filter(p=>p.price<100);
console.log(priceInfo);
//Arrow function
const deduction= price => price*0.90;
console.log(deduction(10));



// 4. bind and listen : await incoming HTTP requests on port 3000
app.listen (PORT , () => {
console.log(`Server running at http://localhost:${PORT}`);
}) ;