/**
 * Future Monetization Readiness Interface
 * 
 * Prepares the architectural foundation for paid mock tests, test series bundles,
 * and subscription plans without coupling payment processing to the core test engine.
 */

export type AccessType = 'free' | 'single_test_purchase' | 'subscription_pass' | 'admin_grant';

export interface UserEntitlement {
  id: string;
  userId: string;
  mockTestId: string;
  accessType: AccessType;
  grantedAt: string;
  expiresAt: string | null;
  isActive: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceInr: number;
  validityDays: number;
  features: string[];
  isPopular?: boolean;
}

export interface PaymentOrderParams {
  userId: string;
  testId?: string;
  planId?: string;
  amountInr: number;
  currency: 'INR';
}

export interface PaymentVerificationParams {
  orderId: string;
  paymentId: string;
  signature: string;
}

export interface PaymentProvider {
  createOrder(params: PaymentOrderParams): Promise<{ orderId: string; amount: number; currency: string }>;
  verifyPayment(params: PaymentVerificationParams): Promise<{ success: boolean; transactionId: string }>;
}
