let articles = [
{ id: 1 , title : 'Welcome to the blog ', author : 'Admin ' } ,
{ id: 2 , title : 'My first Express server ', author : 'Aya' } ,
{ id: 3 , title : 'Testing an API with Postman ', author : 'Aya ' }
];
let prochaineId = 4;

 const getAllArticles =(req,res) =>    {

 const {author} = req.query;
    let result=articles;
    if (author){
        result=articles.filter(a => a.author ===author);
    }
    res.status(200).json({total : result.length, articles: result});
 };


 const getArticleById = (req,res) => {
    const id = Number( req.params.id) ;
    const article = articles.find(a => a.id === id) ;
    if (!article ) {
return res.status(404).json({ error : 'Article ${id} not found' }) ;
}

res.status(200).json (article) ;
 }

const createArticle =(req, res) => {
const{ title , author } = req.body ; // destructuring ( Step 5)
if (!title || !author ) { // validation : both fields are strictly required
return res.status (400).json ({ error : "Title and author are required " }) ;
}
const newArticle = { id: nextId , title : title , author : author };
nextId = nextId + 1;
articles.push ( newArticle ) ;
res.status(201).json ({ message : 'Article created', article : newArticle }) ;
}


const updateArticle =(req, res) => {
    const id = Number(req.params.id);
    const {title,author} = req.body;
    
    const index = articles.findIndex(a => a.id ===id);
    if (index === -1){
        return res.status(404).json({error: 'Article ${id} introuvable'})
    }
    if (title) articles[index].title = title;
    if (author) articles[index].author = author;
    res . status (200) . json ({ message : 'Article mis à jour', article : articles [ index ] }) ;
}
const deleteArticle = (req , res) => {
const id = Number ( req. params .id) ;
const articleExiste = articles . some (a => a.id === id) ;
if (!articleExiste ) {
return res. status (404) . json ({ error : 'Impossible de supprimer : article ${id} introuvable' }) ;
}
articles = articles.filter (a => a.id !== id) ;
res.status(200).json ({ message : 'Article ${id} supprim é avec succès' }) ;
};

module.exports = {
getAllArticles,
getArticleById,
createArticle,
updateArticle,
deleteArticle
};