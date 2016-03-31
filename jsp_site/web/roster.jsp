<%@ page import="java.util.ArrayList" %>
<%@ page import="webroster.Student" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>$Title$</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
          integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css"
          integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

</head>
<body>
<div class="container">
    <div class="row">
        <table class="table table-striped">
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>PSU ID</th>
                <th>Team</th>
            </tr>
            </thead>
            <tbody>
            <jsp:useBean id="roster" type="webroster.Roster" class="webroster.Roster">

            </jsp:useBean>
            <!--These tags are discouraged should upgrade to new c tags "$ { }"-->
            <%
                ArrayList<Student> students = new ArrayList<Student>();
                String method = request.getMethod();
                if (!method.equalsIgnoreCase("GET")) {
                    response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "This endpoint does not accept requests other" +
                            " than GET");
                } else {
                    roster.setServletContext(application);
                    students = roster.getRoster();
                }

                for(int i = 0; i < students.size(); i++){ %>
            <tr>
                <td><%= students.get(i).getFirst_name() %></td>
                <td><%= students.get(i).getLast_name() %></td>
                <td><%=students.get(i).getPsu_id() %></td>
                <td><%=students.get(i).getTeam() %></td>

            </tr>
            <% } %>
            </tbody>
        </table>
    </div>

</div>
</body>
</html>
