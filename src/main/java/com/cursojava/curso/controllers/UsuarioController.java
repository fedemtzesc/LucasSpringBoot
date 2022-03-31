package com.cursojava.curso.controllers;
//Aqui me quede: https://youtu.be/7vHzVN0EiQc?t=11253
import com.cursojava.curso.dao.IUsuarioDAO;
import com.cursojava.curso.model.Usuario;
import com.cursojava.curso.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UsuarioController {
    @Autowired
    private IUsuarioDAO usuarioDAO;

    @Autowired
    JWTUtil jwtUtil;

    @RequestMapping(value = "api/prueba")
    public List<String> prueba(){

        return List.of("Manzana", "Kiwi", "Sandia");
    }

    @GetMapping(path = {"api/saluda", "api/hola"})
    public String saludo(){
        return "Hola Mundo!";
    }

    @RequestMapping(value = "api/usuario/{id}", method = RequestMethod.GET)
    public Usuario getInfoUsuario(@PathVariable Long id){
        Usuario usr = new Usuario();
        usr.setId(id);
        usr.setNombre("Federico");
        usr.setApellido("Martinez Escamilla");
        usr.setEmail("fedemtzesc@hotmail.com");
        usr.setTelefono("8110099414");
        usr.setPassword("calibre3006");
        return usr;
    }

    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
    public List<Usuario> getListaUsuarios(@RequestHeader(value="Authorization") String token){
        if(!validarToken(token)) return null;

        return usuarioDAO.getUsuarios();
    }

    private boolean validarToken(String token){
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId!=null;
    }

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
    public void eliminarUsuario(@RequestHeader(value="Authorization") String token, @PathVariable Long id){
        if(!validarToken(token)) return;
        usuarioDAO.eliminar(id);
    }

    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuario usuario){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hashPwd = argon2.hash(1, 1024, 1, usuario.getPassword());
        usuario.setPassword(hashPwd);
        usuarioDAO.registrar(usuario);
    }

}
