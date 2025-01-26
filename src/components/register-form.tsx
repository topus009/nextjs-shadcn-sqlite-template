import {ComponentPropsWithoutRef, useActionState, useEffect, useState} from "react"
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
import { registerFormAction } from '../../lib/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {PasswordEye} from "./custom/password-eye"

export function RegisterForm({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const router  = useRouter();
  const [showPassword, setShowPassword] = useState(false)

  const [state, formAction, pending] = useActionState(registerFormAction, {
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    success: false,
    errors: null,
  })

  useEffect(() => {
    if (state.success) {
      router.push("/login", { scroll: false });
    }
  }, [state.success, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Register</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.fullName}>
                <Label htmlFor="fullName" className="group-data-[invalid=true]/field:text-destructive">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  required
                  className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                  disabled={pending}
                  aria-invalid={!!state.errors?.fullName}
                  aria-errormessage="error-fullName"
                  defaultValue={state.defaultValues.fullName}
                />
                {state.errors?.fullName && (
                  <p id="error-fullName" className="text-destructive text-sm">
                    {state.errors.fullName}
                  </p>
                )}
              </div>
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
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.password}>
                <Label htmlFor="email" className="group-data-[invalid=true]/field:text-destructive">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive pr-10"
                    disabled={pending}
                    aria-invalid={!!state.errors?.password}
                    aria-errormessage="error-password"
                    defaultValue={state.defaultValues.password}
                  />
                  <PasswordEye
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>
                {state.errors?.password && (
                  <p id="error-password" className="text-destructive text-sm">
                    {state.errors.password}
                  </p>
                )}
              </div>
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.confirmPassword}>
                <Label htmlFor="confirmPassword" className="group-data-[invalid=true]/field:text-destructive">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive pr-10"
                    disabled={pending}
                    aria-invalid={!!state.errors?.confirmPassword}
                    aria-errormessage="error-confirmPassword"
                    defaultValue={state.defaultValues.confirmPassword}
                  />
                  <PasswordEye
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>
                {state.errors?.confirmPassword && (
                  <p id="error-confirmPassword" className="text-destructive text-sm">
                    {state.errors.confirmPassword}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? 'Signing up...' : 'Signing up'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
