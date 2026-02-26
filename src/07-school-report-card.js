/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  // Your code here

  if (
      student == null || 
      typeof student != 'object' ||
      !student.hasOwnProperty('name')  || 
      student.name=='' ||
      !student.hasOwnProperty('marks')  ||
      Object.keys(student.marks).length == 0   ||
      Object.values(student.marks).filter((ele) => (ele <0 || ele >100 || typeof ele != 'number')).length !=0

  ){
    return null 
  }

  let  totSub = Object.values(student.marks).length
  let totMarks = Object.values(student.marks).reduce((sum,ele) =>(sum+ele) , 0 )

  let pers = parseFloat((totMarks / totSub).toFixed(2))

  let grade = ''
  if(pers>=90){
    grade='A+'
  }else if (pers>=80){
      grade='A'
  }else if (pers>=70){
      grade='B'
  }else if (pers>=60){
      grade='C'
  }else if (pers>=40){
      grade='D'
  }else {
      grade='F'
  }

  let markEle = Object.entries(student.marks)
  
  let passed = markEle.filter((ele) => (ele[1] >=40 )).map((ele) => ele[0])
  let failed = markEle.filter((ele) => (ele[1] <40 )).map((ele) => ele[0])
  
  markEle.sort((a,b) =>  b[1] -a[1] ) 

  

  return {
    name : student.name , 
    totalMarks  : totMarks,
    percentage : pers,
    grade : grade,
    highestSubject : markEle.at(0)[0],
    lowestSubject : markEle.at(-1)[0],
    passedSubjects : passed,
    failedSubjects : failed,
    subjectCount : totSub

  }
}


console.log(generateReportCard({
  name :'Akash' ,
  marks :{ ben : 60 , maths : 80   ,eng : 80 }
}));

