import { cn } from "components/lib/utils"
import { Button } from "components/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/components/ui/card"
import { Input } from "components/components/ui/input"
import { Label } from "components/components/ui/label"
import { forgotPasswordFormAction } from '../../lib/actions'
import Link from "next/link"
import {useActionState, useEffect} from "react"
import {Check} from "lucide-react"
import { useRouter } from 'next/navigation'

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router  = useRouter();

  const [state, formAction, pending] = useActionState(forgotPasswordFormAction, {
    defaultValues: {
      email: '',
    },
    success: false,
    errors: null,
  })

  useEffect(() => {
    if (state.success) {
      const timeoutId = setTimeout(() => {
        router.push('/')
      }, 3000)
      return () => clearTimeout(timeoutId)
    }
  }, [state.success])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <CardDescription>Enter your email below to receive a password reset link</CardDescription>
        </CardHeader>
        <CardContent>
          {state.success && (
            <p className="text-muted-foreground flex items-center gap-2 text-sm mb-4">
              <Check className="size-4" />
              Reset password link has been sent to your email
            </p>
          )}
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.email}>
                <Label htmlFor="email" className="group-data-[invalid=true]/field:text-destructive">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                  disabled={pending}
                  aria-invalid={!!state.errors?.email}
                  aria-errormessage="error-email"
                  defaultValue={state.defaultValues.email}
                />
                {state.errors?.email && (
                  <p id="error-email" className="text-destructive text-sm">
                    {state.errors.email}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={pending || state.success}>
                {pending ? 'Sending Reset Link...' : 'Send Reset Link'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Remembered your password?{" "}
              <Link href="/login" className="underline" prefetch={false}>
                Go back to login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
