package webroster;


import java.beans.XMLEncoder;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.Serializable;
import java.nio.charset.Charset;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import javax.servlet.ServletContext;

import java.util.ArrayList;
import java.util.List;

public class Roster implements Serializable {
    private ArrayList<Student> roster;
    private List<String> lines;
    private ServletContext servletContext;

    private String f_name;
    private String l_name;
    private String psu_id;
    private String team;

    public Roster() {
    }

    public void setServletContext(ServletContext servletContext){
        this.servletContext = servletContext;
    }

    public ServletContext getServletContext(){
        return this.servletContext;
    }

    public String getRoster(){
        if(getServletContext() == null){
            return null;
        }

        if(roster == null){
            populate();
        }

        return toXML(roster);
    }

    private void populate() {
        Path path = FileSystems.getDefault().getPath("Roster.txt");
        System.out.println(path.toString());
        try {
            lines = Files.readAllLines(path, Charset.defaultCharset());
        } catch (IOException e) {
            e.printStackTrace();
        }
        if(lines != null) {
            for (int i = 5; i < lines.size(); i++) {

                if (i % 5 == 0) {
                    l_name = lines.get(i);
                } else if (i % 5 == 1) {
                    f_name = lines.get(i);
                } else if (i % 5 == 2) {
                    psu_id = lines.get(i);
                } else if (i % 5 == 3) {
                    team = lines.get(i);
                }

                if (i % 5 == 4) {
                    roster.add(new Student(f_name, l_name, psu_id, team));
                }
            }
        }else{
            System.out.println("Is null");
        }

    }

    private String toXML(ArrayList roster) {
        String xml = null;
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            XMLEncoder encoder = new XMLEncoder(out);
            encoder.writeObject(roster); // serialize to XML
            encoder.close();
            xml = out.toString(); // stringify
        }
        catch(Exception e) { }
        //System.out.println(xml.trim());
        return xml;
    }
}
