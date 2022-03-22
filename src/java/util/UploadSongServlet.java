/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

/**
 *
 * @author Aluno
 */
@MultipartConfig(location = "/tmp", fileSizeThreshold = 10485760, maxFileSize = 10485760, maxRequestSize = 10485760)
@WebServlet(name = "UploadSongServlet", urlPatterns = {"/upsong"})
public class UploadSongServlet extends HttpServlet {

  /**
   *
   * @param request
   * @param response
   */
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) {

    // get song name
    String songName = request.getParameter("concatSongName");
    InputStream fileContent = null;
    FileOutputStream out = null;
    File newFolder = null;
    Part filePart = null;
    File newFile = null;
    byte maxFileSize[];
    String path = "";
    int bite = 0;
    
    // get song part
    try {
      filePart = request.getPart("songFile");
      System.out.println("[1]Received data successful");
    } catch (IOException | ServletException ex) {
      System.out.println("[1.1]Erro: " + ex.getMessage());
    }

    // get folder path string and concat songs destination folders
    path = getServletContext().getRealPath("/songs");
    System.out.println("[2]" + path);

    // create new instance of folder object and create folder in build directory
    newFolder = new File(path);
    if (newFolder.mkdir()) {
      System.out.println("[3]: Create");
    } else {
      System.out.println("[3.1]: Create fail! check if the folder is already created");
    }

    // declare InputStream object and assignment with of content file part obj
    try {
      fileContent = filePart.getInputStream();
    } catch (IOException ex) {
      System.out.println("[4.1]: " + ex.getMessage());
    }
    
    // calling upload method passing arguments
    String filePath = path + "/" + songName;
    System.out.println("[5]: " + filePath);

    newFile = new File(filePath);
    try {
        out = new FileOutputStream(newFile);
    } catch (FileNotFoundException ex) {
        System.out.println("[6.1] Erro: " + ex.getMessage());
    }
    
    maxFileSize = new byte[1024];
    try {
        while ((bite = fileContent.read(maxFileSize)) >= 0) 
        {
            out.write(maxFileSize, 0, bite);
        } 
    } catch (IOException ex) {
        System.out.println("[7.1] Erro: " + ex.getMessage());
    }

    try {
        fileContent.close();
    } catch (IOException ex) {
        System.out.println("[8.1] Erro: " + ex.getMessage());
    }
      
    try {
        out.close();
    } catch (IOException ex) {
        System.out.println("[9.1] Erro: " + ex.getMessage());
    }
  }
}
