var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');

exports.find = function(req, res, next) {
	db.query("SELECT * FROM course", function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.send(404, {message: 'No course found.'});
		} else {
			res.send(rows);
		}
	});
};

exports.insert = function(req, res, next) {
	if (!req.body.code) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: code'});
	}
	if (!req.body.name) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: name'});
	}

	db.query("INSERT INTO course(code, name, units, semesterOffered, unitId) VALUES(?, ?, ?, ?, ?)",
		[req.body.code,
		 req.body.name,
		 req.body.units,
		 req.body.semesterOffered,
		 req.body.unitId],

		function(err, row) {
			if (err) return next(err);
			selectOne(row.insertId, function(newRow) {
				if (!newRow) {
					res.send(400, {message: 'Course ('+row.insertId+') was not created.'});
				} else {
					res.send(newRow);
				}
			});
	});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM course WHERE id=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}

exports.remove = function(req, res, next) {
  db.query("UPDATE FROM course SET _recStatus = 'INACTIVE' WHERE _id=?", [req.params.id], function(err, row) {
    if (err) return next(err);
    if (row.length === 0) {
      res.send(404, {message: 'Course ('+req.params.id+') was not removed.'})
    } else {
      res.send(200, row[0]);
    }
  });
};
