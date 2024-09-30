package br.com.projeto.api.servicos.ncm;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)  // Ignora campos desconhecidos no JSON
public class Nomenclatura {
    
    @JsonProperty("Codigo")
    private String codigo;
    
    @JsonProperty("Descricao")
    private String descricao;
    
    @JsonProperty("Data_Inicio")
    private String dataInicio;
    
    @JsonProperty("Data_Fim")
    private String dataFim;
    
    @JsonProperty("Tipo_Ato_Ini")
    private String tipoAtoIni;
    
    @JsonProperty("Numero_Ato_Ini")
    private String numeroAtoIni;
    
    @JsonProperty("Ano_Ato_Ini")
    private String anoAtoIni;
}
