export type Answer = {
    id: number,
    created_at: Date,
    user_id: string,
    question_id: number,
    answer: string|null
    option_id: number|null
}

export type QuestionOption = {
    id: number,
    created_at: Date,
    option: string,
    order: number,
    question_id: number
}

export type Questionnaire = {
    id: number,
    created_at: Date,
    name: string,
    order: number
}

export type Question = {
    id: number,
    created_at: Date,
    question: string,
    description: string,
    type: QuestionType,
    order: number,
    questionnaire_id: number
}

export type Resource = {
    id: number,
    created_at: Date,
    youtube_url: string,
    category: string,
    title: string
}

export enum SupabaseTables {
    UserProfiles = "profiles",
    Questions = "questions",
    Questionnaires = "questionnaires",
    Answers = "answers",
    QuestionOptions = "question_options",
    Resources = "resources",
    Onboarding = "onboarding",
    ChatHistory = "chat_history"
}

export enum QuestionType {
    OPEN= "OPEN", AREA = "AREA", MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
}