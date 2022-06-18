import axios from "axios";

async function getAllTagsAndSaveInLocalstorge() {
  const res = await axios.get("/tag?pageNumber=1&pageSize=1000");
  let tags = res.data.tags;
  localStorage.setItem("tags", JSON.stringify(tags));
}

export { getAllTagsAndSaveInLocalstorge };
