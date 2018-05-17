package grupo.cinco.backend.utils;

public class StrategyJava implements Strategy {

    @Override
    public void executeCode(String code) {
        System.out.println("Strategy: Java");
    }
}
