import type {RoyalReturn} from "~/server/app/Royalution";
import {useToastStore} from "~/src/toast/ToastStore";
import {ToastType} from "~/src/toast/ToastType";
import {useAccountStore} from "~/src/account/AccountStore";

interface OnboardingQuestion {
    step: number,
    category: string,
    answer: string
}

interface OnboardingHistoryItem {
    question: string,
    answer: string
}

export class OnboardingHandler {
    private toastStore = useToastStore();
    private accountStore = useAccountStore();
    private router = useRouter();
    public name: string = "";
    public location: string = "";
    public blocked = ref(false);
    public chatHistory: OnboardingHistoryItem[] = [];
    private client = useSupabaseClient();

    public step = ref(1);
    public total = ref(5);
    public questions: OnboardingQuestion[] = [];
    private attemptsPerCat  = 5;
    private attemptsLeft = this.attemptsPerCat;

    constructor() {
        this.questions.push({
            step: 1,
            category: "introduction",
            answer: "",
        });
        this.questions.push({
            step: 2,
            category: "creator",
            answer: "",
        });
        this.questions.push({
            step: 3,
            category: "content",
            answer: "",
        });
        this.questions.push({
            step: 4,
            category: "avatar",
            answer: "",
        });
        this.questions.push({
            step: 5,
            category: "socials",
            answer: "",
        });
    }

    async answer(answer: string): Promise<{ question: string, category: string }> {
        if(this.blocked.value)  return {question: "", category: "error"}
        this.chatHistory[this.chatHistory.length - 1].answer = answer;
        //ask royalution
        const request = await fetch("/api/onboarding/ask-royalution", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                category: this.questions[this.step.value - 1].category,
                answer: answer,
                history: this.chatHistory
            })
        })
        const response: RoyalReturn = await request.json();

        if (response.code == 429 || response.code == 504) {
            this.toastStore.addToast("Timed out, try again later", ToastType.ERROR);
        }

        if (!response.success) {
            return {
                question: "",
                category: "error"
            }
        }

        if (response.valid) {
            if (response.name.length > 0) {
                this.name = response.name;
                this.accountStore.username = response.name;
            }
            if (response.location.length > 0) {
                this.accountStore.location = response.location;
            }
            this.attemptsLeft =  this.attemptsPerCat;
            this.questions[this.step.value - 1].answer = answer;
            this.step.value++;
            let newQuestion = `${response.response}\n\n${this.getQuestionByStep()}`
            this.addQuestionHistory(newQuestion);
            return {
                question: newQuestion,
                category: this.questions[this.step.value - 1].category,
            };
        }

        this.attemptsLeft--;
        if(this.attemptsLeft < 1) {
            this.toastStore.addToast("You have reached the rate limit please reload and try again.", ToastType.ERROR)
            this.blocked.value = true;
        }
        this.addQuestionHistory(response.response);
        return {
            question: response.response,
            category: this.questions[this.step.value - 1].category,
        };
    }

    addQuestionHistory(question: string) {
        this.chatHistory.push({
            question: question,
            answer: ""
        })
    }

    getQuestionByStep(): string {
        switch (this.step.value) {
            case 1: {
                return "hi, stoked to see you on the creator mate waitlist. let's get this show on the road.\n" +
                    "\n" +
                    "we’ll fly through this in under a minute. if something’s wrong – hit us up at support@creatormate.com." +
                    "\n\n" +
                    "first up:\n" +
                    "\n" +
                    "what's your name & where do you call home? (ex: hey i'm jens, i'm from amsterdam)\n"
            }
            case 2: {
                return `alright ${this.name}, let's dive into your dreams. what kind of content do you wanna make? 

shoot for the stars here. ex: i want to create videos of cutting celebrities' hair while chatting about personal growth, mental health, and manifesting. 

don’t sweat it if you’re still figuring it out. just spill what’s on your mind in a sentence or two.
`;
            }
            case 3: {
                return "";
            }
            case 4: {
                return "next up - let’s get your profile pic sorted.\n" +
                    "\n" +
                    "upload a pic that captures your vibe. a real photo of you is great, but if you’re feeling an avatar, that works too. just upload it below.\n";
            }
            default: {
                return "";
            }
        }
    }

    async save() {
        this.accountStore.contentType = this.questions[1].answer;
        this.accountStore.creatorType = this.questions[2].answer;
        this.accountStore.completedOnboarding = true;
        await this.accountStore.update();
        await this.router.push('/home');
    }
}