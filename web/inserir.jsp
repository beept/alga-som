<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib  uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:url value="/subirMusica" var="linkCarregaMusicaServlet"/>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Modulo de Música</title>
    <link rel="stylesheet" href="style/reset.css"/>
  </head>
  <body>
    <h1>Carregar Música</h1>
    <form name="subirMusica" method="POST" enctype="multipart/form-data">
      <label>Genêro:
        <select>
          <option value="funk">Funk</option>
          <option value="ser">Sertanjo</option>
          <option value="rap">Rap</option>
        </select>
      </label>
      <br>
      <label>Nome da Música: <input type="text" name="song_name"  placeholder="Insira o Estilo" value="defaultName" required pattern="^[a-zA-Z]*"></label>
      <br>
      <label>Nome do Cantor: <input type="text" name="song_author" placeholder="Insira o Nome do Cantor" value="defaultAuthor" required></label>
      <br>
      <input type="file" name="song_file" />
      <br>
      <input type="submit" value="Salvar Música"/>
    </form>
    <script src="controllers/newSongPageController.js"></script>
  </body>
</html>


