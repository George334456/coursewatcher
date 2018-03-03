var exports = module.exports = {};

const Course = require('../models/course.js');

// Creates a course object from the JSON data
// @param {JSON object} data The JSON data to create a course from
// @return {Course}
exports.parseCourseData = function (data) {
  const course_id = data.id;
  const course_code = data.code;
  const course_name = data.name;
  const sections = data.meeting_sections.map( (x) => extractEnrollmentInformation(x));
  return new Course(course_id, course_code, course_name, sections);
}

// Takes an array of JSON objects representing the sections and extracts
// out the enrollment information only.
// Enrollment information being: Name of the section, size of class, current enrollment and teacher name
// @param {Array} meeting_section An array of meeting_sections available for this course
// @return {Dictionary} An dictionary containing the various meeting sections available for this course
function extractEnrollmentInformation (meeting_section){
  let sections = {};
  sections.code = meeting_section.code;
  sections.total_size= meeting_section.size;
  sections.current_enrollment = meeting_section.enrolment;
  sections.instructors = meeting_section.instructors;

  return sections; 
}
