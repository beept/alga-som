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

    Part filePart = null;
    try {
      // get song part
      filePart = request.getPart("songFile");
      System.out.println("Received data successful");
    } catch (IOException | ServletException ex) {
      System.out.println(ex.getMessage());
    }

    // get folder path string and concat songs destination folders
    String path = getServletContext().getRealPath("/songs");
    System.out.println(path);

    // create new instance of folder object and create folder in build directory
    File newFolder = new File(path);
    if (newFolder.mkdir()) {
      System.out.println("Create");
    } else {
      System.out.println("Create fail!");
    }

    // declare InputStream object and assignment with of content file part obj
    InputStream fileContent = null;
    try {
      fileContent = filePart.getInputStream();
    } catch (IOException ex) {
      System.out.println(ex.getMessage());
    }

    // calling upload method passing arguments
    try {
      upload(path, songName, fileContent);
    } catch (IOException ex) {
      System.out.println(ex.getMessage());
    }
  }

  private void upload(String folder, String fileName, InputStream fileLoaded) throws FileNotFoundException, IOException {

    String filePath = folder + "/" + fileName;
    System.out.println(filePath);

    File newFile = new File(filePath);

    FileOutputStream out = new FileOutputStream(newFile);

    copyFile(fileLoaded, out);
  }

  private void copyFile(InputStream orign, OutputStream destiny) throws IOException {

    int _byte = 0;
    byte maxFileSize[] = new byte[1024];

    while ((_byte = orign.read(maxFileSize)) >= 0) {
      destiny.write(maxFileSize, 0, _byte);
    }

    orign.close();
    destiny.close();
  }
}
