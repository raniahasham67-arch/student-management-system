class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades;
        this.attendance = attendance;
    }

    calculateAverage() {
        let total = this.grades.reduce(function(sum, grade) {
            return sum + grade;
        }, 0);

        return total / this.grades.length;
    }

    getGrade() {
        let average = this.calculateAverage();

        if (average >= 90) {
            return "A";
        } else if (average >= 80) {
            return "B";
        } else if (average >= 70) {
            return "C";
        } else if (average >= 60) {
            return "D";
        } else if (average >= 50) {
            return "E";
        } else {
            return "F";
        }
    }

    getFinalResult() {
        if (this.calculateAverage() >= 50 && this.attendance >= 75) {
            return "Passed";
        } else {
            return "Needs Review";
        }
    }
}

// Students Data
let studentsList = [
    new Student(1, "Rania", [90, 85, 95], 90),
    new Student(2, "Islam", [45, 48, 42], 80),
    new Student(3, "Youssef", [70, 75, 80], 85),
    new Student(4, "Misk", [40, 45, 48], 70)
];

// Filter struggling students
let strugglingStudents = studentsList.filter(function(student) {
    let average = student.calculateAverage();
    return average >= 40 && average <= 49;
});

// Add grace marks
let graceStudents = strugglingStudents.map(function(student) {
    return {
        id: student.id,
        name: student.name,
        oldAverage: student.calculateAverage(),
        graceMarks: 5,
        newAverage: student.calculateAverage() + 5
    };
});

// Calculate grace average
let totalGraceAverage = graceStudents.reduce(function(total, student) {
    return total + student.newAverage;
}, 0);

let finalGraceAverage = 0;

if (graceStudents.length > 0) {
    finalGraceAverage = totalGraceAverage / graceStudents.length;
}

// Create students table
let studentsTable = "";

studentsList.forEach(function(student) {
    studentsTable +=
        "<tr>" +
        "<td>" + student.id + "</td>" +
        "<td>" + student.name + "</td>" +
        "<td>" + student.grades.join(" - ") + "</td>" +
        "<td>" + student.attendance + "%</td>" +
        "<td>" + student.calculateAverage().toFixed(2) + "</td>" +
        "<td>" + student.getGrade() + "</td>" +
        "<td>" + student.getFinalResult() + "</td>" +
        "</tr>";
});

// Create grace table
let graceTable = "";

graceStudents.forEach(function(student) {
    graceTable +=
        "<tr>" +
        "<td>" + student.id + "</td>" +
        "<td>" + student.name + "</td>" +
        "<td>" + student.oldAverage.toFixed(2) + "</td>" +
        "<td>" + student.graceMarks + "</td>" +
        "<td>" + student.newAverage.toFixed(2) + "</td>" +
        "</tr>";
});

if (graceStudents.length === 0) {
    graceTable = "<tr><td colspan='5'>No struggling students found</td></tr>";
}

// Responsive Design
let output = document.getElementById("output");

output.innerHTML =
    "<style>" +

    "* { box-sizing: border-box; }" +

    "body {" +
        "font-family: Arial, sans-serif;" +
        "background: #f4f6f9;" +
        "padding: 20px;" +
        "margin: 0;" +
    "}" +

    "#output {" +
        "width: 100%;" +
        "max-width: 1100px;" +
        "margin: auto;" +
    "}" +

    "h1, h2 { color: #263b59; }" +

    "h2 {" +
        "margin-top: 30px;" +
        "margin-bottom: 15px;" +
    "}" +

    ".table-container {" +
        "width: 100%;" +
        "margin-bottom: 25px;" +
        "overflow-x: auto;" +
        "-webkit-overflow-scrolling: touch;" +
    "}" +

    "table {" +
        "width: 100%;" +
        "border-collapse: collapse;" +
        "background: white;" +
        "border-radius: 8px;" +
        "overflow: hidden;" +
    "}" +

    ".students-table { min-width: 700px; }" +

    ".grace-table { min-width: 550px; }" +

"th {" +
        "background: #263b59;" +
        "color: white;" +
        "padding: 13px 8px;" +
        "font-size: 14px;" +
        "white-space: nowrap;" +
    "}" +

    "td {" +
        "padding: 12px 8px;" +
        "text-align: center;" +
        "border-bottom: 1px solid #e5e7eb;" +
        "font-size: 14px;" +
        "color: #333;" +
        "white-space: nowrap;" +
    "}" +

    "tr:hover { background: #f1f5fa; }" +

    ".average {" +
        "background: white;" +
        "padding: 16px;" +
        "color: #263b59;" +
        "font-weight: bold;" +
        "border-radius: 8px;" +
        "width: 100%;" +
    "}" +

    "@media screen and (max-width: 700px) {" +

        "body { padding: 12px; }" +

        "h1 { font-size: 23px; }" +

        "h2 { font-size: 19px; }" +

        "th, td {" +
            "padding: 10px 6px;" +
            "font-size: 12px;" +
        "}" +

        ".average {" +
            "font-size: 14px;" +
            "padding: 14px;" +
        "}" +
    "}" +

    "</style>" +

    "<h2>Students Report</h2>" +

    "<div class='table-container'>" +
        "<table class='students-table'>" +
            "<tr>" +
                "<th>ID</th>" +
                "<th>Name</th>" +
                "<th>Grades</th>" +
                "<th>Attendance</th>" +
                "<th>Average</th>" +
                "<th>Grade</th>" +
                "<th>Final Result</th>" +
            "</tr>" +
            studentsTable +
        "</table>" +
    "</div>" +

    "<h2>Grace Report</h2>" +

    "<div class='table-container'>" +
        "<table class='grace-table'>" +
            "<tr>" +
                "<th>ID</th>" +
                "<th>Name</th>" +
                "<th>Old Average</th>" +
                "<th>Grace Marks</th>" +
                "<th>New Average</th>" +
            "</tr>" +
            graceTable +
        "</table>" +
    "</div>" +

    "<div class='average'>" +
        "Grace Average: " + finalGraceAverage.toFixed(2) +
    "</div>";

// Console Report
console.log("Students Report:");

studentsList.forEach(function(student) {
    console.log(
        student.id,
        student.name,
        "Average:", student.calculateAverage().toFixed(2),
        "Grade:", student.getGrade(),
        "Result:", student.getFinalResult()
    );
});

console.log("Struggling Students:", strugglingStudents);
console.log("Grace Students:", graceStudents);
console.log("Grace Average:", finalGraceAverage.toFixed(2));
