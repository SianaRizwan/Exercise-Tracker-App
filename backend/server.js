const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const exerciseRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 9000

app.use(cors())
app.use(express.json())

//DB config
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
        })
        console.log('MongoDB connected')
    }

    catch(err){
        console.error(err.message)
        process.exit(1)
    }
}

connectDB()

app.use('/exercises', exerciseRouter)
app.use('/users', usersRouter)

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})
