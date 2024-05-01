import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `
        <h1>Confirm your email</h1>
        <p>Click the link below to confirm your email address.</p>
        <a href="${confirmLink}">Confirm email</a>
      `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXTAUTURL}/auth/reset-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
        <h1>Reset your password</h1>
        <p>Click the link below to reset your password.</p>
        <a href="${resetLink}">Reset password</a>
      `,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two-factor authentication",
    html: `
        <h1>Two-factor authentication</h1>
        <p>Use the following code to log in:</p>
        <h2>${token}</h2>
      `,
  });
  console.log("response from the two-factor action: ", data);
  console.log("error from the two-factor action: ", error);
};
