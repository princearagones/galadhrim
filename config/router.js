var degreeProgram = require(__dirname + '/../gil-galad/controllers/degree-program');
var curriculum = require(__dirname + '/../gil-galad/controllers/curriculum');
var curriculum_course = require(__dirname + '/../gil-galad/controllers/api/curriculum_course');
var finalize = require(__dirname + '/../gil-galad/controllers/api/ocm/finalize');
var course = require(__dirname + '/../gil-galad/controllers/api/courses');
var password = require(__dirname + '/../gil-galad/controllers/api/password/reset_password');
var planOfStudy = require(__dirname + '/../gil-galad/controllers/api/plan_of_study');
//var grades = require(__dirname + '/../gil-galad/controllers/api/students'); //why is it here?
var employees = require(__dirname + '/../gil-galad/controllers/api/employees');
var studentRecord = require(__dirname + '/../gil-galad/controllers/api/student-record');
var assignFaculty = require(__dirname + '/../gil-galad/controllers/api/ocm/assign_faculty');
var waitlist = require(__dirname + '/../gil-galad/controllers/api/ocm/waitlist');
var section = require(__dirname + '/../gil-galad/controllers/api/section');
var announcement = require(__dirname + '/../gil-galad/controllers/api/announcement');
var unit = require(__dirname + '/../gil-galad/controllers/api/unit');

 module.exports = function(router, logger) {
 	router.all('*', function (req, res, next) {
 		logger.log('verbose', req.method);
 		logger.log('verbose', req.params);
 		logger.log('verbose', req.query);
 		logger.log('verbose', req.body);
 		next();
 	});

 	router.route('/degree-programs')
 		.get(degreeProgram.find)
 		.post(degreeProgram.insert);

 	router.route('/degree-programs/:id')
 		.get(degreeProgram.findOne)
 		.put(degreeProgram.update)
 		.delete(degreeProgram.remove);

 	router.route('/curriculum')
 		.get(curriculum.find)
 		.post(curriculum.insert);

 	router.route('/curriculum/:id')
 		.get(curriculum.findOne)
 		.put(curriculum.update)
 		.delete(curriculum.remove);

 	router.route('/api/curriculum-course/:id')
 		.get(curriculum_course.findCourses)

 	router.route('/api/unit/')
		.get(unit.find);

	router.route('/api/units/:id')
		.get(unit.findOne);

	router.route('/api/sections')
 		.post(section.insert);

	router.route('/api/ocm/finalize/:id')
		.put(finalize.update);

	router.route('/api/password/reset/:id')
		.get(password.reset);

	router.route('/api/courses')
		.get(course.find)
		.post(course.insert);

  router.route('/api/courses/:id')
    .put(course.remove);

	router.route('/api/plan-of-study/:id')
		.get(planOfStudy.findOne)
		.put(planOfStudy.update);

	router.route('/api/plan-of-study/:courseId/:curriculumId/:studentId')
		.post(planOfStudy.insert);

	/*router.route('/api/students/:id/grades') //nasan ito ?
		.get(grades.findstudentGrade);
*/
	router.route('/api/employees')
		.get(employees.findEmployees);

	router.route('/api/student-record/:id')
		.get(studentRecord.findAStudentRecord);

	router.route('/api/ocm/assign-faculty/:id')
		.put(assignFaculty.update);

	router.route('/api/ocm/waitlist/:id')
		.delete(waitlist.deleteWaitlist);

	router.route('/api/ocm/waitlist')
		.get(waitlist.find);

//<<<<<<< HEAD
	router.route('/degree-programs')
		.get(degreeProgram.find)
		.post(degreeProgram.insert);

	router.route('/degree-programs/:id')
		.get(degreeProgram.findOne)
		.put(degreeProgram.update)
		.delete(degreeProgram.remove);

	router.route('/curriculum')
		.get(curriculum.find)
		.post(curriculum.insert);

	router.route('/curriculum/:id')
		.get(curriculum.findOne)
		.put(curriculum.update)
		.delete(curriculum.remove);

	/*router.route('/rooms') //no variable for named room.
		.get(room.find)*/
//=======
  router.route('/api/announcements')
  		.get(announcement.find)
		.post(announcement.insert);
	router.route('api/announcements/:id')
		.get(announcement.findOne);
//>>>>>>> c5800d6c2edf348c8909589b728c6592488ff87d

	router.all('*', function (req, res, next) {
		res.send(404, {message : 'Nothing to do here.'});
	});

	router.use(function (err, req, res, next) {
		logger.log('error', err.message || err);
		return next(err);
	});

	return router;
};
