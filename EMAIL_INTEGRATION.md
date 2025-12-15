# Email Integration with Resend

This document explains how the email system works for all forms on the HellBound Sauces website.

## Overview

All forms on the website (Contact, Wholesale, Newsletter) are connected to Resend API and send emails to `scott@hellboundsauces.com`.

## Forms Connected

### 1. Contact Form (`/contact`)
- **Subject Line Format**: `[Contact Form] {Wholesale Inquiry | Customer Question} - {Topic}`
- **Email Includes**:
  - Inquiry type (Consumer or Wholesale)
  - Topic selected
  - Name
  - Email
  - Phone (if wholesale)
  - Company (if wholesale)
  - Order number (if applicable)
  - Message

**Example Subjects**:
- `[Contact Form] Customer Question - Order Status`
- `[Contact Form] Wholesale Inquiry - New Account`

### 2. Wholesale Form (`/wholesale`)
- **Subject Line**: `[Wholesale Application] New Partner Inquiry`
- **Email Includes**:
  - Name
  - Email
  - Phone
  - Business description

### 3. Newsletter Form (Footer on all pages)
- **Subject Line**: `[Newsletter] New Subscriber`
- **Email Includes**:
  - Email address
  - Note that they subscribed via website form

## Setup Instructions

### 1. Resend Account Setup

1. Create account at https://resend.com
2. Verify your domain: `hellboundsauces.com`
3. Add DNS records (SPF, DKIM, DMARC)
4. Generate an API key

### 2. Configure Sending Domain

In Resend dashboard:
1. Go to Domains
2. Add `hellboundsauces.com`
3. Add the required DNS records to your domain provider
4. Wait for verification (usually 5-15 minutes)

**Important**: The "From" address in the Netlify function is set to:
```
from: 'HellBound Sauces Website <noreply@hellboundsauces.com>'
```

Make sure `noreply@hellboundsauces.com` is configured in your Resend account, or update the function to use an approved email address.

### 3. Netlify Environment Variables

1. Go to Netlify Dashboard → Your Site → Site Configuration → Environment Variables
2. Add new variable:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (starts with `re_`)
   - **Scopes**: All scopes (Production, Deploy Previews, Branch deploys)

**DO NOT** commit your API key to the repository or .env.local file!

### 4. Deploy

Once the environment variable is set, deploy your site:

```bash
git push origin main
```

Netlify will automatically build and deploy with the new email functionality.

## Testing

### Local Development Testing

For local testing, you can add the RESEND_API_KEY to your `.env.local` file temporarily:

```bash
RESEND_API_KEY=re_your_test_key_here
```

Then run:
```bash
netlify dev
```

This will start the Netlify dev server with functions support at `http://localhost:8899`

### Production Testing

1. Submit a test form on your live site
2. Check scott@hellboundsauces.com for the email
3. Verify the email includes all expected information
4. Check Resend dashboard → Emails for delivery status

## Email Function Details

**File**: `/netlify/functions/send-email.ts`

The function accepts POST requests with JSON data:

```typescript
{
  type: 'contact' | 'wholesale' | 'newsletter',
  name?: string,
  email: string,
  phone?: string,
  company?: string,
  message?: string,
  inquiryType?: string,
  topic?: string,
  orderNumber?: string
}
```

**Response**:
- Success: `200` with `{ message: 'Email sent successfully' }`
- Error: `400` or `500` with `{ error: 'Error message' }`

## Subject Line Examples

Here are all the possible subject lines that Scott will receive:

### Contact Form - Consumer Questions
- `[Contact Form] Customer Question - Order Status`
- `[Contact Form] Customer Question - Shipping Question`
- `[Contact Form] Customer Question - Returns & Refunds`
- `[Contact Form] Customer Question - Product Information`
- `[Contact Form] Customer Question - Heat Level Recommendation`
- `[Contact Form] Customer Question - Ingredients & Allergens`
- `[Contact Form] Customer Question - Subscription Help`
- `[Contact Form] Customer Question - General Feedback`
- `[Contact Form] Customer Question - Other`

