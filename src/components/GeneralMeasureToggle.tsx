import { useOptionsStore } from "@/lib/optionsStore";
import { Button } from "./ui/button";

export const GeneralMeasureToggle = () => {
  const measure = useOptionsStore((state) => state.measure);
  const updateMeasure = useOptionsStore((state) => state.updateMeasure);

  const handleMeasureChange = () => {
    updateMeasure(measure === 'cm' ? 'mm' : 'cm');
  };

  return <Button onClick={handleMeasureChange}>{measure === 'cm' ? 'mm' : 'cm'}</Button>

}

