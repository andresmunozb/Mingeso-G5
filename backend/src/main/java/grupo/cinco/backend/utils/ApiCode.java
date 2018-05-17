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

    public static JSONObject executeCode(URL url, String input)
    {
        JSONParser parser = new JSONParser();
        JSONObject json = null;
        try {

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("authorization", "Token 2e2f1102-0e6c-46dc-9d3a-ce7456eb0ecd");

            System.out.println("Conexión exitosa :)");

            OutputStream outputStream = connection.getOutputStream();
            outputStream.write(input.getBytes());
            outputStream.flush();

            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                throw new RuntimeException("Please check your inputs : HTTP error code : " + connection.getResponseCode());
            }

            BufferedReader bufferedReader;
            bufferedReader = new BufferedReader(new InputStreamReader(
                    (connection.getInputStream())));

            System.out.printf("Output from GLOT");
            String output = bufferedReader.readLine();
            json  = (JSONObject) parser.parse(output);
            System.out.println(json);
            connection.disconnect();

        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return json;
    }
}
