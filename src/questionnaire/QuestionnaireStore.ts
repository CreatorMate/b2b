//@ts-ignore
import {defineStore} from "pinia";
import { SupabaseTables} from "~/src/SupabaseTypes";
import type {Questionnaire, Question, Answer, QuestionOption} from "~/src/SupabaseTypes";

export const useQuestionnaireStore = defineStore("questionnaire", () => {
    const supabase = useSupabaseClient();

    async function getQuestionnaires(): Promise<Questionnaire[]> {
        const {data} = await supabase
            .from(SupabaseTables.Questionnaires)
            .select(`*`)
            .order('order');

        if (!data) return [];

        return data;
    }

    async function getQuestionOptions(questionId: number): Promise<QuestionOption[]> {
        const {error: questionsError, data: questionOptions} = await supabase
            .from(SupabaseTables.QuestionOptions)
            .select(`*`)
            .order('order')
            .eq('question_id', questionId);

        if(questionsError) return [];

        return questionOptions;
    }
    async function getQuestions(questionnaireId: number, userId: string): Promise<QuestionAnswer[]> {

        const {error: questionsError, data: questions} = await supabase
            .from(SupabaseTables.Questions)
            .select(`*`)
            .order('order')
            .eq('questionnaire_id', questionnaireId);

        const {error: answerError, data: answers} = await supabase
            .from(SupabaseTables.Answers)
            .select(`*`)
            .eq('user_id', userId);

        if (questionsError || answerError || !questions) return [];

        let questionAnswer: QuestionAnswer[] = questions.map((question: Question) => {
            let foundAnswers: Answer[] = [];
            answers?.forEach((answer: Answer) => {
                if(answer.question_id == question.id) {
                    foundAnswers.push(answer);
                }
            })

            return {
                question: question,
                answers: foundAnswers
            }
        })

        return questionAnswer;
    }

    async function saveAnswers(answers:Map<number, string|number[]|number>, userId: string, questionnaireId: number) {
        const {data, error} = await supabase.from(SupabaseTables.Answers).delete().eq('user_id', userId).eq('questionnaire_id', questionnaireId);
        let answersToInsert = [];
        for(const [questionId, answer] of answers.entries()) {
            if(typeof answer === 'string') {
                answersToInsert.push({
                    user_id: userId,
                    question_id: questionId,
                    questionnaire_id: questionnaireId,
                    answer: answer
                })
            } else if(typeof answer === 'number') {
                answersToInsert.push({
                    user_id: userId,
                    question_id: questionId,
                    questionnaire_id: questionnaireId,
                    option_id: answer
                })
            } else if(Array.isArray(answer)) {
                for(let id of answer) {
                    answersToInsert.push({
                        user_id: userId,
                        question_id: questionId,
                        questionnaire_id: questionnaireId,
                        option_id: id
                    })
                }
            }
        }


        const { data: insertedData, error: insertError } = await supabase
            .from(SupabaseTables.Answers)
            //@ts-ignore
            .insert(answersToInsert);
    }

    return {getQuestionnaires, getQuestions, getQuestionOptions, saveAnswers}
});

export type QuestionAnswer = {
    question: Question,
    answers: Answer[],
}