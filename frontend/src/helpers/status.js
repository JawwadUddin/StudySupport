function status(marksReceived, marks) {
  if (marksReceived / marks < 0.4) return "fail";
  if (marksReceived / marks < 0.6) return "average";
  if (marksReceived / marks < 0.8) return "good";
  return "excellent";
}

export { status };