### Contact Form - Wholesale Inquiries
- `[Contact Form] Wholesale Inquiry - Open Wholesale Account`
- `[Contact Form] Wholesale Inquiry - Pricing & Minimum Orders`
- `[Contact Form] Wholesale Inquiry - Sample Request`
- `[Contact Form] Wholesale Inquiry - Distribution Partnership`
- `[Contact Form] Wholesale Inquiry - Restaurant / Food Service`
- `[Contact Form] Wholesale Inquiry - Retail Store Inquiry`
- `[Contact Form] Wholesale Inquiry - Existing Order Question`
- `[Contact Form] Wholesale Inquiry - Other`

### Wholesale Page
- `[Wholesale Application] New Partner Inquiry`

### Newsletter
- `[Newsletter] New Subscriber`

## Troubleshooting

### Emails Not Sending

1. **Check Netlify Logs**:
   - Go to Netlify Dashboard → Your Site → Functions
   - Click on `send-email` function
   - Check recent invocations for errors

2. **Verify API Key**:
   - Make sure `RESEND_API_KEY` is set in Netlify environment variables
   - Verify the key is active in Resend dashboard

3. **Check Domain Verification**:
   - Go to Resend dashboard → Domains
   - Ensure `hellboundsauces.com` shows "Verified"
   - If not verified, check your DNS records

4. **Test in Resend Dashboard**:
   - Go to Resend → API Keys → Your Key
   - Use the "Test" feature to send a test email
   - If this fails, the issue is with Resend setup, not the function

### Form Submission Shows Error

1. **Check Browser Console**:
   - Open DevTools (F12)
   - Look for network errors when submitting
   - Check the response from `/.netlify/functions/send-email`

2. **Verify Form Data**:
   - Ensure all required fields have `name` attributes
   - Check that FormData is capturing values correctly

3. **Test Function Directly**:
   ```bash
   curl -X POST https://yourdomain.com/.netlify/functions/send-email \
     -H "Content-Type: application/json" \
     -d '{"type":"newsletter","email":"test@example.com"}'
   ```

## Future Enhancements

### N8N Integration (Planned)

Once you're ready to connect N8N:

1. Update the newsletter form to send to N8N webhook instead of Resend
2. N8N can handle:
   - Adding to email marketing platform (Mailchimp, ConvertKit, etc.)
   - Triggering automation workflows
   - Syncing with CRM
   - Still sending notification to scott@hellboundsauces.com

The current setup keeps sending emails via Resend so you're notified immediately, and you can migrate the newsletter to N8N when ready.

## Support

If you encounter issues:

1. Check Netlify function logs
2. Check Resend dashboard → Emails for delivery status
3. Verify DNS records are correct
4. Ensure API key is active and has proper permissions

## File Structure

```
/netlify/
  /functions/
    send-email.ts          # Email sending function
/src/
  /pages/
    ContactPage.tsx        # Contact form
    WholesalePage.tsx      # Wholesale application form
  /components/
    /layout/
      Footer.tsx           # Newsletter subscription form
netlify.toml               # Netlify configuration
.env.example               # Environment variable template
```

## Security Notes

- ✅ API key is stored in Netlify environment variables (server-side)
- ✅ Function validates request method (POST only)
- ✅ Function validates required fields
- ✅ Email addresses are validated by HTML5 form validation
- ✅ Rate limiting is handled by Netlify Functions (prevents spam)

## Cost Considerations

Resend Free Tier:
- 3,000 emails/month
- 100 emails/day

Typical usage estimate:
- Contact forms: ~50-100/month
- Wholesale: ~10-20/month
- Newsletter: ~100-200/month

**Total**: ~200-300 emails/month (well within free tier)

Monitor usage in Resend dashboard → Usage.
