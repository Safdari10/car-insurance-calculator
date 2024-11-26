const express = require("express")


const api = express()

api.use(express.urlencoded({ extended: true }))
api.use(express.json())
