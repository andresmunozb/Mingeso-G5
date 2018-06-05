package grupo.cinco.backend.utils;

import org.json.simple.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;

public class StrategyC implements Strategy{

    @Override
    public String executeCode(String code) {
        URL url = null;
        try {
            url = new URL("https://run.glot.io/languages/c");
        } catch (MalformedURLException e) {
            return null;
        }
        String input = "{\"files\": [{\"name\" : \"main.c\", \"content\": \"" + code +"\"}]}";
        System.out.println(input);
        return ApiCode.executeCode(url,input);
    }
}
