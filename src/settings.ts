/**
 * Converts a string to a boolean based on the following criteria
 * val <= 0: false
 * val >= 1: true
 */
function determineBooleanValue(value: string | undefined) {
  if (!value) {
    return value;
  }
  const intVal = parseInt(value);
  if (!isNaN(intVal)) {
    return intVal >= 1;
  }
  return value.toLowerCase() === 'true';
}

const port = parseInt(process.env.RAUTH_PORT || '3000');

export default {
  'riskyRoutes': determineBooleanValue(process.env.RAUTH_RISKY_ROUTES) || false,
  port
};