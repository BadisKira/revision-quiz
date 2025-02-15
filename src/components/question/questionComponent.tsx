import {  QuestionModel } from "@/type/question";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

export default function QuestionComponent({
  question,
}: {
  question: QuestionModel;
}) {
  const { answers, content } = question;



  return (
    <div>
      <div>{content}</div>
      <RadioGroup defaultValue="option-one">
        {answers.map((option, index) => {
          return (
            <div className="flex items-center space-x-2" key={index}>
              <RadioGroupItem value={option.id!} id={option.id!} />
              <Label htmlFor="option-one">{option.content}</Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
