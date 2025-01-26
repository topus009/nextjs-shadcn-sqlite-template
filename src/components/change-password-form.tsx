import {
  ComponentPropsWithoutRef,
  useActionState,
  useEffect,
  useState
} from "react"
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
import { changePasswordFormAction } from '../../lib/actions'
import { useRouter, useSearchParams } from 'next/navigation'
import {Ban, Check} from "lucide-react"
import Link from "next/link"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {useUserContext} from "components/hooks/use-user-context"
import {PasswordEye} from "./custom/password-eye"

export function ChangePasswordForm({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const { user } = useUserContext();
  const router  = useRouter();
  const params  = useSearchParams();
  const token  = params.get('token') || '';
  const [showPassword, setShowPassword] = useState(false)

  const [state, formAction, pending] = useActionState(changePasswordFormAction, {
    defaultValues: {
      password: '',
      confirmPassword: '',
      token,
      email: user?.email || '',
    },
    success: false,
    errors: null,
  })

  useEffect(() => {
    if (state.success) {
      const timeoutId = setTimeout(() => {
        if (user) {
          router.push('/', { scroll: false });
        } else {
          router.push('/login', { scroll: false });
        }
        // window.location.href = '/'
        // window.location.reload();
      }, 1500)
      return () => clearTimeout(timeoutId)
    }
  }, [state.success])
  // InvalidChangePasswordToken
  const isTokenInvalid = Boolean(state.errors?.common);
  const hasNoPermission = Boolean(!user && (!token || state.errors?.token || isTokenInvalid));
  console.log(state.errors, token, user?.email);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Change Password</CardTitle>
          <CardDescription className="flex items-start gap-2">
            {hasNoPermission ? (
              <>
                <Ban className="size-4 shrink-0" />
                <span className="text-sm">
                  {isTokenInvalid ? 'Invalid token' : 'You have no permission.'}
                  <br/>
                  <Link
                    href="/forgot-password"
                    className="underline"
                    prefetch={false}>
                    Send me a magic link
                  </Link>
                </span>
              </>
            ) : (
              <span className="text-sm">Enter new password.</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {state.success ? (
            <p className="text-muted-foreground flex items-center gap-2 text-sm mb-4">
              <Check className="size-4" />
              Password changed
            </p>
          ) : null}
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.password}>
                <Label htmlFor="email" className="group-data-[invalid=true]/field:text-destructive">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive pr-10"
                    disabled={pending || hasNoPermission}
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
                    disabled={pending || hasNoPermission}
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
              <VisuallyHidden>
                <Input
                  id="token"
                  name="token"
                  required={!user?.email}
                  disabled={pending || hasNoPermission}
                  aria-invalid={!!state.errors?.token}
                  aria-errormessage="error-token"
                  defaultValue={token}
                />
              </VisuallyHidden>
              <VisuallyHidden>
                <Input
                  id="email"
                  name="email"
                  required={!token}
                  disabled={pending || hasNoPermission}
                  aria-invalid={!state.errors?.email}
                  aria-errormessage="error-email"
                  defaultValue={user?.email}
                />
              </VisuallyHidden>
              <Button type="submit" className="w-full" disabled={pending || hasNoPermission || state.success || !!state.errors?.token}>
                {pending ? 'Loading...' : 'Change Password'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
