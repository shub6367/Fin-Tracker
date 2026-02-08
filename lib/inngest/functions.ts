import {inngest} from "@/lib/inngest/client"
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts"
import { sendWelcomeEmail } from "../nodemailer"

export const sendSignUpEmail = inngest.createFunction(
    { id: 'sign-up-email' },
    { event: 'app/user.created' },
    async ({ event, step }) => {
        const userProfile = `
        - country : ${event.data.country}
        - Investment goals : ${event.data.investmentGoals}
        - Risk tolerance: ${event.data.riskTolrance}
        - Preferred industry : ${event.data.preferredIndustry}\

    `

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace("{{userProfile}}", userProfile)

    const introtext = 'Thanks for joining FinTracker! We\'re excited to help you track your financial journey.';

    await step.run('send-welcome-email', async () => {
      const { data: { email, name } } = event;

      return await sendWelcomeEmail({
        email,
        name,
        intro: introtext
      });
    })
    return {
      success: true,
      message: 'Welcome email sent successfully'
    }
    }
)