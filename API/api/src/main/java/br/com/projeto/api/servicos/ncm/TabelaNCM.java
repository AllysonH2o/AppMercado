package br.com.projeto.api.servicos.ncm;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

@Data
public class TabelaNCM {
    
    @JsonProperty("Data_Ultima_Atualizacao_NCM")
    private String dataUltimaAtualizacaoNCM;
    
    @JsonProperty("Ato")
    private String ato;
    
    @JsonProperty("Nomenclaturas")
    private List<Nomenclatura> nomenclaturas;
}
