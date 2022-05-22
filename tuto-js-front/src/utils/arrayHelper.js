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

export const getTopicsWithCourse = (topics) => {
  topics.forEach((topic, index) => {
    topic.id = index + 1;
    topic.courseCode = topic.course.code;
  });
  return topics;
};

export const formatDate = (date) => {
  if (date)
    return (
      date[0] + date[1] + date[2] + date[3] + "/" + date[5] + date[6] + "/" + date[8] + date[9]
    );
  else return "";
};

export const getTutorshipssWithAllToStudent = (tutorships) => {
  console.log(tutorships);
  tutorships.forEach((tutorship, index) => {
    tutorship.id = index + 1;
    tutorship.attended = tutorship.attended === false ? "No" : "Sí";
    tutorship.registerDate = formatDate(tutorship.registerDate);
    tutorship.courseCode = tutorship.course.code;
    tutorship.sectionCode = tutorship.section.code;
    tutorship.studentCode = tutorship.student.code;
    tutorship.tutorCode = tutorship.tutor.code;
    tutorship.topicDescription = tutorship.topic.description;
  });
  return tutorships;
};
