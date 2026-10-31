import { MockTest } from "@/types";
import {
  AccessType,
  PaymentOrderParams,
  PaymentProvider,
  PricingPlan,
  UserEntitlement,
} from "@/types/monetization";

export const MOCK_PRICING_PLANS: PricingPlan[] = [
  {
    id: "plan-monthly",
    name: "Monthly Aspirant Pass",
    description: "Unlimited access to all SSC CGL & CHSL full-length and sectional mocks.",
    priceInr: 299,
    validityDays: 30,
    features: [
      "Access to all 50+ SSC Mocks",
      "Detailed All India Percentile",
      "Step-by-step Bilingual Explanations",
      "Weak Area Diagnostics",
    ],
  },
  {
    id: "plan-annual",
    name: "1-Year Super Pass",
    description: "Complete preparation pass for all SSC, Railway & State exams for 365 days.",
    priceInr: 999,
    validityDays: 365,
    features: [
      "All SSC CGL, CHSL, CPO & MTS Mocks",
      "Previous Year Questions (PYQ) Mocks",
      "Priority Doubt Discussion",
      "Performance Analytics & Trend Reports",
      "Offline PDF Solutions Download",
    ],
    isPopular: true,
  },
];

/**
 * In-memory / Mock entitlement store for demonstration & fallback
 */
let memoryEntitlements: UserEntitlement[] = [];

/**
 * Checks if a user is permitted to attempt a mock test.
 * By default in this initial phase, all tests where isFree === true are granted instantly.
 */
export async function checkTestAccess(
  userId: string,
  test: MockTest
): Promise<{ allowed: boolean; reason?: string }> {
  // If test is free, allow immediately
  if (test.isFree) {
    return { allowed: true };
  }

  // Check active entitlements
  const activeEntitlement = memoryEntitlements.find(
    (e) =>
      e.userId === userId &&
      (e.mockTestId === test.id || e.accessType === "subscription_pass") &&
      e.isActive &&
      (!e.expiresAt || new Date(e.expiresAt) > new Date())
  );

  if (activeEntitlement) {
    return { allowed: true };
  }

  return {
    allowed: false,
    reason: `This is a premium test (₹${test.priceInr}). Please unlock with a Mock Pass.`,
  };
}

/**
 * Pluggable Payment Provider Interface (Ready for Razorpay / Stripe integration)
 */
export class MockPaymentProvider implements PaymentProvider {
  async createOrder(params: PaymentOrderParams) {
    return {
      orderId: `order_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      amount: params.amountInr * 100, // paise
      currency: params.currency,
    };
  }

  async verifyPayment(params: { orderId: string; paymentId: string; signature: string }) {
    // Demonstration stub - ready to plug in HMAC-SHA256 signature verification
    return {
      success: true,
      transactionId: `txn_${Date.now()}`,
    };
  }
}
