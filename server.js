const express = require('express')
const app = express()

const http = require('http').Server(app)

const io = require('socket.io')(http)

// console.log(req.get('host'))	


app.get('/',function(req,res){
	res.sendFile(__dirname+'/ChatMessangerUI.html')
})

app.get('/marvel-room',function(req,res){
	res.sendFile(__dirname+ '/MessagingUI.html')
})

app.get('/dc-room',function(req,res){
	res.sendFile(__dirname+ '/MessagingUI.html')
})

app.get('/anime-room',function(req,res){
	res.sendFile(__dirname+'/MessagingUI.html')
})





var marvel_room = io.of('/marvel-room')
// console.log(marvel_room)
marvel_room.on('connection',function(socket){
	console.log('Marvel Room connected')


	//listen to message from client and then emit it to clinet again
	socket.on('newmsg',function(data){
		console.log('here is  a message ' + data.description)
		marvel_room.emit('broadcast',data)
		console.log('gone')
	})
	
	socket.on('disconnect',function(){
		console.log('Marvel Room Disconnected')
	})
})

///////////////////////////////////////////////////////////////////////////////

var dc_room = io.of('/dc-room')

dc_room.on('connection',function(socket){
	console.log('DC Room connected')

	//listen to message from client and then emit it to clinet again 
	socket.on('newmsg',function(data){
		dc_room.emit('broadcast',data)

	})

	socket.on('disconnect',function(){
		console.log('DC Room Disconnected')
	})
})

////////////////////////////////////////////////////

var anime_room = io.of('/anime-room')

anime_room.on('connection',function(socket){
	console.log('Anime Room Connected')

	socket.on('newmsg',function(data){
		anime_room.emit('broadcast',data)
	})

	socket.on('disconnect',function(){
		console.log('Anime Room Disconnected')
	})
})

http.listen(process.env.PORT || 5000 ,function(){
	console.log('Listening on port 5000')
})