package grupo.cinco.backend.utils;

public class StrategyNull implements Strategy{
    @Override
    public String executeCode(String code) {
       return "Null";
    }
    @Override
    public boolean isNil() {
        return true;
    }

}
