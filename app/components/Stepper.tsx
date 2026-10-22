import IconMinus from "@/app/components/IconMinus";
import IconPlus from "@/app/components/IconPlus";
import StepButton from "@/app/components/StepButton";

type StepperProps = { value: number; min?: number; onDecrease?: () => void; onIncrease?: () => void; className?: string };

export default function Stepper({ value, min = 0, onDecrease, onIncrease, className = "" }: StepperProps) {
  return <div className={`ds-stepper ${className}`.trim()}><StepButton aria-label="인원 줄이기" disabled={value <= min} onClick={onDecrease}><IconMinus /></StepButton><span className="type-heading-md">{value}명</span><StepButton aria-label="인원 늘리기" onClick={onIncrease}><IconPlus /></StepButton></div>;
}
