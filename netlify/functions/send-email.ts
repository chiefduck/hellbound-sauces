import { Handler } from '@netlify/functions';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  type: 'contact' | 'wholesale' | 'newsletter';
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  inquiryType?: string;
  topic?: string;
  orderNumber?: string;
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
