enum QType {
    Mcq = "mcq",
    Mcqm = "mcqm",
    Int = "integer"
}

interface Option {
    content: string,
    identifier: string
}

interface Question {
    question_id: string,
    marks: number,
    negMarks: number,
    subject: string,
    chapter: string,
    chapterGroup: string,
    type: QType,
    content: string,
    options: Option[],
    correct_options: string[], //string that corresponds to identifier in options
    answer: string //number btw
    explanation: string,
    comprehension: string,
    direction: string
    si: number,
    qi: number
}

interface Subject {
    questions: Question[],
    title: string,
    si: number
}

interface OptionElement extends Element {
    value: string,
    name: string
}

class Test {
    public is_practice: boolean;
    public qList: Subject[];
    public response_sheet: string[][][]; //[subject: [question: [option: string]]]

    constructor(practice: boolean, qs: any[]) {
        //Assign Index
        this.qList = qs.map((sub, si) => ({
            ...sub,
            questions: sub.questions.map((q, qi) => ({ ...q, si, qi })),
            si: si
        }));

        this.response_sheet = qs.map(sub => Array(sub.questions.length).fill(null));
        this.is_practice = practice;
    }

    respond(q: Question, t: OptionElement) {
        let pre = this.response_sheet[q.si][q.qi] || [];
        let v = t.value;
        let idx = pre.findIndex(x => x === v);

        if (idx !== -1) {
            pre.splice(idx, 1);
        } else {
            if (q.type !== "mcqm") pre = [v];
            else pre.push(v);
        }

        this.response_sheet[q.si][q.qi] = pre;
        
        t.parentElement?.querySelectorAll(`*[name='${t.name}']`).forEach(el => {
            if (el.value && pre.includes(el.value)) el.classList.add("selected");
            else el.classList.remove("selected", "correct", "wrong");

            if (this.is_practice && pre.includes(el.value)) {
                q.correct_options.includes(el.value)
                ? el.classList.add("correct")
                : el.classList.add("wrong");
            }
        });

        if (this.is_practice) return;

        //Update Stat
        let stat = document.querySelector(`#palette a[name='${q.si}_${q.qi}']`);
    
        if (pre?.[0]?.length > 0) stat.classList.add("tick")
        else stat.classList.remove("tick");
    }

    finish() {
        if (this.is_practice) return;

        if (window.confirm("Do you want to FINISH this test?")) {
            document.querySelectorAll(".qTile > input, .qTile > button").forEach(el => (el.disabled = true));
            
            let score = 0;
            let maxMarks = 0;

            for (let si = 0; si < this.response_sheet.length; si++) {
                for (let qi = 0; qi < this.response_sheet[si].length; qi++) {
                    let { correct_options, answer, question_id, type, marks, negMarks } = this.qList[si].questions[qi];
                    let val = this.response_sheet[si][qi];

                    //Reveal MCQ answer
                    document.querySelectorAll(`*[name='${question_id}']`).forEach(el => {
                        let is_c = correct_options.includes(el.value) || answer === el.value;
                        let is_s = el.classList.contains("selected");
                        
                        if (is_s) el.classList.add(is_c ? "correct" : "wrong");
                        if (is_c) el.classList.add("pcorrect");
                    });
            
                    //Append Integer answer
                    if (type === "integer") {
                        let el = document.createElement("span");
                        el.classList.add("correct");
                        el.textContent = "Answer: " + answer;

                        document.querySelector(`#${question_id} > div.options`)?.appendChild(el);
                    }
                    
                    maxMarks += marks;
                    
                    if (!val?.length) continue;
                    
                    //Add to score
                    if (type === "mcqm") {
                        score += val.every(o => correct_options.includes(o))
                            ? (correct_options.length === val.length ? marks : val.length)
                            : -negMarks;
                    } else {
                        score += correct_options[0] === val[0] || answer === val[0] ? marks : -negMarks;
                    }
                }
            }

            document.getElementById("score").textContent = `You scored ${score}/${maxMarks}`;
        }
    }
}

export default Test;