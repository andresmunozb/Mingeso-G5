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
    public JSONObject executeCode(String code){
        if(code.contains("\""))
        {
            String middleInput = code.replace("\"","\\\"");
            if(middleInput.contains("\\n"))
            {
                String finalInput = middleInput.replace("\\n", "\\\\n");
                return this.strategy.executeCode(finalInput);
            }
            else return this.strategy.executeCode(middleInput);
        }
        return this.strategy.executeCode(code);
    }
}
