<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- 
    Document   : lista
    Created on : 10/03/2022, 21:33:42
    Author     : Aluno
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<c:url value="/subirMusica" var="linkCarregaMusicaServlet"/>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Modulo de Busca Música</title>
    </head>
    <body>
        <h1>Buscar Música</h1>
        <form action="ListaMusica">
            <input type="submit" value="Listar Músicas" name="listSong" />
        </form>
    </body>
</html>
