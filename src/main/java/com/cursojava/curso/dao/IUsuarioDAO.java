package com.cursojava.curso.dao;

import com.cursojava.curso.model.Usuario;
import java.util.List;


public interface IUsuarioDAO {

    //Metodos para traer una lista de usuarios
    List<Usuario> getUsuarios();

    void eliminar(Long id);

    void registrar(Usuario usuario);

    Usuario doLogin(Usuario usuario);

    
}
