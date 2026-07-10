const express =require('express');
const cors =require('cors')
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('users server is testing dddd');
});
const users =[
    { id:1, name: 'hanjala', email:'hanjala@gmail.com'},
    { id:2, name: 'habib', email:'habib@gmail.com'},
    { id:3, name: 'rasel', email:'reasel@gmail.com'},
    { id:4, name: 'naser', email:'naser@gmail.com'},
    { id:5, name: 'labiba', email:'labiba@gmail.com'},
    { id:6, name: 'humura', email:'humura@gmail.com'},
]

app.get('/users',(req,res)=>{
    res.send(users);
});

app.post('/users',(req,res)=>{
    console.log('post method called',req.body);
    const newUser=req.body;
    newUser.id=users.length+1;
    users.push(newUser);
    res.send(newUser);
})

app.listen(port,()=>{
    console.log(`users server started on port : ${port}`);
});

