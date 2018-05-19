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
        return this.strategy.executeCode(code);
    }
}
