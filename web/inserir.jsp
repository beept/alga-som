<%@page contentType="text/html" pageEncoding="UTF-8"%>
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
        <select name="musicGenre">
          <option value="Funk">Funk</option>
          <option value="Sertanjo">Sertanjo</option>
          <option value="Rap">Rap</option>
        </select>
      </label>
      <br>
      <label>Nome da Música: <input type="text" name="songName" placeholder="Insira o Estilo" value="defaultName" required pattern="[\w\s]+"></label>
      <br>
      <label>Nome do Cantor: <input type="text" name="songAuthor" placeholder="Insira o Nome do Cantor" value="defaultAuthor" required pattern="[\w\s]+"></label>
      <br>
      <input type="file" name="songFile" />
      <br>
      <input type="submit" value="Salvar Música"/>
    </form>
    <script src="newSongPageController.js"></script>
  </body>
</html>


