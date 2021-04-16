package pin.farmacia;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import pin.farmacia.modulos.produto.service.produtoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Component
public class ApplicationStartUp {

    @Autowired
    produtoService produtoService;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(getOriginsFromFile())
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD")
                        .allowedHeaders("content-type", "Authorization", "Origin", "Referer", "Accept", "Host",
                                "Accept-Encoding", "Accept-Language", "Connection", "Sec-Fetch-Dest", "Sec-Fetch-Mode",
                                "Sec-Fetch-Site", "User-Agent")
                        .allowCredentials(true);
            }
        };
    }
    private String[] getOriginsFromFile() {
        try {
            File arq = new File(
                    System.getProperty("user.dir") + File.separator + "config" + File.separator + "origins.conf");
            BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(arq), StandardCharsets.UTF_8));
            List<String> list = new ArrayList<>();
            String line;
            while ((line = br.readLine()) != null)
                list.add(line);
            br.close();
            String[] origins = new String[list.size()];
            for (int i = 0; i < list.size(); i++) {
                origins[i] = list.get(i);
            }
            return origins;
        } catch (IOException e) {
            e.printStackTrace();
            Thread.currentThread().interrupt();
            return null;
        }
    }
}
