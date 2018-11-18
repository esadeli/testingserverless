'use strict'
require('dotenv').config()

const express = require('express')
const User = require('./user')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_USER,({useNewUrlParser: true}))
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())



app.get('/', (req,res) => { res.send('OK') })

// Testing Post
app.post('/register', (req,res)=> {
    User.create({
        name: req.body.name,
        role: req.body.role
    })
      .then(user => {
          console.log('user create-----', user)
          res.status(201).json({
              msg: 'User created',
              data: user
          })
      })
      .catch(error => {
          console.log('error create-----', error)
          res.status(500).json({
              msg: 'ERROR Create User',
              err: error
          })
      })
})

// Testing Get
app.get('/list', (req,res)=> {
    User.find({})
        .then(users => {
            console.log('list user------')
            res.status(200).json({
                msg: 'List of users',
                data: users
            })
        })
        .catch(error => {
            console.log('error get-----', error)
            res.status(500).json({
                msg: 'ERROR Get List User',
                err: error
            })
        })
})


app.listen(process.env.PORT || 3000, () => { 
    console.log('Listening to PORT ', process.env.PORT)})