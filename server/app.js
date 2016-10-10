import express from 'express'
import errorHandler from './middlewear/errorHandler'
import db from 'sequelize-connect'
import path from 'path'
import pollController from './controllers/pollController'
import bodyParser from 'body-parser'
import voteController from './controllers/voteController'
async function connect(){
	db.discover = path.join(__dirname,'models')
	//console.log(path.join(__dirname,'models'))
	db.matcher = function shouldImportModel(modelFileName){
		return true
	}
	await db.connect('addvote_schema','priyanka','priyanka',{
		force:false
	})
}
(async function() {
  try{
	await connect()
  } catch (err){
  	console.log(`An error occured when connecting: ${err}`)
  }
const app = express()
app.use(bodyParser.json())
app.post('/api/poll',pollController.handlePost)
app.get('/api/poll/:pollId',pollController.handleGet)
app.post('/api/vote',voteController.handlePost)
app.use(errorHandler)
const port = 3000
app.listen(port,()=>console.log(`Running on port ${port}`))
})()