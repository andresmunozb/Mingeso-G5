package grupo.cinco.backend.utils;

public class Context {
    Strategy strategy;

    public Context(Strategy strategy){
        this.strategy = strategy;
    }
    public void setStrategy(Strategy strategy){
        this.strategy = strategy;
    }
    public void executeCode(String code){
        this.strategy.executeCode(code);
    }
}
