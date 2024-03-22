
/**
 *@typedef {{
 * content: string,
 * identifier: string
 * }} Option
 
 *@typedef {"mcq"|"mcqm"|"integer"} QType 
 
 *@typedef {{
    question_id: string,
    marks: number,
    negMarks: number,
    subject: string,
    chapter: string,
    chapterGroup: string,
    type: QType,
    content: string,
    options: Option[],
    correct_options: string[],
    answer: string,
    explanation: string,
    comprehension: string,
    direction: string
    si: number,
    qi: number
 }} Question

 *@typedef {{
    questions: Question[],
    title: string,
    si: number
 }} Subject

 *@typedef {(string[] | null) [][]} ResponseSheet
*/