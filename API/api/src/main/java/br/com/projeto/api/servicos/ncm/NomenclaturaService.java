package br.com.projeto.api.servicos.ncm;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;
import java.util.Optional;

@Service
public class NomenclaturaService {

    private static final String JSON_FILE_PATH = "API/api/src/main/resources/static/Tabela_NCM_Vigente_20240929.json";

    public String getDescricaoByCodigo(String codigo) throws IOException {
        // Configura o ObjectMapper para usar snake_case
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);

        // Carrega e converte o JSON em um objeto Java
        TabelaNCM tabelaNCM = objectMapper.readValue(new File(JSON_FILE_PATH), TabelaNCM.class);

        // Busca a nomenclatura pelo código
        Optional<Nomenclatura> nomenclatura = tabelaNCM.getNomenclaturas().stream()
                .filter(n -> n.getCodigo().equals(codigo))
                .findFirst();

        // Retorna a descrição se o código for encontrado, caso contrário, lança exceção
        if (nomenclatura.isPresent()) {
            return nomenclatura.get().getDescricao();
        } else {
            throw new IllegalArgumentException("Código não encontrado: " + codigo);
        }
    }

        // Novo método que recebe o código sem pontos
        public String getDescricaoByCodigoSemPontos(String codigoSemPontos) throws IOException {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);
    
            TabelaNCM tabelaNCM = objectMapper.readValue(new File(JSON_FILE_PATH), TabelaNCM.class);
    
            // Converte o código do JSON para uma versão sem pontos e compara
            Optional<Nomenclatura> nomenclatura = tabelaNCM.getNomenclaturas().stream()
                    .filter(n -> n.getCodigo().replaceAll("\\.", "").equals(codigoSemPontos))
                    .findFirst();
    
            if (nomenclatura.isPresent()) {
                return nomenclatura.get().getDescricao();
            } else {
                throw new IllegalArgumentException("Código não encontrado: " + codigoSemPontos);
            }
        }
}
