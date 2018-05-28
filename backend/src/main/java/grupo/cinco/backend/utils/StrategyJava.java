package grupo.cinco.backend.utils;

import org.json.simple.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;

public class StrategyJava implements Strategy {

    @Override
    public JSONObject executeCode(String code) {
        URL url = null;
        try {
            url = new URL("https://run.glot.io/languages/java");
        } catch (MalformedURLException e) {
        }
        String input = "{\"files\": [{\"name\" : \"Main.java\", \"content\": \"" + code +"\"}]}";
        return ApiCode.executeCode(url,input);
    }
}
