export const getArrayWithId = (array) => {
  array.forEach((row, index) => {
    row.id = index + 1;
  });
  return array;
};

export const getSectionsWithTeacherAndCourse = (sections) => {
  sections.forEach((section, index) => {
    section.id = index + 1;
    section.courseCode = section.course.code;
    section.teacherCode = section.teacher.code;
  });
  return sections;
};
