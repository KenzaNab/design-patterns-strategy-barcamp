interface PaymentStrategy {
    void collectPaymentDetails();
    boolean validatePaymentDetails();
    void pay(int amount);
}

class CreditCard {
    private int amount;
    private final String number;
    private final String expiryDate;
    private final String cvv;

    public CreditCard(String number, String expiryDate, String cvv) {
        this.number = number;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
        this.amount = 1_000;
    }

    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }

    private String mask(String card) {
        return "**** **** **** " + card.substring(Math.max(0, card.length() - 4));
    }

    @Override
    public String toString() {
        return "Card[" + mask(number) + ", exp=" + expiryDate + "]";
    }
}

class PaymentByCreditCard implements PaymentStrategy {
    private CreditCard card;

    @Override
    public void collectPaymentDetails() {
        card = new CreditCard("4111111111111111", "12/27", "123");
        System.out.println("Collecting Card Details...");
    }

    @Override
    public boolean validatePaymentDetails() {
        System.out.println("Validating Card Info: " + card);
        return card != null;
    }

    @Override
    public void pay(int amount) {
        if (card.getAmount() < amount) {
            System.out.println("Insufficient funds on " + card);
            return;
        }
        card.setAmount(card.getAmount() - amount);
        System.out.println("Paying " + amount + " using Credit Card. Remaining balance: " + card.getAmount());
    }
}

class PaymentByPayPal implements PaymentStrategy {
    private String email;
    private String password;

    @Override
    public void collectPaymentDetails() {
        email = "user@example.com";
        password = "s3cr3t!";
        System.out.println("Collecting PayPal Account Details...");
    }

    @Override
    public boolean validatePaymentDetails() {
        System.out.printf("Validating PayPal Info: %s | %s%n", email, password);
        return email != null && !email.isBlank() && password != null && !password.isBlank();
    }

    @Override
    public void pay(int amount) {
        System.out.println("Paying " + amount + " using PayPal");
    }
}

class PaymentService {
    public void processOrder(String paymentType, int amount) {
        PaymentStrategy strategy = getPaymentStrategy(paymentType);
        if (strategy == null) {
            System.out.println("Unknown payment method: " + paymentType);
            return;
        }
        strategy.collectPaymentDetails();
        if (strategy.validatePaymentDetails()) {
            strategy.pay(amount);
        } else {
            System.out.println("Validation failed. Aborting payment.");
        }
    }

    private PaymentStrategy getPaymentStrategy(String type) {
        if (type.equalsIgnoreCase("CREDIT_CARD")) {
            return new PaymentByCreditCard();
        } else if (type.equalsIgnoreCase("PAYPAL")) {
            return new PaymentByPayPal();
        }
        return null;
    }
}

public class Main {
    public static void main(String[] args) {
        PaymentService service = new PaymentService();

        service.processOrder("CREDIT_CARD", 100);
        System.out.println("==================================");
        service.processOrder("PAYPAL", 150);
    }
}
