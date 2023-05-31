export default function testExpiredDate(startTime, endTime) {
  const nowDate = new Date();
  const finishDate = new Date(endTime);
  const startDate = new Date(startTime);
  return nowDate > finishDate || nowDate < startDate;
}
