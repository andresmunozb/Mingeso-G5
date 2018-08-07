package grupo.cinco.backend.utils;


public class Context {
    Strategy strategy;

    public Context(Strategy strategy){
        this.strategy = strategy;
    }
    public void setStrategy(Strategy strategy){
        this.strategy = strategy;
    }
    public String executeCode(String code){
        if(code.contains("\"") || code.contains("\\n"))
        {
            String middleInput = code.replace("\"","\\\"");
            String finalInput = middleInput.replace("\\n","\\\\n");
            return this.strategy.executeCode(finalInput);
        }
        return this.strategy.executeCode(code);
    }
}
