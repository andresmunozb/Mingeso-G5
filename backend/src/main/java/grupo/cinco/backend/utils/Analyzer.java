package grupo.cinco.backend.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.apache.commons.lang3.StringUtils;

public class Analyzer {

    public boolean verifyIndentation(String code)
    {
        List<String> codeList = Arrays.asList(code.split("\n"));
        int nlines = codeList.size();
        int counterTabs = 0;
        for(String line:codeList)
        {
            if (line.contains("    "))
            {
                counterTabs+=1;
            }
        }

        //Si del código completo, solo el 30% o menos, esta indentando...
        //Se le manda un mensaje de que se preocupe de la indentación.
        if(counterTabs <= 0.3*nlines)
        {
            return false;
        }
        else return true;

    }

    //Este método es para encontrar los comentarios, de ENTRADA, PROCESAMIENTO y SALIDA dentro del codigo.
    public boolean detectOrganization(String code, String language)
    {
        List<String> codeList = Arrays.asList(code.split("\n"));
        boolean answer = false;
        int flagEntry = 0;
        int flagProcess = 0;
        if(language.equals("python"))
        {
            for(String line: codeList)
            {
                if(line.equals("#ENTRADA"))
                {
                    flagEntry = 1;
                }

                else if (flagEntry == 1 && line.equals("#PROCESAMIENTO"))
                {
                    flagProcess = 1;
                }

                else if (flagProcess == 1 && line.equals("#SALIDA"))
                {
                    answer = true;
                }
            }
        }

        else if(language.equals("c") || language.equals("java"))
        {
            for(String line: codeList)
            {
                if(line.equals("//ENTRADA"))
                {
                    flagEntry = 1;
                }

                else if (flagEntry == 1 && line.equals("//PROCESAMIENTO"))
                {
                    flagProcess = 1;
                }

                else if (flagProcess == 1 && line.equals("//SALIDA"))
                {
                    answer = true;
                }
            }
        }

        return answer;
    }

    public boolean representativeVariables(String code, String language)
    {
        List<String> codeList = Arrays.asList(code.split("\n"));
        boolean answer = false;
        ArrayList<String> invalid = new ArrayList<>();
        if(language.equals("python"))
        {
            for(String line: codeList)
            {
                if(line.contains("="))
                {
                    String variable = StringUtils.substringBefore(line,"=");
                }
            }
        }
    }


}
