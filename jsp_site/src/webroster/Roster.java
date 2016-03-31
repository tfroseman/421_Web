package webroster;


import java.io.*;
import java.nio.charset.Charset;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import javax.servlet.ServletContext;

import java.util.ArrayList;
import java.util.List;

import static java.lang.System.in;

public class Roster {
    private ArrayList<Student> roster = new ArrayList<>();
    private List<String> lines;
    private ServletContext servletContext;

    private String f_name;
    private String l_name;
    private String psu_id;
    private String team;

    public Roster() {
    }

    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    public ServletContext getServletContext() {
        return this.servletContext;
    }

    public ArrayList getRoster() {
        populate();

        if (getServletContext() == null) {
            return null;
        }


        return roster;
    }

    private void populate() {
        InputStream inputStream = servletContext.getResourceAsStream("/Users/thomasroseman/Code/Class/421_Web/jsp_site/src/webroster/Roster.txt");
        Path path = FileSystems.getDefault().getPath("/Users/thomasroseman/Code/Class/421_Web/jsp_site/src/webroster/Roster.txt");

        if (inputStream != null) {
            try {
                InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
                BufferedReader bufferedReader = new BufferedReader(inputStreamReader);

                int i = 0;
                String line;
                while ((line = bufferedReader.readLine()) != null) {
                    if (i % 5 == 0) {
                        this.l_name = line;
                    } else if (i % 5 == 1) {
                        this.f_name = line;
                    } else if (i % 5 == 2) {
                        this.psu_id = line;
                    } else if (i % 5 == 3) {
                        this.team = line;
                    } else {
                        this.roster.add(new Student(this.f_name, this.l_name, this.psu_id, this.team));
                    }
                    i++;
                }
            } catch (IOException e) {

            }
        }
        try {
            this.lines = Files.readAllLines(path, Charset.defaultCharset());
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println(lines.size());
        for (int i = 5; i < this.lines.size(); i++) {

            if (i % 5 == 0) {
                this.l_name = lines.get(i);
            } else if (i % 5 == 1) {
                this.f_name = lines.get(i);
            } else if (i % 5 == 2) {
                this.psu_id = lines.get(i);
            } else if (i % 5 == 3) {
                this.team = lines.get(i);
            }else{
                this.roster.add(new Student(this.f_name, this.l_name, this.psu_id, this.team));
            }
        }

    }

}
