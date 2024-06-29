// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
export default isJsonString;
