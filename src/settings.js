/**
 * Converts a string to a boolean based on the following criteria
 * val <= 0: false
 * val >= 1: true
 * @param {String} Value to convert to a boolean
 */
function determineBooleanValue(value) {
  if (!value) {
    return value;
  }
  const intVal = parseInt(value);
  if (!isNaN(intVal)) {
    return intVal >= 1;
  }
  return value.toLowerCase() === 'true';
}

const port = parseInt(process.env.RAUTH_PORT);

export default {
  'riskyRoutes': determineBooleanValue(process.env.RAUTH_RISKY_ROUTES) || false,
  'port': isNaN(port) ? 3000 : port,
};