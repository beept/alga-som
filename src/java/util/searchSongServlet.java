/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import java.io.File;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Aluno
 */
@WebServlet(name = "ListaMusicaServlet", urlPatterns = {"/searchSong"})
public class searchSongServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      System.out.println("---------------LISTA---------------");
      String path = getServletContext().getRealPath("/songs");
      System.out.println(path);
      File objFile = new File(path);
      if (objFile.isDirectory())
      {
        System.out.printf("\nConteúdo do diretório:\n");
         String diretorio[] = objFile.list();
         for (String item: diretorio) {
           System.out.printf("%s\n", item);
         }
      }
    }
}
