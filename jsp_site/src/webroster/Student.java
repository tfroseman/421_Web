package webroster;

import java.io.Serializable;

/**
 * jsp_site.webroster
 * thomasroseman on 3/25/16
 */
public class Student implements Serializable {
    private String first_name;
    private String last_name;
    private String psu_id;
    private String team;

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getPsu_id() {
        return psu_id;
    }

    public void setPsu_id(String psu_id) {
        this.psu_id = psu_id;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Student(String first_name, String last_name, String psu_id, String team) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.psu_id = psu_id;
        this.team = team;
    }
}
