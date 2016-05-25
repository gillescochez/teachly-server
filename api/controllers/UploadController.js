var fs = require('fs');
var mkdirp = require('mkdirp');
var UPLOAD_PATH = 'public/images';

function safeFilename(name) {
	return name
		.replace(/ /g, '-')
		.replace(/[^A-Za-z0-9-_\.]/g, '')
		.replace(/\.+/g, '.')
		.replace(/-+/g, '-')
		.replace(/_+/g, '_');
}

module.exports = {

	upload: function(req, res) {

		var file = req.files.resource;
		var fileName = safeFilename(file.name);
		var dirPath = UPLOAD_PATH + '/' + req.param("lesson_id");
		var filePath = dirPath + '/' + fileName;

		try {
			mkdirp.sync(dirPath, 0755);
		} catch (e) {
			console.log(e);
		}

		fs.readFile(file.path, function(err, data) {
			if (err) {
				res.send(500, {error: 'could not read file'});
			} else {
				fs.writeFile(filePath, data, function(err) {
					if (err) {
						res.send(500, {error: 'could not write file to storage'});
					} else {

						Resource.create({
							name: req.param("name"),
							file: filePath,
							lesson_id: req.param("lesson_id")
						}).exec(function(err, data) {
							if (err) {
								res.send(500, err);
							} else {
								res.send(data);
							}
						});
					}
				})
			}
		});
	},
	/**
	 * Overrides for the settings in `config/controllers.js`
	 * (specific to GifController)
	 */
	_config: {}
};