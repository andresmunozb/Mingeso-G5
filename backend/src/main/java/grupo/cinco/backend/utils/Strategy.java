package grupo.cinco.backend.utils;

import org.json.simple.JSONObject;

public interface Strategy {

    JSONObject executeCode(String code);
}
