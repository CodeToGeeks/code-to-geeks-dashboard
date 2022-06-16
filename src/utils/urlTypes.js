function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

function isVideo(url) {
  return /\.(m4p|mp4|webm|mpg|mp2|mpeg|3gp|mkv|flv|wmv|yuv|avi|)$/.test(url);
}
function isPdf(url) {
  return /\.(pdf|PDF)$/.test(url);
}
function isCompression(url) {
  return /\.(zip|Zip|RAR|rar )$/.test(url);
}

function fileType(url) {
  if (isImage(url)) return "image";
  else if (isVideo(url)) return "video";
  else if (isPdf(url)) return "pdf";
  else if (isCompression(url)) return "compression";
  else return "other";
}
export default fileType;
