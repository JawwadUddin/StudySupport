function status(marksReceived, marks) {
  if (marksReceived / marks < 0.4) return "status fail";
  if (marksReceived / marks < 0.6) return "status average";
  if (marksReceived / marks < 0.8) return "status good";
  return "status excellent";
}

export { status };
