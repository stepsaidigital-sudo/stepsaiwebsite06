// Transcribed from the three product screenshots supplied on 22 October 2026.
// Descriptions summarize visible text only; truncated implementation details are not inferred.
export const workflowGroups = ['All templates', 'Cart recovery', 'Orders & delivery', 'Welcome & retention', 'Cash on delivery', 'Reviews', 'Team alerts'] as const;
type Group = typeof workflowGroups[number];
export type WorkflowTemplate = { name: string; platform: 'Shopify' | 'WhatsApp'; group: Group; steps: number; description: string };
const template = (platform: WorkflowTemplate['platform'], name: string, group: Group, steps: number, description: string): WorkflowTemplate => ({ platform, name, group, steps, description });
export const workflowTemplates: WorkflowTemplate[] = [
  template('Shopify', 'Cart Abandonment (Widget + Email)', 'Cart recovery', 8, 'Wait after cart activity, then check whether the cart was completed before following up.'),
  template('Shopify', 'Checkout Abandonment (Email)', 'Cart recovery', 7, 'Wait after a checkout is created and check its status before sending a reminder.'),
  template('Shopify', 'Order Confirmation', 'Orders & delivery', 2, 'Send an order confirmation email as soon as a new order is created.'),
  template('Shopify', 'High Value Order Alert', 'Team alerts', 4, 'Check whether an order exceeds a value threshold and email an internal alert to your team.'),
  template('Shopify', 'New Customer Welcome Series', 'Welcome & retention', 6, 'Start with a welcome email one hour after signup, followed by another email two days later.'),
  template('Shopify', 'First-Time Buyer Welcome', 'Welcome & retention', 4, 'Welcome a buyer after their order, then follow up three days later with product tips.'),
  template('Shopify', 'Shipping + Review Request', 'Reviews', 6, 'Confirm shipping after fulfilment, then request a review five days later and send a reminder.'),
  template('Shopify', 'Cancellation Win-Back', 'Welcome & retention', 4, 'Follow up after a cancelled order, then share a win-back offer with a discount code one day later.'),
  template('Shopify', 'Refund Alert (Internal)', 'Team alerts', 2, 'Notify your team when a refund is processed.'),
  template('Shopify', 'New Customer Phone Collection', 'Welcome & retention', 4, 'Check whether a new customer supplied a phone number and invite WhatsApp opt-in when present.'),
  template('Shopify', 'Checkout Abandonment (2-Touch Email)', 'Cart recovery', 10, 'Send a first checkout reminder after 30 minutes and a second email 24 hours later.'),
  template('Shopify', 'Browse Abandonment (Email)', 'Cart recovery', 8, 'Check a visitor’s session after a product view and continue for engaged browsers.'),
  template('Shopify', 'Browse Abandonment (Widget)', 'Cart recovery', 6, 'Use an on-site widget to nudge a visitor after they view a product.'),
  template('Shopify', 'Zero-Result Search Assist', 'Cart recovery', 4, 'Offer help through a widget when a store search returns no results.'),
  template('Shopify', 'Cart Viewed Nudge', 'Cart recovery', 5, 'Wait after a visitor opens their cart, then check whether they have purchased before nudging.'),
  template('WhatsApp', 'Cart Recovery', 'Cart recovery', 8, 'Send an approved cart-recovery template ten minutes after a product is added to the cart, subject to the workflow checks.'),
  template('WhatsApp', 'Abandoned Checkout (1 touch)', 'Cart recovery', 6, 'Send one approved WhatsApp reminder with the checkout recovery link one hour after abandonment.'),
  template('WhatsApp', 'Abandoned Checkout (2 touches)', 'Cart recovery', 11, 'Send up to two approved reminders: after one hour, then another 24 hours later.'),
  template('WhatsApp', 'Abandoned Checkout (3 touches)', 'Cart recovery', 16, 'Send up to three approved reminders at one hour, one day and three days after abandonment.'),
  template('WhatsApp', 'Order Confirmation', 'Orders & delivery', 3, 'Send an approved order-confirmation message when a new order is created.'),
  template('WhatsApp', 'Order Cancellation', 'Orders & delivery', 3, 'Send an approved cancellation notice when an order is marked cancelled.'),
  template('WhatsApp', 'Shipping Confirmation', 'Orders & delivery', 3, 'Send an approved shipping message with a tracking link when an order is fulfilled.'),
  template('WhatsApp', 'Upsell Products', 'Welcome & retention', 6, 'Wait a configurable number of days after a customer buys one of your specified products before following up.'),
  template('WhatsApp', 'Reorder Nudge (30 days)', 'Welcome & retention', 6, 'Wait 30 days after a repeat-purchase product is bought before sending a reorder nudge.'),
  template('WhatsApp', 'Order Confirmation (Pay Later)', 'Orders & delivery', 4, 'Send an approved confirmation for an order using a pay-later gateway, including COD.'),
  template('WhatsApp', 'Order Confirmation (Exclude COD)', 'Orders & delivery', 4, 'Send an approved order confirmation for orders other than cash on delivery.'),
  template('WhatsApp', 'Order Delivered', 'Orders & delivery', 2, 'Send an approved message when a shipment reaches delivered status.'),
  template('WhatsApp', 'Reorder Nudge (Post-Delivery)', 'Welcome & retention', 3, 'Wait a set number of days after delivery, then send a reorder nudge.'),
  template('WhatsApp', 'Shipping Confirmation (Partially Fulfilled)', 'Orders & delivery', 4, 'Send an approved shipping message when only some items in an order have shipped.'),
  template('WhatsApp', 'Shipping Updates (Any Update)', 'Orders & delivery', 2, 'Send an approved message when an order’s shipment status changes.'),
  template('WhatsApp', 'Convert COD to Prepaid', 'Cash on delivery', 15, 'Offer a COD customer a generated discount code and payment link to pay online instead.'),
  template('WhatsApp', 'Collect Review (Manual Link)', 'Reviews', 4, 'Send an approved review request with a link after the order is delivered.'),
  template('WhatsApp', 'Reconfirm COD Order', 'Cash on delivery', 14, 'Ask a COD customer to confirm or cancel through a quick-reply template before shipping.'),
  template('WhatsApp', 'Collect Review (Star Rating)', 'Reviews', 10, 'Ask customers to rate an order from one to five using a WhatsApp quick-reply template.'),
  template('WhatsApp', 'Dormant Customer Win-Back', 'Welcome & retention', 3, 'Use a daily check to find customers whose last order was more than your chosen number of days ago.'),
  template('WhatsApp', 'Reconfirm COD Order (2 Attempts)', 'Cash on delivery', 16, 'Ask for COD confirmation or cancellation, with a second attempt 24 hours later.'),
];
