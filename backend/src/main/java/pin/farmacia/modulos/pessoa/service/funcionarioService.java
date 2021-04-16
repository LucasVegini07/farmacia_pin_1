package pin.farmacia.modulos.pessoa.service;
import org.springframework.beans.factory.annotation.Autowired;
import pin.farmacia.modulos.pessoa.model.funcionario;
import pin.farmacia.modulos.pessoa.repository.funcionarioRepository;
import pin.farmacia.modulos.pessoa.repository.pessoaRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;


@Service
public class funcionarioService {

    @Autowired
    funcionarioRepository funcionarioRepository;

    @Autowired
    pessoaRepository pessoaRepository;

    public funcionario cadastrarFuncionario(funcionario f){
        return funcionarioRepository.save(f);
    }

    public funcionario editaFuncionario(funcionario f){
        return funcionarioRepository.save(f);
    }
    public boolean autenticaFuncionario(String email, String senha){
        if(funcionarioRepository.existsByemail(email)){
            funcionario f = funcionarioRepository.getByEmail(email);
            if(f.getSenha().equals(senha))
                return true;
        }
        return false;
    }

    public funcionario getFuncionarioByEmail(String email){
                   funcionario f = funcionarioRepository.getByEmail(email);
                   return f;
    }

    public funcionario getFuncionarioById(int id){
        funcionario f = funcionarioRepository.getById(id);
        return f;
    }

    public List<funcionario> getAllFuncionarios() {
        return funcionarioRepository.findAllByOrderByIdAsc();
    }

    public boolean existeGerente(){
        return funcionarioRepository.existsByescopo("Gerente");
    }

    public funcionario desativaFuncionario(funcionario f){
        funcionario f1 = funcionarioRepository.getById(f.getId());
        f1.setAtivo(false);
        return funcionarioRepository.save(f1);
    }

    public funcionario ativaFuncionario(funcionario f){
        funcionario f1 = funcionarioRepository.getById(f.getId());
        f1.setAtivo(true);
        return funcionarioRepository.save(f1);
    }

    public boolean zerarComissao() {
        ArrayList<funcionario> funcionarios = new ArrayList<funcionario>();
        funcionarios = (ArrayList<funcionario>) funcionarioRepository.findAllByOrderByIdAsc();

        for (funcionario f : funcionarios){
            f.setComissao(0);
            funcionarioRepository.save(f);
        }
        return true;
    }

}
