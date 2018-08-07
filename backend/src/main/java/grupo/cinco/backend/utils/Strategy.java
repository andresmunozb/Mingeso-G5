package grupo.cinco.backend.utils;


public interface Strategy {

    String executeCode(String code);
    public abstract boolean isNil();
}
