<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>$Title$</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

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
                <%
                    String method = request.getMethod();
                    if(!method.equalsIgnoreCase("GET")){
                        response.sendError(response.SC_METHOD_NOT_ALLOWED, "This endpoint does not accept requests other" +
                                " than GET");
                    }else{
                        roster.setServletContext(application);
                        out.println(roster.getRoster());
                    }
                %>
            </jsp:useBean>
            </tbody>
        </table>
    </div>

</div>
</body>
</html>
