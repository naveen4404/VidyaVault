exports.isDriveLink = (fileLink) => {
  const { hostname } = new URL(fileLink);
  return hostname === "drive.google.com";
};
exports.getDriveId = (fileLink) => {
  // First try to match /d/FILE_ID/ pattern
  const match1 = fileLink.match(/\/d\/([^\/]+)/);
  if (match1 && match1[1]) {
    return match1[1];
  }

  // If not found, try to match id=FILE_ID pattern
  const match2 = fileLink.match(/[?&]id=([^&]+)/);
  if (match2 && match2[1]) {
    return match2[1];
  }

  // If still not found, return null
  return null;
};
exports.validateDriveLink = async (fileId) => {
  try {
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const response = await fetch(url, { method: "HEAD" });

    return response.ok;
  } catch (err) {
    return false;
  }
};
