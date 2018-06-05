package grupo.cinco.backend.utils;

import org.json.simple.JSONObject;

public class Context {
    Strategy strategy;

    public Context(Strategy strategy){
        this.strategy = strategy;
    }
    public void setStrategy(Strategy strategy){
        this.strategy = strategy;
    }
    public String executeCode(String code){
        System.out.println("Estoy en context");
        if(code.contains("\"") || code.contains("\\n"))
        {
            String middleInput = code.replaceAll("\"","\\\"");
            String finalInput = middleInput.replaceAll("\\n","\\\\n");
            System.out.println(finalInput);
            return this.strategy.executeCode(finalInput);
        }
        return this.strategy.executeCode(code);
    }
}
