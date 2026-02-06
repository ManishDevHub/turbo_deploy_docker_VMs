
import express from 'express'

import prisma from '../../packages/db'


const app = express();

app.use(express.json());

app.get('/users' , async ( req , res) => {
    try{

        const user = await prisma.user.findMany();
    res.status(200).json({
        user
    })

    }catch(err){
        console.error(err);
        res.status(500).json({message: " Something went wronge"})
    }
})

app.post('/user' , async( req , res) => {

    const { username , password } = req.body;

    if( !username || !password ){
        return res.status(400).json({ message: " Username and Password are required"});
    }

    await prisma.user.create({
        data:{
            username:username,
            password: password
        }
    })

    res.status(200).json({ message: " User successfully created"})
})

app.get('/todos',async ( req , res) => {

    try{

        const data = await prisma.todo.findMany()

        if(! data ){
            return res.status(404).json({ message: " Todo Not found"})
        }
        res.status(200).json({
            data
        })

    }catch(err){
        console.error(err);
        res.status(500).json({message: " Server error"})
    }
})

app.post('/todo/create' , async( req , res) => {
    
    try{

        const { task , userId } = req.body;
        if( !task || !userId ){
            return res.status(400).json({ message: " Task and userId required"});
        }

        await prisma.todo.create({
            data:{
                task: task,
                userId: userId
            }
        })

        res.status(200).json({ message: " Todo created successfully"});
    }catch(err){
        console.error(err);
         res.status(500).json({ message : " server Error Todo not created"})
    }

})

app.get('/todo/:userId', async( req, res) => {
    try{

        const userId = req.params.userId;
        const data = await prisma.todo.findMany({
            where:{ userId: userId}
        })
        if( ! data){
            return res.status(404).json({ message : " todo not found "})
        }

        res.status(200).json(data)

    }catch( err) {
        console.error(err);
        res.status(500).json({ message: " Server error todo not found "});
    }
})

app.post('/todo/:id', async( req , res) => {
    try{ 
       const { task  } = req.body;
        const id = req.params.id;
       

    await prisma.todo.update({
      where:{
        id:id,
        
      },
      data:{
        task:task,
      }
    })

    }catch(err){
        console.error(err);

        res.status(500).json({ message: " server error failed to update todo"})
    }
})

app.patch("/todo/:id", async (req, res) => {
  const todo = await prisma.todo.update({
    where: { id: (req.params.id) },
    data: { done: true },
  });

  res.status(200).json({ data: todo });
});



app.delete('/todo/:id', async( req , res) => {
    try{

        const id = req.params.id
         const data = await prisma.todo.delete({
            where:{ id: id}
        })

        if( !data){
            return res.status(404).json({ message: "todo not deleted . "})
        }

    } catch( err){
        console.error(err);

        res.status(500).json({ message: " server error failed to delete todo"})
    }
})



app.listen( 8080 , () => {
    console.log( " server running on port 8080")
})