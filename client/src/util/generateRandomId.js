function generateRandomId() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000000);
  return timestamp + randomNum;
}

export default generateRandomId;
