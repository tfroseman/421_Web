<%@ page import="java.util.ArrayList" %>
<%@ page import="webroster.Student" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="container">
    <div class="row">
        <table id="roster" class="table table-striped sortable">
            <thead>
            <tr>
                <th id="first_name" class="table_header">First Name</th>
                <th id="last_name" class="table_header">Last Name</th>
                <th id="psu_id" class="table_header">PSU ID</th>
                <th id="team" class="table_header">Team</th>
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
