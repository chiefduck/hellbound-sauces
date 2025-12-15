# Resend Quick Start Guide

Follow these steps to get email forms working on your site.

## Step 1: Create Resend Account

1. Go to https://resend.com
2. Sign up for a free account
3. Verify your email address

## Step 2: Verify Your Domain

### Add Domain in Resend

1. Log into Resend dashboard
2. Click **Domains** in the left sidebar
3. Click **Add Domain**
4. Enter: `hellboundsauces.com`
5. Click **Add**

### Add DNS Records

Resend will show you 3 DNS records to add. You need to add these to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.).

**Example records** (your values will be different):

```
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4G... (long string)

Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; pct=100; rua=mailto:dmarc@resend.com
```

### Where to Add DNS Records

**If using Cloudflare** (most common):
1. Log into Cloudflare
2. Select your domain
3. Go to **DNS** → **Records**
4. Click **Add record**
5. Add each record exactly as shown in Resend

**If using GoDaddy**:
1. Log into GoDaddy
2. Go to **My Products** → **DNS**
3. Scroll to **Records**
4. Click **Add** for each record

**If using Namecheap**:
1. Log into Namecheap
2. Go to **Domain List** → **Manage**
3. Click **Advanced DNS**
4. Add each record

### Verify Domain

1. After adding all 3 DNS records, wait 5-15 minutes
2. Go back to Resend dashboard → Domains
3. Click **Verify** next to your domain
4. Status should change to **Verified** (green checkmark)

If it shows "Not Verified", wait a bit longer and try again. DNS propagation can take up to 24 hours in some cases.

## Step 3: Create API Key

1. In Resend dashboard, click **API Keys**
2. Click **Create API Key**
3. Name it: `HellBound Sauces Website`
4. Permission: **Sending access** (default)
5. Click **Create**
6. **COPY THE API KEY** - you'll need it in the next step!

The key will look like: `re_123abc456def789ghi`

**Important**: You can only see this key once! Store it somewhere safe.

## Step 4: Add API Key to Netlify

1. Go to Netlify dashboard
2. Select your site
3. Go to **Site configuration** → **Environment variables**
4. Click **Add a variable** → **Add a single variable**
5. Key: `RESEND_API_KEY`
6. Value: Paste your Resend API key (the `re_...` string)
7. Scopes: Check all three boxes:
   - ✅ Production
   - ✅ Deploy previews
   - ✅ Branch deploys
8. Click **Create variable**

## Step 5: Configure Sender Email

Your email function currently sends from:
```
HellBound Sauces Website <noreply@hellboundsauces.com>
```

You need to verify this email in Resend:

### Option A: Use noreply@hellboundsauces.com

If your domain is verified, this should work automatically. Test it first.

### Option B: Use a different email

If you prefer to use a different email (like `contact@hellboundsauces.com`):

1. Update the function at `/netlify/functions/send-email.ts`
2. Change line:
   ```typescript
   from: 'HellBound Sauces Website <contact@hellboundsauces.com>',
   ```
3. Commit and push changes

## Step 6: Deploy Site

Your site will automatically redeploy when you set the environment variable.

Or manually trigger:
```bash
git commit --allow-empty -m "Trigger deploy for email setup"
git push
```

Wait 2-3 minutes for deployment to complete.

## Step 7: Test Email Forms

### Test Newsletter (Easiest)

1. Go to your website
2. Scroll to the footer
3. Enter your email: `youremail@gmail.com`
4. Click **Subscribe**
5. Check scott@hellboundsauces.com for the email
6. Subject should be: `[Newsletter] New Subscriber`

### Test Contact Form

1. Go to `/contact`
2. Select **Consumer Question**
3. Choose a topic
4. Fill in name, email, message
5. Click **Send Message**
6. Check scott@hellboundsauces.com
7. Subject should be: `[Contact Form] Customer Question - {topic}`

### Test Wholesale Form

1. Go to `/wholesale`
2. Fill in all fields
3. Click **Contact Us**
4. Check scott@hellboundsauces.com
5. Subject should be: `[Wholesale Application] New Partner Inquiry`

## Step 8: Monitor Emails

### Check Resend Dashboard

1. Go to Resend → **Emails**
2. You'll see all sent emails with:
   - ✅ Delivered
   - ⏱️ Pending
   - ❌ Failed

### Check Netlify Function Logs

1. Netlify → Your site → **Functions**
2. Click `send-email`
3. See recent invocations and any errors

## Troubleshooting

### ❌ "Failed to send email" error

**Check**:
1. Is RESEND_API_KEY set in Netlify?
   - Site configuration → Environment variables
   - Make sure it's in all scopes
2. Did you redeploy after setting the variable?
3. Is your domain verified in Resend?

**Fix**: Redeploy your site:
```bash
git commit --allow-empty -m "Redeploy"
git push
```

### ❌ Domain not verified

**Check DNS records**:
1. Resend dashboard → Domains → Your domain
2. Click **View DNS records**
3. Verify all 3 records are added correctly
4. Wait 30 minutes and try again

**Common issues**:
- Wrong Name field (should be exactly as shown)
- Wrong Value (copy the entire value)
- Cloudflare proxy enabled (should be DNS only for TXT records)

### ❌ Emails not arriving

**Check spam folder** first!

Then:
1. Resend dashboard → Emails → Check status
2. If "Delivered" but not in inbox, it's a spam filter issue
3. Add `noreply@hellboundsauces.com` to contacts
4. Mark email as "Not Spam" if it's in spam

### ❌ "Domain not found" error

Your domain isn't verified in Resend.

1. Go to Resend → Domains
2. Make sure hellboundsauces.com shows "Verified"
3. If not, check DNS records and click Verify

## Summary Checklist

- [ ] Resend account created
- [ ] Domain `hellboundsauces.com` added to Resend
- [ ] 3 DNS records added to domain registrar
- [ ] Domain shows "Verified" in Resend
- [ ] API key created in Resend
- [ ] API key added to Netlify environment variables
- [ ] Site redeployed
- [ ] Newsletter form tested
- [ ] Contact form tested
- [ ] Wholesale form tested
- [ ] Emails arriving at scott@hellboundsauces.com

## Next Steps

Once everything is working:

1. **Monitor email delivery** in Resend dashboard
2. **Check spam** occasionally to make sure emails arrive
3. **Set up email filters** in Gmail/Outlook to organize form submissions:
   - Filter 1: Subject contains `[Contact Form]` → Label: Contact Forms
   - Filter 2: Subject contains `[Wholesale Application]` → Label: Wholesale
   - Filter 3: Subject contains `[Newsletter]` → Label: Newsletter

## Support

If you run into issues:

1. Check EMAIL_INTEGRATION.md for detailed troubleshooting
2. Check Netlify function logs for errors
3. Check Resend dashboard for delivery status
4. Verify all DNS records are correct

The most common issue is DNS records not propagating. Give it 24 hours if domain verification fails.
