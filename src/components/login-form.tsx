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
import { loginFormAction } from '../../lib/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {PasswordEye} from "./custom/password-eye"

// const LIST_PAGES_TO_REDIRECT_TO_INDEX = [
//   "/login",
//   "/register",
//   "/forgot-password",
//   "/change-password",
//   "/logout",
//   "/feedback",
// ];

export function LoginForm({
  className,
  referer = '',
  ...props
}: ComponentPropsWithoutRef<"div"> & { referer?: string }) {
  const router  = useRouter();
  const [showPassword, setShowPassword] = useState(false)

  const [state, formAction, pending] = useActionState(loginFormAction, {
    defaultValues: {
      email: '',
      password: '',
    },
    success: false,
    errors: null,
  })

  useEffect(() => {
    if (state.success) {
      // const path = referer ? (new URL(referer)).pathname : '';
      // const ignoredPages = LIST_PAGES_TO_REDIRECT_TO_INDEX.includes(path);

      // if (!referer || ignoredPages) {
      //   router.push("/", { scroll: false });
      // } else if (referer.startsWith(window.location.origin)) {
      //   router.back();
      // } else {
      //   router.push("/", { scroll: false });
      // }
      window.location.href = '/';
    }
  }, [state.success, referer, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.password}>
                <div className="flex items-center">
                  <Label htmlFor="password" className="group-data-[invalid=true]/field:text-destructive">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
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
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? 'Logging in...' : 'Login'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
