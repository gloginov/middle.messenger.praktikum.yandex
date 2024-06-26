export default function dateFormat(date) {
  const preFormat = date ? new Date(date) : new Date();

  const yyyy = preFormat.getFullYear();
  const mm = String(preFormat.getMonth() + 1).padStart(2,'0');
  const dd = String(preFormat.getDate()).padStart(2,'0');

  const hours = preFormat.getHours();
  const minutes = preFormat.getMinutes();


  return `${dd}.${mm}.${yyyy} ${hours}:${minutes}`

}
