package grupo.cinco.backend.utils;



import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class ApiCode {
    
    private ApiCode() {
        throw new IllegalStateException("Utility class");
    }
    private static ApiData apiData = new ApiData("application/json","Token d5a563f4-d2b4-4a1e-b974-25d880169f1e");
    public static String executeCode(URL url, String input)
    {
        //JSONParser parser = new JSONParser();
        //JSONObject json = null;
        try {

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", apiData.getContentTypeData());
            connection.setRequestProperty("authorization", apiData.getApiTokenData());


            OutputStream outputStream = connection.getOutputStream();
            outputStream.write(input.getBytes());
            outputStream.flush();
            //System.out.println("Pasó");

            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                throw new RuntimeException("Please check your inputs : HTTP error code : " + connection.getResponseCode());
            }

            BufferedReader bufferedReader;
            bufferedReader = new BufferedReader(new InputStreamReader(
                    (connection.getInputStream())));

            String output = bufferedReader.readLine();
            //json  = (JSONObject) parser.parse(output);
            connection.disconnect();
            return output;

        } catch (IOException  e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }
}
