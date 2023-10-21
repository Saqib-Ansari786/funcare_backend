export const generateVerificationData = () => {
  const verification_code = Math.floor(1000 + Math.random() * 9000).toString();

  const verification_code_expiry = new Date();
  verification_code_expiry.setMinutes(
    verification_code_expiry.getMinutes() + 1.5
  );

  return { verification_code, verification_code_expiry };
};
