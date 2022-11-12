import { coursesData } from "../../mock/CourseData";
import { productMutations, productQueries } from "./products";
const course = function (_, args) {
  const id = args.id;
  return coursesData.filter((course) => {
    return course.id == id;
  })[0];
};
const courses = function (_, args) {
  if (args.topic) {
    const topic = args.topic;
    return coursesData.filter((course) => course.topic === topic);
  } else {
    return coursesData;
  }
};

const coursesQueries = { course, courses };
export const queryResolver = {
  Query: {
    ...coursesQueries,
    ...productQueries,
  },
  Mutation: {
    ...productMutations,
  },
};
