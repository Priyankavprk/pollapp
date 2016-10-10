export default function(err,req,res,next){
	if(err){
		res.status(500).json({
			message: "An internal server error occured"
		})
		console.log(`An internal error occured: ${err}`)
	} else {
		next()
	}
}