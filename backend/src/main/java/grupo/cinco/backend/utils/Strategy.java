package grupo.cinco.backend.utils;

import org.json.simple.JSONObject;

public interface Strategy {

    String executeCode(String code);
    public abstract boolean isNil();
}
