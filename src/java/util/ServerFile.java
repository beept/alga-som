/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 *
 * @author Victor Rodrigues at https://github/taveirasrc
 */
public class ServerFile {
  public void upFile(String folder, String fileName, InputStream fileLoaded) throws FileNotFoundException, IOException
  {
    String filePath = folder + "/" + fileName; 
    File newFile = new File(filePath);
    
    FileOutputStream out = new FileOutputStream(newFile);
    
    copyFile(fileLoaded, out);
  }
  
  private void copyFile(InputStream orign, OutputStream destiny) throws IOException {
    
    int _byte = 0;
    byte maxFileSize[]  = new byte[1024 * 100];
    
    while ((_byte = orign.read(maxFileSize)) >= 0)
    {
      destiny.write(maxFileSize, 0, _byte);
    }
    
    orign.close();
    destiny.close();
  }
}
