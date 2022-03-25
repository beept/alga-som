/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import com.google.gson.Gson;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Aluno
 */
@WebServlet(name = "ListaMusicaServlet", urlPatterns = {"/searchsong"})
public class SearchSongServlet extends HttpServlet {

  private final Gson gson = new Gson();

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) {

    ArrayList<String> list;
    String directory[];
    PrintWriter out;
    File objFile;
    String json;
    String key;

    list = new ArrayList<>();
    key = request.getParameter("songToSearch");
    System.out.println("Key: " + key);

    objFile = new File(getServletContext().getRealPath("/songs"));
    directory = objFile.list();


    if (directory != null) {
      for (String item : directory) {
        if (item.toLowerCase().contains(key.toLowerCase())) {
          list.add(item);
        }
      }
    }

    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    json = this.gson.toJson(list);
    try {
      out = response.getWriter();
      out.print(json);
      out.flush();
      out.close();
    } catch (IOException ex) {
      System.out.println("[1] ERRO: " + ex.getMessage());
    }
  }
}
