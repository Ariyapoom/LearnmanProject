export class Student {
    private Student_ID;
    private Student_Name;
    private Student_Email;
    private Student_Progess;
    private Student_Section;
    private Student_Score;
    constructor(id,name,email,group){
        this.Student_ID = id;
        this.Student_Name = name;
        this.Student_Email = email;
        this.Student_Section = group;
        this.Student_Progess = {
            learning :
               [ false,
                false,
                false,
                false,
                false ]
            ,
            exercise : {
               101 : false,
               201 : false,
               202 : false,
               203 : false,
               301 : false,
               302 : false,
               303 : false,
               401 : false,
               402 : false,
               403 : false
            }
        };
        this.Student_Score = {
            101 : false,
            201 : false,
            202 : false,
            203 : false,
            301 : false,
            302 : false,
            303 : false,
            401 : false,
            402 : false,
            403 : false,
        };
    }

    getData(){
        return {
            Student_ID: this.Student_ID,
            Student_Name: this.Student_Name,
            Student_Email: this.Student_Email,
            Student_Section : this.Student_Section,
            Student_Progess : this.Student_Progess,
            Student_Score : this.Student_Score,
        }
    }

}