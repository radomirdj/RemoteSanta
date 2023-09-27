import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentRequest, PaymentRequestStatusEnum } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '../users/dtos/user.dto';
import { AdminOrgsService } from '../admin_orgs/admin_orgs.service';

@Injectable()
export class PaymentsService {
  private readonly stripe;
  constructor(
    private prisma: PrismaService,
    private adminOrgsService: AdminOrgsService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-08-16',
    });
  }

  // WARNING!!! - THIS IS NOT COVERED WITH TESTS
  async startPaymentSession(amount: number, user: UserDto): Promise<string> {
    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Points',
          },
          unit_amount: 1,
        },
        quantity: amount,
      },
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Transaction Fee',
          },
          unit_amount: 30 + Math.round(0.03 * amount),
        },
        quantity: 1,
      },
    ];
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'], // TODO - add more, maybe 'paypal'
      mode: 'payment',
      line_items: lineItems,
      success_url: `${process.env.FE_BASE_URL}user-manager-purchase-points-success`,
      cancel_url: `${process.env.FE_BASE_URL}user-manager-purchase-points`,
    });

    await this.prisma.paymentRequest.create({
      data: {
        sessionId: session.id,
        pointsAmount: amount,
        org: {
          connect: {
            id: user.org.id,
          },
        },
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return session.url;
  }

  // WARNING!!! - THIS IS NOT COVERED WITH TESTS
  async handleStripeWebhook(rawBody, sig) {
    const event = this.stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_HOOK_SECRET_KEY,
    );
    let paymentRequest: PaymentRequest;
    try {
      paymentRequest = await this.prisma.paymentRequest.findUnique({
        where: { sessionId: event.data.object.id },
      });
    } catch (err) {
      console.log('PaymentsService -> handleStripeWebhook -> err', err);
    }

    if (
      paymentRequest &&
      paymentRequest.status === PaymentRequestStatusEnum.PENDING &&
      event.type === 'checkout.session.completed'
    ) {
      await this.prisma.paymentRequest.update({
        where: { id: paymentRequest.id },
        data: { status: PaymentRequestStatusEnum.SUCCESS_UPDATE_STARTED },
      });
      await this.adminOrgsService.createTransactionAdminToOrg(
        paymentRequest.orgId,
        paymentRequest.pointsAmount,
        paymentRequest.createdById,
      );
      await this.prisma.paymentRequest.update({
        where: { id: paymentRequest.id },
        data: { status: PaymentRequestStatusEnum.SUCCESS },
      });
      return paymentRequest.orgId;
    }
    return null;
  }
}
