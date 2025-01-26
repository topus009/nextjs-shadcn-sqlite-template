import { Button } from "components/components/ui/button"
import {Eye, EyeOff} from "lucide-react"

export function PasswordEye({
  showPassword,
  setShowPassword,
}: {
  showPassword: boolean
  setShowPassword: (showPassword: boolean) => void
}) {
  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      className="absolute inset-y-0 right-0 pr-3 flex items-center"
      onClick={togglePasswordVisibility}
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4 text-gray-400" />
      ) : (
        <Eye className="h-4 w-4 text-gray-400" />
      )}
    </Button>
  )
}
