import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const body = await req.text();
  const header = await headers();
  const signature = header.get('Stripe-Signature') as string;

  let event: Stripe.Event | undefined;

  try {
    event = Stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.log(`Webhook error : ${err.message}`, { status: 500 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === 'checkout.session.completed') {
    if (!userId || !courseId) {
      return new NextResponse('Webhook Error : Missing Metadata', {
        status: 400,
      });
    }

    await db.purchase.create({
      data: {
        courseId,
        userId,
      },
    });
  } else {
    return new NextResponse(`Webhook erro unhandled event type ${event}`,{status:200});
  }


  return new NextResponse(null,{status:200})
}
