import Stripe from 'stripe';
import { headers, headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const header = await headers();
  const signature = header.get('Stripe-Signature') as string;

  let event :Stripe.Event;

  try{
    event = Stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
    )
  }
  catch(err: any){
    console.log(`Webhook error : ${err.message}`,{status:500})
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const userId = 
}
