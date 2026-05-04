import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useJoinWaitlist } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const waitlistSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

interface WaitlistFormProps {
  productName: string;
  onSuccess?: () => void;
}

export function WaitlistForm({ productName, onSuccess }: WaitlistFormProps) {
  const { toast } = useToast();
  const joinWaitlist = useJoinWaitlist();

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(data: WaitlistFormValues) {
    joinWaitlist.mutate(
      {
        data: {
          product: productName,
          ...data,
        },
      },
      {
        onSuccess: () => {
          toast({
            title: "Added to waitlist!",
            description: "We'll notify you as soon as it's available.",
          });
          form.reset();
          onSuccess?.();
        },
        onError: () => {
          toast({
            title: "Something went wrong",
            description: "Please try again later.",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} data-testid="input-waitlist-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} data-testid="input-waitlist-email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={joinWaitlist.isPending}
          data-testid="button-submit-waitlist"
        >
          {joinWaitlist.isPending ? "Joining..." : "Join Waitlist"}
        </Button>
      </form>
    </Form>
  );
}
