"use server"

import { CheckoutOrderParams, CreateOrderParams } from "@/types"
import { handleError } from "../utils"
import Stripe from 'stripe'
import { redirect } from "next/dist/server/api-utils"
import { NextResponse } from "next/server"
import { connectToDatabase } from "../database"
import Order from "../database/models/order.model"

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const price = order.isFree ? 0 : Number(order.price) * 100

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: order.eventTitle
            },
          },
          quantity: 1
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    NextResponse.redirect(session.url!);
  } catch (error) {
    handleError(error)
  }
} 

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId
    })

    return JSON.stringify(JSON.parse(newOrder))
  } catch (error) {
    handleError(error)
  }
}