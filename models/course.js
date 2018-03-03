// Returns a course object
// @param {string} course_id The id of the course
// @param {string} course_code The course code
// @param {string} course_name The name of the course
// @param {object} sections The sections of the course
// @constructor 
var Course = function(course_id, course_code, course_name, sections){
  this.course_id = course_id;
  this.course_code = course_code;
  this.course_name = course_name;
  this.sections = sections;
}

module.exports = Course;
