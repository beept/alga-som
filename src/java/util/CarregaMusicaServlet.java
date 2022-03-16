/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Aluno
 */

@MultipartConfig(
    location="/", 
    fileSizeThreshold=1024*1024, // 1MB * 
    maxFileSize=1024*1024*100, // 100MB **
    maxRequestSize=1024*1024*10*10 // 100MB ***
)

@WebServlet(name = "CarregaMusicaServlet", urlPatterns = {"/CarregaMusica"})
public class CarregaMusicaServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      
    }
}
