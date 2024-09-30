package br.com.projeto.api.servicos.ncm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class NomenclaturaController {

    @Autowired
    private NomenclaturaService nomenclaturaService;


    // localhost:8080/ncm/descricao?codigo=61.01
    @GetMapping("/ncm/descricao")
    public String getDescricao(@RequestParam String codigo) {
        try {
            return nomenclaturaService.getDescricaoByCodigo(codigo);
        } catch (IOException e) {
            return "Erro ao ler o arquivo JSON: " + e.getMessage();
        } catch (IllegalArgumentException e) {
            return e.getMessage();
        }
    }

    // Novo endpoint para código sem pontos
    // localhost:8080/ncm/descricao-sem-pontos?codigo=6101
    @GetMapping("/ncm/descricao-sem-pontos")
    public String getDescricaoSemPontos(@RequestParam String codigo) {
        try {
            return nomenclaturaService.getDescricaoByCodigoSemPontos(codigo);
        } catch (IOException e) {
            return "Erro ao ler o arquivo JSON: " + e.getMessage();
        } catch (IllegalArgumentException e) {
            return e.getMessage();
        }
    }
}
