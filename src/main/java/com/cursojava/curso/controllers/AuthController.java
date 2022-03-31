package com.cursojava.curso.controllers;


import com.cursojava.curso.dao.IUsuarioDAO;
import com.cursojava.curso.model.Usuario;

import com.cursojava.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private IUsuarioDAO usuarioDAO;

    @Autowired
    private JWTUtil jwtUtil;


    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario){
        Usuario usr = usuarioDAO.doLogin(usuario);

        if(usr!=null){
            String tokenJWT = jwtUtil.create(String.valueOf(usr.getId()),
                            usr.getEmail());
            return tokenJWT;
        }else{
            return "FAIL";
        }


    }
    
}
