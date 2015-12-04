var	logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');

 exports.findCourses = function(req, res, next){
 	db.query("SELECT * FROM curriculum_course natural JOIN course WHERE curriculumId=?", [req.params.id], function(err, rows) {
 		if (err) res.send(404, {message: 'Not Found'});
 		else{
 			res.send(200, rows);
 		}
 	});	
 } 