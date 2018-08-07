package grupo.cinco.backend.utils;

public class ApiData {

    private String contentTypeData;
    private String apiTokenData;

    public ApiData(String contentTypeData, String apiTokenData)
    {
        this.contentTypeData = contentTypeData;
        this.apiTokenData = apiTokenData;
    }

    public String getContentTypeData() {
        return contentTypeData;
    }

    public String getApiTokenData() {
        return apiTokenData;
    }
}
