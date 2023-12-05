package group5.ies.countmein.entities.dto;

import java.util.List;

import group5.ies.countmein.entities.Sala;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDTO {
    private long id;
    private String name;
    private List<Sala> salas;
}
