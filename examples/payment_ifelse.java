class PaymentService {
    private int cost;
    private boolean includeDelivery = true;

    public void processOrder(String paymentType, int cost) {
        this.cost = cost;
        int total = getTotal();

        if (paymentType.equals("CREDIT_CARD")) {
            validateCard();
            processCardPayment(total);
        } else if (paymentType.equals("PAYPAL")) {
            validatePayPal();
            processPayPalPayment(total);
        } else if (paymentType.equals("APPLE_PAY")) {
            validateApplePay();
            processApplePayPayment(total);
        } else {
            System.out.println("Unknown payment method: " + paymentType);
        }
    }

    private int getTotal() {
        return includeDelivery ? cost + 10 : cost;
    }

    private void validateCard() {
        System.out.println("Validating Credit Card details...");
    }

    private void processCardPayment(int amount) {
        System.out.println("Paying " + amount + " using Credit Card");
    }

    private void validatePayPal() {
        System.out.println("Validating PayPal account...");
    }

    private void processPayPalPayment(int amount) {
        System.out.println("Paying " + amount + " using PayPal");
    }

    private void validateApplePay() {
        System.out.println("Validating Apple Pay account...");
    }

    private void processApplePayPayment(int amount) {
        System.out.println("Paying " + amount + " using Apple Pay");
    }
}

public class Main {
    public static void main(String[] args) {
        PaymentService service = new PaymentService();

        service.processOrder("CREDIT_CARD", 100);
        System.out.println("==================================");
        service.processOrder("PAYPAL", 150);
        System.out.println("==================================");
        service.processOrder("APPLE_PAY", 200);
    }
}
