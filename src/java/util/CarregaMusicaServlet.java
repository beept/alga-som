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
@MultipartConfig(
        location = "/",
        fileSizeThreshold = 1024 * 1024, // 1MB * 
        maxFileSize = 1024 * 1024 * 100, // 100MB **
        maxRequestSize = 1024 * 1024 * 10 * 10 // 100MB ***)
)

@WebServlet(name = "CarregaMusicaServlet", urlPatterns = {"/CarregaMusica"})
public class CarregaMusicaServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        System.out.println("Received data successful");

        String songName = request.getParameter("concatSongName");
        Part filePart = request.getPart("songFile");
        String path = getServletContext().getRealPath("/songs");
        System.out.println(path);
        InputStream fileContent = filePart.getInputStream();
        
        upload(path, songName, fileContent);
    }

    private void upload(String folder, String fileName, InputStream fileLoaded) throws FileNotFoundException, IOException {

        String filePath = folder + "\\" + fileName;
        System.out.println(filePath);
        
        File newFile = new File(filePath);

        FileOutputStream out = new FileOutputStream(newFile);

        copyFile(fileLoaded, out);
    }

    private void copyFile(InputStream orign, OutputStream destiny) throws IOException {

        int _byte = 0;
        byte maxFileSize[] = new byte[1024 * 100];

        while ((_byte = orign.read(maxFileSize)) >= 0) {
            destiny.write(maxFileSize, 0, _byte);
        }

        orign.close();
        destiny.close();
    }
}
