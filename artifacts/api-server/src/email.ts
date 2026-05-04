import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = "Truwell <orders@truwell.in>";

function getClient() {
  if (!RESEND_API_KEY) return null;
  return new Resend(RESEND_API_KEY);
}

export async function sendOrderConfirmation(opts: {
  name: string;
  email: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  address: string;
  city: string;
  pincode: string;
}) {
  const client = getClient();
  if (!client) return;

  await client.emails.send({
    from: FROM,
    to: opts.email,
    subject: `Order confirmed - ${opts.productName} | Truwell`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <div style="background:#5d0703;padding:24px 32px;border-radius:12px 12px 0 0">
          <h1 style="margin:0;color:#f4f3e6;font-size:24px;font-weight:700;letter-spacing:-0.5px">
            Truwell
          </h1>
          <p style="margin:4px 0 0;color:#f3703c;font-size:13px;font-style:italic">
            stay well, true well.
          </p>
        </div>
        <div style="background:#f4f3e6;padding:32px;border-radius:0 0 12px 12px">
          <h2 style="margin:0 0 8px;font-size:22px;color:#5d0703">
            Thanks for your order, ${opts.name}!
          </h2>
          <p style="color:#555;margin:0 0 24px">
            We've received your order and will dispatch it soon.
          </p>
          <div style="background:#fff;border-radius:8px;padding:20px;margin-bottom:24px">
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:8px 0;color:#888;font-size:14px">Product</td>
                <td style="padding:8px 0;font-weight:600;text-align:right">${opts.productName}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#888;font-size:14px">Quantity</td>
                <td style="padding:8px 0;font-weight:600;text-align:right">${opts.quantity}</td>
              </tr>
              <tr style="border-top:1px solid #eee">
                <td style="padding:12px 0 4px;color:#888;font-size:14px">Total</td>
                <td style="padding:12px 0 4px;font-weight:700;color:#f3703c;font-size:18px;text-align:right">
                  Rs. ${opts.totalAmount}
                </td>
              </tr>
            </table>
          </div>
          <div style="background:#fff;border-radius:8px;padding:20px;margin-bottom:24px">
            <p style="margin:0 0 6px;color:#888;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.5px">
              Delivery Address
            </p>
            <p style="margin:0;line-height:1.6">
              ${opts.address}<br>${opts.city} - ${opts.pincode}
            </p>
          </div>
          <p style="color:#888;font-size:13px;margin:0">
            Questions? DM us on Instagram
            <a href="https://instagram.com/truwell.in" style="color:#f3703c">@truwell.in</a>
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendWaitlistConfirmation(opts: {
  name: string;
  email: string;
  productName: string;
}) {
  const client = getClient();
  if (!client) return;

  await client.emails.send({
    from: FROM,
    to: opts.email,
    subject: `You're on the ${opts.productName} waitlist! | Truwell`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <div style="background:#5d0703;padding:24px 32px;border-radius:12px 12px 0 0">
          <h1 style="margin:0;color:#f4f3e6;font-size:24px;font-weight:700;letter-spacing:-0.5px">
            Truwell
          </h1>
          <p style="margin:4px 0 0;color:#f3703c;font-size:13px;font-style:italic">
            stay well, true well.
          </p>
        </div>
        <div style="background:#f4f3e6;padding:32px;border-radius:0 0 12px 12px">
          <h2 style="margin:0 0 8px;font-size:22px;color:#5d0703">
            You're in, ${opts.name}!
          </h2>
          <p style="color:#555;margin:0 0 20px;font-size:16px;line-height:1.6">
            You've joined the waitlist for <strong>${opts.productName}</strong>.
            We'll email you the moment it launches — you'll be first in line.
          </p>
          <div style="background:#f3703c;border-radius:8px;padding:16px 20px;margin-bottom:24px">
            <p style="margin:0;color:#fff;font-size:15px;font-weight:600">
              ${opts.productName === "B-Juvenate"
                ? "B6, B9, B12 + Magnesium Citrate. Built for Indian vegetarians and busy professionals."
                : "We're working hard to bring this to you soon."}
            </p>
          </div>
          <p style="color:#888;font-size:13px;margin:0">
            Follow our journey on Instagram
            <a href="https://instagram.com/truwell.in" style="color:#f3703c">@truwell.in</a>
          </p>
        </div>
      </div>
    `,
  });
}
