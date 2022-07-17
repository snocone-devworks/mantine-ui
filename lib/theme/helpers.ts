export const fixMessage = (message: string) => {
  let fixedMessage: string = message.trim();
  fixedMessage = fixedMessage.charAt(0).toUpperCase() + fixedMessage.slice(1);
  if (fixedMessage.slice(-1) !== '.') fixedMessage += '.';
  return fixedMessage;
}