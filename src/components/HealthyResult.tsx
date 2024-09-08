import { CaseUpper } from "lucide-react"

interface Results {
  result: number | undefined,
  lowerValue?: number,
  higherValue?: number,
  preRender?: string,
  postRender?: string,
}
export function HealthyResult ({ preRender, postRender, result, lowerValue, higherValue }: Results) {
  function RenderInfo ({ color }: { color: string }) {
    return (
      <>
        <p className={`text-lg font-medium text-${color}-600`}><strong>{preRender}:</strong> {result} {postRender}</p >
      </>
    )
  }
  if ((result !== undefined) && (lowerValue && higherValue)) {
    if (result > higherValue) {
      return (
        <p className={`text-lg font-medium text-red-600`}><strong>{preRender}:</strong> {result} {postRender}</p >
      )
    } else if (result < lowerValue) {
      return (
        <p className={`text-lg font-medium text-blue-600`}><strong>{preRender}:</strong> {result} {postRender}</p >

      )
    }
    else if ((result < higherValue) && (result > lowerValue)) {
      return (
        <p className={`text-lg font-medium text-green-600`}><strong>{preRender}:</strong> {result} {postRender}</p >
      )
    }
  } else {
    return (
      <p className={`text-lg font-medium`}><strong>{preRender}:</strong> {result} {postRender}</p >
    )
  }

}