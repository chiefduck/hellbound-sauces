import { Handler } from '@netlify/functions';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  type: 'contact' | 'wholesale' | 'newsletter' | 'low-stock';
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  inquiryType?: string;
  topic?: string;
  orderNumber?: string;
  products?: { title: string; handle: string; quantity: number }[];
  siteUrl?: string;
}

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data: EmailData = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!data.email || !data.type) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Low-stock alerts come from a scheduled script, not a public form — require
    // a shared secret so a stranger can't spam Scott's inbox via this public URL.
    if (data.type === 'low-stock') {
      const providedSecret = event.headers['x-alert-secret'];
      if (!providedSecret || providedSecret !== process.env.ALERT_SECRET) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'Unauthorized' }),
        };
      }
    }

    let subject = '';
    let html = '';

    // Generate email content based on type
    switch (data.type) {
      case 'contact':
        subject = `[Contact Form] ${data.inquiryType === 'wholesale' ? 'Wholesale Inquiry' : 'Customer Question'} - ${data.topic || 'General'}`;
        html = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Type:</strong> ${data.inquiryType === 'wholesale' ? 'Wholesale Inquiry' : 'Consumer Question'}</p>
          ${data.topic ? `<p><strong>Topic:</strong> ${data.topic}</p>` : ''}
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          ${data.orderNumber ? `<p><strong>Order Number:</strong> ${data.orderNumber}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${data.message?.replace(/\n/g, '<br>')}</p>
        `;
        break;

      case 'wholesale':
        subject = '[Wholesale Application] New Partner Inquiry';
        html = `
          <h2>New Wholesale Application</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${data.message?.replace(/\n/g, '<br>')}</p>
        `;
        break;

      case 'newsletter':
        subject = '[Newsletter] New Subscriber';
        html = `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${data.email}</p>
          <p>This subscriber was added through the website newsletter form.</p>
        `;
        break;

      case 'low-stock': {
        const items = data.products || [];
        const siteUrl = data.siteUrl || 'https://hellboundsauces.com';
        subject = `Low Stock Alert — ${items.length} product${items.length === 1 ? '' : 's'} below 25 units`;
        html = `
          <h2>Low Stock Alert</h2>
          <p>The following product${items.length === 1 ? ' is' : 's are'} running low (under 25 units available):</p>
          <ul>
            ${items.map(p => `<li><strong>${p.title}</strong> — ${p.quantity} left (<a href="${siteUrl}/products/${p.handle}">view product</a>)</li>`).join('')}
          </ul>
          <p style="color: #666; font-size: 13px;">Inventory is checked daily. You'll get this alert the first time a product dips below 25 units — it won't repeat every day while it stays low, only if it drops again after being restocked.</p>
        `;
        break;
      }

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid email type' }),
        };
    }

    // Send email using Resend
    await resend.emails.send({
      from: 'HellBound Sauces Website <noreply@hellboundsauces.com>',
      to: 'scott@hellboundsauces.com',
      replyTo: data.email,
      subject: subject,
      html: html,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};

export { handler };
