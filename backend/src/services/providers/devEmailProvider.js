export const devEmailProvider = {
  async send({ to, subject, html, text, data = {} }) {
    console.log('\n============================================================');
    console.log('📨 [DEV EMAIL DISPATCH] (Simulated Mail Delivery)');
    console.log(`To:      ${to}`);
    console.log(`Subject: ${subject}`);
    if (data.otp) {
      console.log('------------------------------------------------------------');
      console.log(`🔑 VERIFICATION CODE (OTP): [ ${data.otp} ]`);
      console.log('------------------------------------------------------------');
    }
    console.log('============================================================\n');

    return {
      success: true,
      provider: 'development-logger',
      messageId: `dev_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    };
  },
};
