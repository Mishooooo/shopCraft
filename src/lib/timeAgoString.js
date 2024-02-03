import moment from "moment";

const timeAgoString = (createdTime) => {
  const createdAt = moment(createdTime);
  const now = moment();
  const diffInMinutes = now.diff(createdAt, "minutes");
  return moment.duration(diffInMinutes, "minutes").humanize();
};

export default timeAgoString;
