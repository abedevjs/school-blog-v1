export function formatDate(data) {
  const options = {
    //hour: 'numeric',
    //minute: 'numeric',
    day: "2-digit", //'2-digit'
    month: "long", //'2-digit' 'long'
    year: "numeric", //'2-digit'
    // weekday: 'long',//numeric, short, narrow
  };

  const output = new Date(data).toLocaleString("in-ID", options);

  return output;
}

export function cutWords(text, num) {
  if (text.length < 10) return text;
  const output = text.split(" ").slice(0, num).join(" ") + "...";
  // console.log(`OLD: ${text}`);
  // console.log(`OLDLENGTH: ${text.length}`);
  // console.log(`NEW: ${output}`);
  // console.log(`OutputLENGTH: ${output.length}`);
  return output;
}
