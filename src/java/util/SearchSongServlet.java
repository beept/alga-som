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
import java.util.List;
import javax.servlet.ServletException;
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
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    String key = getKeyWord(request);
    String json = getJsonKeyOccurrences(key, response);
    submitJsonResponse(json, response);
  }

  private String getKeyWord(HttpServletRequest request) {
    return request.getParameter("songToSearch");
  }

  private String getJsonKeyOccurrences(String key, HttpServletResponse response) {
    
    List<String> list = new ArrayList();
    File objFile = new File(getServletContext().getRealPath("/songs"));
    String directory[] = objFile.list();
    
    for (String item : directory) {
      if (item.toLowerCase().contains(key.toLowerCase())) {
        list.add(item);
      }
    }
    return this.gson.toJson(list);
  }
  
  private void submitJsonResponse(String jsonString, HttpServletResponse response)
  {
    
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    
    try (PrintWriter out = response.getWriter()) {
      out.print(jsonString);
      out.flush();
      out.close();
    } catch (IOException e){
      System.out.println(e.getMessage());
    }
  }
}
