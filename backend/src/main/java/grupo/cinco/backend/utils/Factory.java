package grupo.cinco.backend.utils;

public class Factory {

    public Strategy getStrategy(String language){
        if(language == null){
            return null;
        }
        if(language.equals("c")){
            return new StrategyC();

        } else if(language.equals("python")){
            return new StrategyPython();

        } else if(language.equals("java")){
            return new StrategyJava();
        }

        return null;
    }
}
