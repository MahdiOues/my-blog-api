
let users = [
{ id: 1 , name : 'Muzan ', email : 'muzan@gmail.com ', role:"Admin" } ,
{ id: 2 , name : 'Naomi ', email : 'naomi@gmail.com', role:"User" } ,

];
let prochaineId = 3;
const {estNonVide, estEmailValide}= require('../utils/validators')
const getAllUsers = (req,res) => {
const {name} =req.query;
    let result=users;
    if (name){
        result=users.filter(a => a.name ===name);
    }
    res.json({total : result.length, users: result});
}

const getUserById = (req,res) => {
     const id = Number ( req.params.id) ;
    const user = users. find (a => a.id === id) ;
    if (! user ) {
return res.status (404).json ({ error : 'User ${id} not found ' }) ;
}
res.status(200).json(user) ;
}


const createUser = (req, res) => {
    const { name, email, role } = req.body;

    if (
        !estNonVide(name) ||
        !estEmailValide(email) ||
        !estNonVide(role)
    ) {
        return res.status(400).json({
            error: "Name, email and role are required"
        });
    }

    const newUser = {
        id: prochaineId,
        name: name,
        email: email,
        role: role
    };

    prochaineId++;

    users.push(newUser);

    res.status(201).json({
        message: "User created",
        user: newUser
    });
};

const updateUser =(req, res) => {
    const id = Number(req.params.id);
    const {name,email,role} = req.body;
    
    const index = users.findIndex(a => a.id ===id);
    if (index === -1){
        return res.status(404).json({error: `User ${id} not found`})
    }
    if (name) users[index].name = name;
    if (email) users[index].email = email;
    if (role) users[index].role = role;
    res . status (200) . json ({ message : 'Article mis à jour', email : users [ index ] }) ;
}
const deleteUser = (req , res) => {
const id = Number ( req. params .id) ;
const userExiste = users . some (a => a.id === id) ;
if (!userExiste ) {
return res. status (404) . json ({ error : 'Impossible de supprimer : user ${id} introuvable' }) ;
}
users = users.filter(a => a.id !== id);
res.status(200).json ({ message : 'User ${id} supprimé avec succès' }) ;
};
module.exports={
getAllUsers,
getUserById,
createUser,
updateUser,
deleteUser
};