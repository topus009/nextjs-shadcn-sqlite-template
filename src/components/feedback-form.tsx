import {useActionState, useEffect} from "react"
import * as React from 'react'
import { cn } from "components/lib/utils"
import { Button } from "components/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "components/components/ui/card"
import { Textarea } from 'components/components/ui/textarea'
import { Input } from "components/components/ui/input"
import { Label } from "components/components/ui/label"
import { Check } from 'lucide-react'
import { contactFormAction } from '../../lib/actions'
import { useRouter } from 'next/navigation'
import {useUserContext} from "components/hooks/use-user-context"

export function FeedbackForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router  = useRouter();
  const { user }  = useUserContext();

  const [state, formAction, pending] = useActionState(contactFormAction, {
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    success: false,
    errors: null,
  });

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
        <CardHeader>
          <CardTitle>How can we help?</CardTitle>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="flex flex-col gap-6">
            {state.success && (
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <Check className="size-4" />
                Your message has been sent. Thank you.
              </p>
            )}
            {!user && (
              <>
                <div
                  className="group/field grid gap-2"
                  data-invalid={!!state.errors?.name}
                >
                  <Label
                    htmlFor="name"
                    className="group-data-[invalid=true]/field:text-destructive"
                  >
                    Name <span aria-hidden="true">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Lee Robinson"
                    className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                    disabled={pending}
                    aria-invalid={!!state.errors?.name}
                    aria-errormessage="error-name"
                    defaultValue={state.defaultValues.name}
                  />
                  {state.errors?.name && (
                    <p id="error-name" className="text-destructive text-sm">
                      {state.errors.name}
                    </p>
                  )}
                </div>
                <div
                  className="group/field grid gap-2"
                  data-invalid={!!state.errors?.email}
                >
                  <Label
                    htmlFor="email"
                    className="group-data-[invalid=true]/field:text-destructive"
                  >
                    Email <span aria-hidden="true">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="leerob@acme.com"
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
              </>
            )}
            <div
              className="group/field grid gap-2"
              data-invalid={!!state.errors?.message}
            >
              <Label
                htmlFor="message"
                className="group-data-[invalid=true]/field:text-destructive"
              >
                Message <span aria-hidden="true">*</span>
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Type your message here..."
                className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                disabled={pending}
                aria-invalid={!!state.errors?.message}
                aria-errormessage="error-message"
                defaultValue={state.defaultValues.message}
              />
              {state.errors?.message && (
                <p id="error-message" className="text-destructive text-sm">
                  {state.errors.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" size="sm" disabled={pending}>
              {pending ? 'Sending...' : 'Send Message'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
