package webroster;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

/**
 * jsp_site.webroster
 * thomasroseman on 3/30/16
 */
public class teseter {

    public static void main(String[] args) {
        ArrayList<Student> roster = new ArrayList<>();
        List<String> lines = null;
        String f_name = "";
        String l_name = "";
        String psu_id = "";
        String team = "";
        FileReader fileReader;
        //InputStream inputStream = servletContext.getResourceAsStream("/Users/thomasroseman/Code/Class/421_Web/jsp_site/src/webroster/Roster.txt");
        //Path path = FileSystems.getDefault().getPath("/Users/thomasroseman/Code/Class/421_Web/jsp_site/src/webroster/Roster.txt");
        try {
            fileReader = new FileReader("/Users/thomasroseman/Code/Class/421_Web/jsp_site/src/webroster/Roster.txt");
        } catch (FileNotFoundException e) {
            e.printStackTrace();

        }
    }
}
